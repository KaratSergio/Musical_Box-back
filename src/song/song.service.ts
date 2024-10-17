import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AddSongDto } from './dto/add-song.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileType } from 'src/cloudinary/cloudinary.interfaces';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addSong(
    dto: AddSongDto,
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ): Promise<Song> {
    try {
      const audioFile = files.audio ? files.audio[0] : null;
      const pictureFile = files.image ? files.image[0] : null;

      if (!audioFile) {
        throw new Error('Audio file is required');
      }

      const audioUrl = await this.cloudinaryService.uploadFile(
        audioFile,
        FileType.AUDIO,
      );
      const pictureUrl = pictureFile
        ? await this.cloudinaryService.uploadFile(pictureFile, FileType.IMAGE)
        : null;

      const songData = {
        ...dto,
        listens: 0,
        picture: pictureUrl,
        audio: audioUrl,
      };

      const song = await this.songModel.create(songData);
      return song;
    } catch (error) {
      throw new Error(`Error adding song: ${error.message || error}`);
    }
  }

  async getAllSongs(count = 10, offset = 0): Promise<Song[]> {
    const songs = await this.songModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
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
    const song = await this.songModel.findById(id);

    if (song.audio) {
      await this.cloudinaryService.deleteFile(song.audio, FileType.AUDIO);
    }
    if (song.picture) {
      await this.cloudinaryService.deleteFile(song.picture, FileType.IMAGE);
    }

    await this.songModel.findByIdAndDelete(id);

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

  async listen(id: Types.ObjectId) {
    const song = await this.songModel.findById(id);
    song.listens += 1;
    await song.save();
  }

  async search(query: string): Promise<Song[]> {
    const songs = await this.songModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return songs;
  }
}
