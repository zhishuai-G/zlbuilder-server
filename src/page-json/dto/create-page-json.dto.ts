import { ApiProperty } from "@nestjs/swagger";

export class CreatePageJsonDto {
  @ApiProperty({ description: '页面Id', example: '12' })
  readonly pageId: string;

  @ApiProperty({ description: '页面名称', example: '测试增加接口' })
  readonly pageName: string
}
