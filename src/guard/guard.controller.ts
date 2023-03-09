import { Controller, Get, Post, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { RoleGuard } from './role.guard';
import { Role, ReqUrl } from './role.decorator'
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('guard')
@UseGuards(RoleGuard)
@ApiBearerAuth() // jwt验证
@ApiTags('守卫接口')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @Role('admin')
  // @ApiResponse({}) 响应字段说明
  findAll(@ReqUrl() url: string) {
    console.log('--url---', url)
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "查询用户信息",
    description: "查询指定id用户信息接口"
  })
  @ApiParam({
    name: "id",
    description: "用户id",
    required: true,
    type: "string"
  })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }
}
