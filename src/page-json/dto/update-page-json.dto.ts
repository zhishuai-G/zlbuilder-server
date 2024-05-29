import { PartialType } from '@nestjs/mapped-types';
import { CreatePageJsonDto } from './create-page-json.dto';

export class UpdatePageJsonDto extends PartialType(CreatePageJsonDto) {}
