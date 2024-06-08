import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { DataBaseController } from './data-base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBase } from './entities/data-base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataBase])],
  controllers: [DataBaseController],
  providers: [DataBaseService],
})
export class DataBaseModule {}
