import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Response from './common/response'
import HttpFilter from './common/filter';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  const options = new DocumentBuilder().setTitle('zl接口文档').setDescription('描述').setVersion('1').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document)
  app.useStaticAssets(join(__dirname,'images'),{
    prefix:"/uploadImage"
  })
  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpFilter())
  await app.listen(9091);
}
bootstrap();
