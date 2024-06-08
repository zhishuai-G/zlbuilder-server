import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {
  @ApiProperty({ description: '数据表名称', example: 'student' }) 
  readonly tableName: string;  
  @ApiProperty({ description: '数据表编码', example: '12345' })
  readonly tableCode: string; 
  @ApiProperty({ description: '列信息', example: [
    {  
      "columnName": "name",  
      "type": "VARCHAR(255)"  
    },  
    {  
      "columnName": "age",  
      "type": "INTEGER"
    }
  ],  })
  readonly columns: Array<{ columnName: string; type: string; }>;  
}