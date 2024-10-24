import { Injectable } from '@nestjs/common';
import { CreateImageAlbumDto } from './dto/create-image-album.dto';
import { UpdateImageAlbumDto } from './dto/update-image-album.dto';

@Injectable()
export class ImageAlbumService {
  create(createImageAlbumDto: CreateImageAlbumDto) {
    return 'This action adds a new imageAlbum';
  }

  findAll() {
    return `This action returns all imageAlbum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageAlbum`;
  }

  update(id: number, updateImageAlbumDto: UpdateImageAlbumDto) {
    return `This action updates a #${id} imageAlbum`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageAlbum`;
  }
}
