import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/service/user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [CustomerModule, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
