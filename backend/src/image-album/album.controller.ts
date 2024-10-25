import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImageAlbumService } from './image-album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';

@ApiTags('Albums')
@ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly imageAlbumService: ImageAlbumService) { }

  @Post(':trip_id')
  create(@Body() createDto: CreateAlbumDto, @Param('trip_id') tripId: string) {
    return this.imageAlbumService.createAlbum(createDto, tripId);
  }

  @Get('all/:trip_id')
  findAll(@Param('trip_id') tripId: string) {
    return this.imageAlbumService.findAllAlbumByTrip(tripId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageAlbumService.findOneAlbum(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageAlbumService.removeAlbum(id);
  }
}
