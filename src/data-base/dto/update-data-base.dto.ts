import { PartialType } from '@nestjs/swagger';
import { CreateDataBaseDto } from './create-data-base.dto';

export class UpdateDataBaseDto extends PartialType(CreateDataBaseDto) {}
