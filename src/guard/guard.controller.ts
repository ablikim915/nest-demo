import { Controller, Get, Post, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { RoleGuard } from './role.guard';

@Controller('guard')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @SetMetadata('role', ['admin'])
  findAll() {
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }
}
