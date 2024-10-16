import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album-dto';
import { Types } from 'mongoose';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() dto: AlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: Types.ObjectId) {
    return this.albumService.getAlbum(id);
  }

  @Patch(':id')
  updateAlbum(@Param('id') id: Types.ObjectId, @Body() dto: AlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: Types.ObjectId) {
    return this.albumService.deleteAlbum(id);
  }
}
