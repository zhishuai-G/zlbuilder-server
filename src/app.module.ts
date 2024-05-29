import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageJsonModule } from './page-json/page-json.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [PageJsonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zl123456',
      database: 'zhilinserve',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay:500,
      retryAttempts:10,
      autoLoadEntities:true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}