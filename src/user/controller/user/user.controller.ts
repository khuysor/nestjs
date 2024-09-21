import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { Response } from 'express';
import { UserDto, UserLogin } from 'src/user/dto/CreateUser.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @UsePipes(ValidatePromise)
  login(@Body() user: UserLogin) {
    return this.userService.userLogin(user);
  }
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
  @Post('saveOrUpdate')
  save(@Body() user: UserDto) {
    return this.userService.saveOrUpdateUser(user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
