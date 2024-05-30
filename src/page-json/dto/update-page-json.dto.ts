import { PartialType } from '@nestjs/mapped-types';
import { CreatePageJsonDto } from './create-page-json.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageJsonDto extends PartialType(CreatePageJsonDto) {

  @ApiProperty({ description: '页面名称n', example: '测试更新接口' })
  readonly pageName: string

  @ApiProperty({ description: '页面JSON结构', example: { name: '测试更新接口'  } })
  readonly pageJson: any
}
