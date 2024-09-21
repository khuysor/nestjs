import { Module } from '@nestjs/common';
import { PostController } from './controller/post/post.controller';
import { PostService } from './service/post/post.service';
import { PrismaService } from 'src/prisma/primsa/primsa.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
