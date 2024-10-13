import { Module } from '@nestjs/common';
import { SongService } from './song/song.service';
import { SongModule } from './song/song.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { SongController } from './song/song.controller';
import { AlbumService } from './album/album.service';

@Module({
  imports: [SongModule, AlbumModule],
  controllers: [AlbumController, SongController],
  providers: [SongService, AlbumService],
})
export class AppModule {}
