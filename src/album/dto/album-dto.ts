import { IsString, IsNotEmpty } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;
}
