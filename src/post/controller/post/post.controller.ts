import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostDto } from 'src/post/dto/post.dto';
import { PostService } from 'src/post/service/post/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  saveOrUpdate(@Body() post: PostDto) {
    return this.postService.saveOrUpdate(post);
  }
  @Get()
  getAll() {
    return this.postService.getAll();
  }
}
