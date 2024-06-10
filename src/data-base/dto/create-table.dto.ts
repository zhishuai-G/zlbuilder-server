import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {
  @ApiProperty({ description: '数据表名称', example: '学生表' })
  readonly tableName: string;
  @ApiProperty({ description: '数据表编码', example: 'student' })
  readonly tableCode: string;
  @ApiProperty({
    description: '列信息', example: [
      {
        "columnName": "name",
        "type": "VARCHAR(255)"
      },
      {
        "columnName": "age",
        "type": "INTEGER"
      }
    ],
  })
  readonly columns: Array<{ columnName: string; type: string; }>;
}