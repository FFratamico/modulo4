import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IdParamDTO } from 'src/OthersDtos/id-param.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/config/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.usersService.getAll();
  }

  @Get('page')
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async getUsersWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.usersService.getUsersWithPagination(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param() param: IdParamDTO) {
    return await this.usersService.getUserById(param.id);
  }

  @Post('seeder')
  addUsers(){
    return this.usersService.addUsers();
  }

  @Delete(':id')
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() param: IdParamDTO) {
    return await this.usersService.deleteUser(param.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param() param: IdParamDTO,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(param.id, updateUser);
  }
}
