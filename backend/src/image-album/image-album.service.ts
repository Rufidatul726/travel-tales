import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageAlbumService {
  constructor(private prisma: PrismaService) {

  }

  async createAlbum(createAlbumDto: CreateAlbumDto, tripId: string) {
    const newAlbum = await this.prisma.albums.create({
      data: {
        title: createAlbumDto.title,
        description: createAlbumDto.description || "",
        trip_id: tripId,
        createdAt: new Date(),
      },
    });
    return newAlbum;
  }

  async findAllAlbumByTrip(tripId: string) {
    const albums = await this.prisma.albums.findMany({
      where: {
        trip_id: tripId,
      },
    });
    return albums;
  }

  async findOneAlbum(id: string) {
    const album = await this.prisma.albums.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async removeAlbum(id: string) {
    const deletedAlbum = await this.prisma.albums.delete({
      where: {
        id: id,
      },
    });
    return deletedAlbum;
  }

  async saveImg(file: Express.Multer.File, tripId: string, albumId: string) {
    //image description api, tag
    const description = "Need to work on that"
    // Save file information in the database
    console.log(file);

    return await this.prisma.images.create({
      data: {
        file_name: file.filename,
        trip_id: tripId,
        album_id: albumId,
        description: 'Image description here',
      },
    });
  }
}
