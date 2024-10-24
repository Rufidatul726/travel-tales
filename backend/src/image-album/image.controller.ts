import { Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ImageAlbumService } from "./image-album.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@ApiTags('Images')
@ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
@Controller()
export class ImageController {
    constructor(private readonly imageAlbumService: ImageAlbumService) { }

    @Post(':trip_id/:album_id/image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('trip_id') tripId: string,
        @Param('album_id') albumId: string) {
        await this.imageAlbumService.saveImg(file, tripId, albumId)
        return {
            message: 'File uploaded successfully!',
            file: file.filename,
        };
    }

}