import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'

export class CreateLoginDto {
    @IsNotEmpty({
        message: "name不能为空"
    })
    @IsString()
    @Length(5,10, {
        message: "name长度5-10字符"
    })
    name: string;

    @IsNotEmpty({
        message: "age不能为空"
    })
    @IsNumber()
    age: number
}
