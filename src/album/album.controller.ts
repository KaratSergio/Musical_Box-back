import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('/album')
export class AlbumController {
  @Post()
  createAlbum() {}

  @Get()
  getAllAlbums() {
    return 'test album controller';
  }

  @Get()
  getAlbum() {}

  @Delete()
  deleteAlbum() {}
}
