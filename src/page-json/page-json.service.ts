import { Injectable } from '@nestjs/common';
import { CreatePageJsonDto } from './dto/create-page-json.dto';
import { UpdatePageJsonDto } from './dto/update-page-json.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PageJson } from './entities/page-json.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PageJsonService {
  constructor(@InjectRepository(PageJson) private readonly pageJson: Repository<PageJson>) { }
  create(createPageJsonDto: CreatePageJsonDto) {
    return 'This action adds a new pageJson';
  }

  async findAll(query: { pageName: string }) {
    let options = {};
    if (query?.pageName && query.pageName.trim() !== '') {
      options = {
        where: {
          pageName: Like(`%${query.pageName}%`)
        }
      }
    }
    let data = await this.pageJson.find(options)
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageJson`;
  }

  update(id: number, updatePageJsonDto: UpdatePageJsonDto) {
    return `This action updates a #${id} pageJson`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageJson`;
  }
}
