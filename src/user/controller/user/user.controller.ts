import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from 'src/exception/custom-exception-response.exception';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @UseFilters(CustomResponse)
  getUserById(@Param('id') id: number, @Res() res: Response) {
    res.json(this.userService.getUserById(id));
  }
}
