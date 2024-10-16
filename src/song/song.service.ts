import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AddSongDto } from './dto/add-song.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

import { FileService, FileType } from '../file/file.service';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async addSong(
    dto: AddSongDto,
    picture?: Express.Multer.File,
    audio?: Express.Multer.File,
  ): Promise<Song> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const songData = {
      ...dto,
      listens: 0,
      picture: picturePath ? picturePath : null,
      audio: audioPath ? audioPath : null,
    };

    const song = await this.songModel.create(songData);
    return song;
  }

  async getAllSongs(): Promise<Song[]> {
    const songs = await this.songModel.find();
    return songs;
  }

  async getSong(id: Types.ObjectId): Promise<Song> {
    const song = await this.songModel.findById(id).populate({
      path: 'comments',
      model: 'Comment',
      select: 'username text',
    });
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

  async addComment(dto: AddCommentDto): Promise<Comment> {
    const songId = new Types.ObjectId(dto.songId);
    const song = await this.songModel.findById(songId);
    const comment = await this.commentModel.create({
      ...dto,
      song: songId,
    });
    song.comments.push(comment._id);
    await song.save();
    return comment;
  }
}
