import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'create a new role' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  create(@Body() roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }

  @ApiOperation({ summary: 'get all roles' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'get role by id' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.roleService.findById(id);
  }

  @ApiOperation({ summary: 'get role by name' })
  @Get('name')
  @UseGuards(AuthGuard)
  findByRole(@Body() name: string) {
    return this.roleService.findByRole(name);
  }

  @ApiOperation({ summary: 'update role by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() roleDto: RoleDto) {
    return this.roleService.update(id, roleDto);
  }

  @ApiOperation({ summary: 'delete role by id' })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
