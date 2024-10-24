import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageAlbumService } from './image-album.service';
import { CreateImageAlbumDto } from './dto/create-image-album.dto';
import { UpdateImageAlbumDto } from './dto/update-image-album.dto';

@Controller('image-album')
export class ImageAlbumController {
  constructor(private readonly imageAlbumService: ImageAlbumService) {}

  @Post()
  create(@Body() createImageAlbumDto: CreateImageAlbumDto) {
    return this.imageAlbumService.create(createImageAlbumDto);
  }

  @Get()
  findAll() {
    return this.imageAlbumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageAlbumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageAlbumDto: UpdateImageAlbumDto) {
    return this.imageAlbumService.update(+id, updateImageAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageAlbumService.remove(+id);
  }
}
