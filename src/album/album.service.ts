import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AlbumDto } from './dto/album-dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async createAlbum(dto: AlbumDto): Promise<Album> {
    const album = await this.albumModel.create({ ...dto });
    return album;
  }

  async getAllAlbums(): Promise<Album[]> {
    const albums = await this.albumModel.find();
    return albums;
  }

  async getAlbum(id: Types.ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id);
    return album;
  }

  async updateAlbum(id: Types.ObjectId, dto: AlbumDto): Promise<Album> {
    const updatedSong = await this.albumModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedSong;
  }

  async deleteAlbum(id: Types.ObjectId): Promise<Types.ObjectId> {
    const song = await this.albumModel.findByIdAndDelete(id);
    return song._id;
  }
}
