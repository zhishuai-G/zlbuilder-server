import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageJsonService } from './page-json.service';
import { CreatePageJsonDto } from './dto/create-page-json.dto';
import { UpdatePageJsonDto } from './dto/update-page-json.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('page-json')
export class PageJsonController {
  constructor(private readonly pageJsonService: PageJsonService) { }

  @Post()
  create(@Body() createPageJsonDto: CreatePageJsonDto) {
    return this.pageJsonService.create(createPageJsonDto);
  }

  @Get()
  @ApiQuery({ name: "pageName", description: "页面名称" })
  findAll(@Query() query: { pageName: string }) {
    return this.pageJsonService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageJsonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageJsonDto: UpdatePageJsonDto) {
    return this.pageJsonService.update(+id, updatePageJsonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageJsonService.remove(+id);
  }
}
