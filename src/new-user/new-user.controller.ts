import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewUserService } from './new-user.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateNewUserDto } from './dto/update-new-user.dto';

@Controller('newUser')
export class NewUserController {
  constructor(private readonly newUserService: NewUserService) {}

  @Post()
  create(@Body() createNewUserDto: CreateNewUserDto) {
    return this.newUserService.create(createNewUserDto);
  }

  @Get()
  findAll(@Query() query: {keyword: string}) {
    return this.newUserService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewUserDto: UpdateNewUserDto) {
    return this.newUserService.update(+id, updateNewUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newUserService.remove(+id);
  }
}
