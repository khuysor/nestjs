import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomerController } from './controller/customer/customer.controller';
import { CustomerService } from './service/customer/customer.service';
import { ValidateMidleWare } from 'src/middlewares/validate-customer-middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateMidleWare).forRoutes({
      path: 'customer',
      method: RequestMethod.GET,
    });
  }
}
