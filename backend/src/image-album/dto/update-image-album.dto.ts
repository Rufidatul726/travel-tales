import { PartialType } from '@nestjs/swagger';
import { CreateImageAlbumDto } from './create-image-album.dto';

export class UpdateImageAlbumDto extends PartialType(CreateImageAlbumDto) {}
