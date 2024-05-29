import { Module } from '@nestjs/common';
import { PageJsonService } from './page-json.service';
import { PageJsonController } from './page-json.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageJson } from './entities/page-json.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageJson])],
  controllers: [PageJsonController],
  providers: [PageJsonService],
})
export class PageJsonModule { }
