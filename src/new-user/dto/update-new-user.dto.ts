import { PartialType } from '@nestjs/swagger';
import { CreateNewUserDto } from './create-new-user.dto';

export class UpdateNewUserDto extends PartialType(CreateNewUserDto) {}
