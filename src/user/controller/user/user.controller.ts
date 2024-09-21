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
import { ApiResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { Response } from 'express';
import { ResultRep, ResultRepWithOutData } from 'src/common/dto/result.dto';
import {
  UserDto,
  UserLogin,
  UserResponseDto,
} from 'src/user/dto/CreateUser.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() user: UserLogin) {
    return this.userService.userLogin(user);
  }
  @ApiResponse({
    status: 200,
    type: ResultRep,
  })
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }
  @ApiResponse({
    status: 200,
    type: ResultRep,
  })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
  @ApiResponse({
    status: 201,
    type: ResultRep,
  })
  @Post('saveOrUpdate')
  save(@Body() user: UserDto) {
    return this.userService.saveOrUpdateUser(user);
  }
  @ApiResponse({
    status: 200,
    type: ResultRepWithOutData,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
