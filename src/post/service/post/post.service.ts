import { Injectable } from '@nestjs/common';
import { ResultRep } from 'src/common/dto/result.dto';
import { PostDto, toCreatePost, toPostRespone } from 'src/post/dto/post.dto';
import { PrismaService } from 'src/prisma/primsa/primsa.service';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return (await this.prisma.post.findMany()).map((e) =>
      ResultRep.success(toPostRespone(e)),
    );
  }
  async saveOrUpdate(data: PostDto) {
    if (data.id != null) {
      return await this.prisma.post
        .findUnique({
          where: {
            id: data.id,
          },
        })
        .then((post) => {
          if (post == null) {
            return ResultRep.failed();
          }
          return this.prisma.post
            .update({
              where: { id: data.id },
              data: toCreatePost(data),
            })
            .then(() => ResultRep.created())
            .catch(() => ResultRep.failed());
        });
    } else {
      return await this.prisma.post
        .create({ data: toCreatePost(data) })
        .then((e) => {
          return ResultRep.created();
        })
        .catch((e) => {
          return ResultRep.failed();
        });
    }
  }
}
