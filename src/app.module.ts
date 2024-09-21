import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/service/user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [CustomerModule, UserModule, PrismaModule, PostModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
