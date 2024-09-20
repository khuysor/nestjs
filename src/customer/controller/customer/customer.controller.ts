import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResultRep } from 'src/common/dto/result.dto';
import { CustomerRequest } from 'src/customer/dto/customer-request.dtp';
import { CustomerService } from 'src/customer/service/customer/customer.service';
import { Response } from 'express';
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getAll(): Promise<ResultRep<any>> {
    return await this.customerService.getAll();
  }
  @Get('search')
  async findByName(@Query('name') name: string, @Res() res: Response) {
    const customer = await this.customerService.getByName(name);
    return res.json(customer);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const customer = await this.customerService.getById(id);
    return res.json(customer);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() customer: CustomerRequest) {
    return this.customerService.save(customer);
  }
}
