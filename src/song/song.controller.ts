import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('/song')
export class SongController {
  @Post()
  addSong() {}

  @Get()
  getAllSongs() {
    return 'test song controller';
  }

  @Get()
  getSong() {}

  @Delete()
  deleteSong() {}
}
