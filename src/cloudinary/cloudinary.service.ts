import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileType } from './cloudinary.interfaces';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    fileType: FileType,
  ): Promise<string> {
    const resourceType = fileType === FileType.AUDIO ? 'video' : 'image';

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: fileType === FileType.IMAGE ? 'images' : 'audio',
          public_id: file.originalname,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(publicId: string, type: FileType): Promise<void> {
    const resourceType = type === FileType.AUDIO ? 'video' : 'image';
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }
}
