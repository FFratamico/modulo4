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
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IdParamDTO } from 'src/OthersDtos/id-param.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/config/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.usersService.getAll();
  }

  @Get('page')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async getUsersWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.usersService.getUsersWithPagination(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() param: IdParamDTO) {
    return await this.usersService.deleteUser(param.id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param() param: IdParamDTO,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(param.id, updateUser);
  }
}
