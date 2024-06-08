import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { CreateDataBaseDto } from './dto/create-data-base.dto';
import { UpdateDataBaseDto } from './dto/update-data-base.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('data-base')
export class DataBaseController {
  constructor(private readonly dataBaseService: DataBaseService) { }

  // 处理创建表和记录的POST请求  
  @Post('table')
  @ApiOperation({ summary: "创建实体表并记录表信息" })
  createTableAndRecord(@Body() createTableDto: CreateTableDto) {
    return this.dataBaseService.createTableAndRecord(createTableDto);
  }

  // 删除表
  @Delete(':tableName')
  @ApiOperation({ summary: "删除实体表" })
  @ApiParam({ name: "tableName", description: "实体名称" })
  remove(@Param('tableName') tableName: string) {
    return this.dataBaseService.removeTable(tableName)
  }

  // 获取实体列表及表数据
  @Get('getDataForTables')
  @ApiOperation({ summary: "获取实体列表及表数据" })
  getDataForTables() {
    return this.dataBaseService.getDataForTables();
  }
}
