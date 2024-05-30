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
    const data = new PageJson()
    data.pageId = createPageJsonDto.pageId
    data.pageName = createPageJsonDto.pageName
    return this.pageJson.save(data)
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

  async findById(query: { pageId: string; }) {
    let data = await this.pageJson.findOne({
      where: {
        pageId: Like(`%${query.pageId}%`)
      }
    })
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageJson`;
  }

  async update(pageId: string, updatePageJsonDto: UpdatePageJsonDto) {
    const updatePageJson = await this.pageJson.findOne({
      where: {
        pageId
      }
    })
    if (!updatePageJson) {
      throw new Error('Page not found')
    }
    let data = new PageJson()
    data.pageName = updatePageJsonDto.pageName
    data.pageJson = updatePageJsonDto.pageJson
    return await this.pageJson.update(updatePageJson?.id, data)
  }

  async remove(pageId: string) {
    const deletePageJson = await this.pageJson.findOne({
      where: {
        pageId
      }
    })
    if (!deletePageJson) {
      throw new Error('Page not found')
    }
    return await this.pageJson.delete(deletePageJson?.id)
  }
}
