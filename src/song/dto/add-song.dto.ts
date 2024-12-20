import { IsString, IsNotEmpty } from 'class-validator';

export class AddSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsString()
  readonly text: string;
}
