import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SongService } from './song.service';
import { AddSongDto } from './dto/add-song.dto';
import { Types } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('/song')
export class SongController {
  constructor(private songService: SongService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  addSong(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() dto: AddSongDto,
  ) {
    return this.songService.addSong(dto, files.picture[0], files.audio[0]);
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

  @Post('/comment')
  addComment(@Body() dto: AddCommentDto) {
    return this.songService.addComment(dto);
  }
}
