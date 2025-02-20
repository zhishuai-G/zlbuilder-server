import { Injectable } from '@nestjs/common';
import { CreateDataBaseDto } from './dto/create-data-base.dto';
import { UpdateDataBaseDto } from './dto/update-data-base.dto';
import { CreateTableDto } from './dto/create-table.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataBase } from './entities/data-base.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateTableDataDto } from './dto/create-table-data.dto';

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

    const sql = `CREATE TABLE IF NOT EXISTS ${tableCode} (${columnsDef});`;
    try {
      // 执行SQL语句来创建表  
      await this.entityManager.query(sql);

      // 将新创建的表的信息保存到data_base表中  
      const dataBaseEntity = new DataBase();
      dataBaseEntity.table_name = tableName;
      dataBaseEntity.table_code = tableCode;
      dataBaseEntity.columns = columns;
      return await this.dataBaseRepository.save(dataBaseEntity);
    } catch (error) {
      console.error(`Failed to create table ${createTableDto.tableCode}:`, error);
    }
  }

  async removeTable(tableCode: string) {
    try {
      // 使用EntityManager执行原生SQL来删除表  
      await this.entityManager.query(`DROP TABLE IF EXISTS ${tableCode};`);

      // 从data_base表中删除对应表的记录  
      await this.dataBaseRepository.delete({ table_code: tableCode });
    } catch (error) {
      console.error(`Failed to remove table ${tableCode} and its record in data_base table:`, error);
    }
  }

  // 获取data_base表的所有数据
  async getAllDataFromDatabase() {
    let data = await this.dataBaseRepository.find()
    return data
  }

  // 根据tableCode查询数据  
  async getTableDataByTableCode(tableCode: string) {
    try {
      const sql = `SELECT * FROM ${tableCode};`;
      return await this.entityManager.query(sql);
    } catch (error) {
      console.error(`Failed to query data from table ${tableCode}:`, error);
      return []; // 或者抛出错误，取决于你的业务逻辑  
    }
  }

  // 获取所有表的数据
  async getDataForTables() {
    const dataList = await this.getAllDataFromDatabase();
    const allData: any[] = [];
    for (const item of dataList) {
      const data = await this.getTableDataByTableCode(item?.table_code);
      const columns = await this.dataBaseRepository.findOne({ where: { table_code: item?.table_code } }).then(item => item.columns)
      allData.push({
        tableName: item?.table_name,
        tableCode: item?.table_code,
        data,
        columns
      });
    }
    return allData
  }

  // 实体新增数据
  async addEntityData(createTableDataDto: CreateTableDataDto) {
    const { tableCode, columnsData } = createTableDataDto;
    try {
      // 确定要插入的列名  
      let insertColumns = columnsData.map(item => item?.key) || [];
      // 构建插入语句的列部分  
      const columnsPart = insertColumns.map(item => `${item}`).join(', ');
      // 构建插入语句的值部分  
      // 确定要插入的列名  
      let insertValues = columnsData.map(item => {  
        if (typeof item.value === 'string') {  
          return `'${item.value}'`; // 字符串值需要引号  
        } else {  
          return `${item.value}`; // 数字值不需要引号  
        }  
      }) || [];
      const valuesPart = insertValues.map(item => `${item}`).join(', ');
      console.log(columnsPart,valuesPart);
      // 构建完整的插入语句  
      const sql = `INSERT INTO ${tableCode} (${columnsPart}) VALUES (${valuesPart})`;
      console.log(sql);
      // 执行插入操作  
      const result = await this.entityManager.query(sql);

      // 返回结果（可能是受影响的行数）  
      return result;
    } catch (error) {
      console.error(`Failed to add data to table ${tableCode}:`, error);
      throw error; // 或者你可以根据需要处理错误  
    }
  }
}
