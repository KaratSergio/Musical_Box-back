import { Injectable } from '@nestjs/common';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { FileType } from './cloudinary.interfaces';

@Injectable()
export class CloudinaryStorageService {
  private storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      let folder: string;
      let allowedFormats: string[];

      if (file.fieldname === FileType.IMAGE) {
        folder = 'images';
        allowedFormats = ['jpg', 'png'];
      } else if (file.fieldname === FileType.AUDIO) {
        folder = 'audio';
        allowedFormats = ['mp3', 'wav'];
      }

      return {
        folder: folder,
        format: allowedFormats.includes(file.mimetype.split('/')[1])
          ? file.mimetype.split('/')[1]
          : undefined,
        public_id: file.originalname,
        resource_type: file.fieldname === FileType.AUDIO ? 'video' : 'image',
      };
    },
  });

  multerMiddleware() {
    return multer({ storage: this.storage }).fields([
      { name: FileType.AUDIO, maxCount: 1 },
      { name: FileType.IMAGE, maxCount: 1 },
    ]);
  }
}
