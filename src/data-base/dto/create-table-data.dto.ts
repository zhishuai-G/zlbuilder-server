import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDataDto {
  @ApiProperty({ description: '数据表编码', example: 'student' })
  readonly tableCode: string;
  @ApiProperty({
    description: '列数据', example: [
      {  
        "key": "name",  
        "value": "John Doe"  
      },
      {  
        "key": "age",  
        "value": 11 
      }
    ]
  })
  readonly columnsData: Array<{ key: string, value: string }>;
}