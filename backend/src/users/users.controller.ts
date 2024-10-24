import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthUserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('me')
  findOne(@Req() req) {
    return this.usersService.findOneById(req.user['sub']);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
