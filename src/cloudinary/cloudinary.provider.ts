import { v2 as cloudinary } from 'cloudinary';
import { configureCloudinary } from './cloudinary.config';
import { CLOUDINARY } from '../constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    configureCloudinary(configService);
    return cloudinary;
  },
  inject: [ConfigService],
};
