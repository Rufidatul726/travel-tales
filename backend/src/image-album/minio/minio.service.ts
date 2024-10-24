import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { extname } from 'path';

@Injectable()
export class MinioService {
    private readonly minioClient: Minio.Client;
    private readonly bucketName = process.env.MINIO_BUCKET;

    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT,
            port: parseInt(process.env.MINIO_PORT, 10),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY,
        });

        // Ensure the bucket exists
        this.createBucketIfNotExists();
    }

    async createBucketIfNotExists() {
        const bucketExists = await this.minioClient.bucketExists(this.bucketName);
        if (!bucketExists) {
            await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        }
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const fileExtension = extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;
        const filePath = `${this.bucketName}/${fileName}`;

        await this.minioClient.putObject(
            this.bucketName,
            fileName,
            file.buffer,  // Make sure to pass buffer, not path
            file.size,
        );

        return this.getPresignedUrl(fileName);
    }

    async getPresignedUrl(fileName: string): Promise<string> {
        try {
            // MinIO supports using `presignedGetObject` with promises now
            const presignedUrl = await this.minioClient.presignedGetObject(
                this.bucketName,  // bucket name
                fileName,         // file name
                24 * 60 * 60      // expiry time in seconds (1 day)
            );
            return presignedUrl;
        } catch (err) {
            console.error('Error generating presigned URL:', err);
            throw new Error('Could not generate presigned URL');
        }
    }
}
