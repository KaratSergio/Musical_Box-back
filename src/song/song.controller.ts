import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { SongService } from './song.service';
import { AddSongDto } from './dto/add-song.dto';
import { Types } from 'mongoose';

@Controller('/song')
export class SongController {
  constructor(private songService: SongService) {}

  @Post()
  addSong(@Body() dto: AddSongDto) {
    return this.songService.addSong(dto);
  }

  @Get()
  getAllSongs() {
    return this.songService.getAllSongs();
  }

  @Get(':id')
  getSong(@Param('id') id: Types.ObjectId) {
    return this.songService.getSong(id);
  }

  @Patch(':id')
  updateSong(@Param('id') id: Types.ObjectId, @Body() dto: AddSongDto) {
    return this.songService.updateSong(id, dto);
  }

  @Delete(':id')
  deleteSong(@Param('id') id: Types.ObjectId) {
    return this.songService.deleteSong(id);
  }
}
