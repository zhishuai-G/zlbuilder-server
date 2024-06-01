import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageJsonService } from './page-json.service';
import { CreatePageJsonDto } from './dto/create-page-json.dto';
import { UpdatePageJsonDto } from './dto/update-page-json.dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('page-json')
export class PageJsonController {
  constructor(private readonly pageJsonService: PageJsonService) { }

  @Post()
  @ApiOperation({ summary: "创建页面" })
  create(@Body() createPageJsonDto: CreatePageJsonDto) {
    return this.pageJsonService.create(createPageJsonDto);
  }

  @Get()
  @ApiQuery({ name: "pageName", description: "页面名称" })
  findAll(@Query() query: { pageName: string }) {
    return this.pageJsonService.findAll(query);
  }

  @Get('findPageById')
  @ApiOperation({ summary: "查询页面详情" })
  @ApiQuery({ name: "pageId", description: "页面Id" })
  findById(@Query() query: { pageId: string }) {
    return this.pageJsonService.findById(query);
  }

  @Patch(':pageId')
  @ApiOperation({ summary: "更新页面" })
  @ApiParam({ name: "pageId", description: "页面Id" })
  update(@Param('pageId') pageId: string, @Body() updatePageJsonDto: UpdatePageJsonDto) {
    return this.pageJsonService.update(pageId, updatePageJsonDto);
  }

  @Delete(':pageId')
  @ApiOperation({ summary: "删除页面" })
  @ApiParam({ name: "pageId", description: "页面Id" })
  remove(@Param('pageId') pageId: string) {
    return this.pageJsonService.remove(pageId);
  }
}
