import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNewUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    desc: string
}
