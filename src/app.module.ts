import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SongModule } from './song/song.module';
import { SongService } from './song/song.service';
import { SongController } from './song/song.controller';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    SongModule,
    AlbumModule,
  ],
  controllers: [AlbumController, SongController],
  providers: [SongService, AlbumService],
})
export class AppModule {}
