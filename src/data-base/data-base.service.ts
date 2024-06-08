import { Injectable } from '@nestjs/common';
import { CreateDataBaseDto } from './dto/create-data-base.dto';
import { UpdateDataBaseDto } from './dto/update-data-base.dto';
import { CreateTableDto } from './dto/create-table.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataBase } from './entities/data-base.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DataBaseService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager, @InjectRepository(DataBase) private dataBaseRepository: Repository<DataBase>) { }
  async createTableAndRecord(createTableDto: CreateTableDto) {
    const { tableName, tableCode, columns } = createTableDto;
    // 构建除了id之外的其他列的SQL定义  
    const otherColumnsDef = columns?.map(col => `${col.columnName} ${col.type}`).join(', ');

    // 硬编码id列作为主键，并设置为自增  
    const idColumnDef = 'id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY';

    // 合并id列定义和其他列定义  
    const columnsDef = [idColumnDef, otherColumnsDef].filter(Boolean).join(', ');
    console.log(columnsDef);

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDef});`;
    try {
      // 执行SQL语句来创建表  
      await this.entityManager.query(sql);

      // 将新创建的表的信息保存到data_base表中  
      const dataBaseEntity = new DataBase();
      dataBaseEntity.table_name = tableName;
      dataBaseEntity.table_code = tableCode;
      await this.dataBaseRepository.save(dataBaseEntity);
    } catch (error) {
      console.error(`Failed to create table ${createTableDto.tableName}:`, error);
    }
  }

  async removeTable(tableName: string) {
    try {
      // 使用EntityManager执行原生SQL来删除表  
      await this.entityManager.query(`DROP TABLE IF EXISTS ${tableName};`);

      // 从data_base表中删除对应表的记录  
      await this.dataBaseRepository.delete({ table_name: tableName });
    } catch (error) {
      console.error(`Failed to remove table ${tableName} and its record in data_base table:`, error);
    }
  }

  // 获取所有表的名称
  async getTableNames() {
    let data = await this.dataBaseRepository.find()
    return data.map(item => item.table_name)
  }

  // 根据table_name查询数据  
  async getTableDataByTableName(tableName: string) {
    try {  
      const sql = `SELECT * FROM ${tableName};`;
      return await this.entityManager.query(sql);
    } catch (error) {
      console.error(`Failed to query data from table ${tableName}:`, error);
      return []; // 或者抛出错误，取决于你的业务逻辑  
    }
  }

  // 获取所有表的数据
  async getDataForTables(){
    const tableNames = await this.getTableNames();
    const allData: any[] = []; 
    for (const tableName of tableNames) {
      const data = await this.getTableDataByTableName(tableName);
      allData.push({
        tableName,
        data
      });
    }
    return allData
  }
}
