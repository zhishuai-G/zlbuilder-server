import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { CreateDataBaseDto } from './dto/create-data-base.dto';
import { UpdateDataBaseDto } from './dto/update-data-base.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { CreateTableDataDto } from './dto/create-table-data.dto';

@Controller('data-base')
@ApiTags('实体管理')
export class DataBaseController {
  constructor(private readonly dataBaseService: DataBaseService) { }

  // 处理创建表和记录的POST请求  
  @Post('table')
  @ApiOperation({ summary: "创建实体表并记录表信息" })
  createTableAndRecord(@Body() createTableDto: CreateTableDto) {
    return this.dataBaseService.createTableAndRecord(createTableDto);
  }

  // 删除表
  @Delete(':tableCode')
  @ApiOperation({ summary: "删除实体表" })
  @ApiParam({ name: "tableCode", description: "实体名称" })
  remove(@Param('tableCode') tableCode: string) {
    return this.dataBaseService.removeTable(tableCode)
  }

  // 获取实体列表及表数据
  @Get('getDataForTables')
  @ApiOperation({ summary: "获取实体列表及表数据" })
  getDataForTables() {
    return this.dataBaseService.getDataForTables();
  }

  // 实体新增数据
  @Post('addEntityData')
  @ApiOperation({ summary: "实体新增数据" })
  addEntityData(@Body() createTableDataDto: CreateTableDataDto) {
    return this.dataBaseService.addEntityData(createTableDataDto);
  }
}