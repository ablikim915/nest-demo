import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateLoginDto {
    @ApiProperty({
        example: "张三"
    })
    @IsNotEmpty({
        message: "name不能为空"
    })
    @IsString()
    @Length(5,10, {
        message: "name长度5-10字符"
    })
    name: string;

    @ApiProperty({
        example: 18
    })
    @IsNotEmpty({
        message: "age不能为空"
    })
    @IsNumber()
    age: number
}
