import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AddSongDto } from './dto/add-song.dto';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async addSong(dto: AddSongDto): Promise<Song> {
    const song = await this.songModel.create({ ...dto, listens: 0 });
    return song;
  }

  async getAllSongs(): Promise<Song[]> {
    const songs = await this.songModel.find();
    return songs;
  }

  async getSong(id: Types.ObjectId): Promise<Song> {
    const song = await this.songModel.findById(id);
    return song;
  }

  async updateSong(id: Types.ObjectId, dto: AddSongDto): Promise<Song> {
    const updatedSong = await this.songModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedSong;
  }

  async deleteSong(id: Types.ObjectId): Promise<Types.ObjectId> {
    const song = await this.songModel.findByIdAndDelete(id);
    return song._id;
  }
}
