import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../images"),// 图片存放目录
      filename: (_, file, callback) => {
        //定义fileName是为了把上传后的图片重新命名，这里是利用时间戳的形式命名，保证命名的唯一性
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, fileName)
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
