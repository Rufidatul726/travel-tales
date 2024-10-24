import { Module } from '@nestjs/common';
import { ImageAlbumService } from './image-album.service';
import { ImageAlbumController } from './image-album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImageAlbumController],
  providers: [ImageAlbumService],
})
export class ImageAlbumModule { }
