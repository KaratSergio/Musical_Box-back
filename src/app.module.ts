import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { FileModule } from './file/file.module';

import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'dist', 'static'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    SongModule,
    AlbumModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
