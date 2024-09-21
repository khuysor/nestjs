import { Module } from '@nestjs/common';
import { PrismaService } from './primsa/primsa.service';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
