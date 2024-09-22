import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResultRep } from 'src/common/dto/result.dto';
import { PostDto } from 'src/post/dto/post.dto';
import { PostService } from 'src/post/service/post/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @ApiResponse({
    status: 201,
    type: ResultRep,
  })
  @Post()
  saveOrUpdate(@Body() post: PostDto) {
    return this.postService.saveOrUpdate(post);
  }
  @ApiResponse({
    status: 201,
    type: ResultRep,
  })
  @Get()
  getAll() {
    return this.postService.getAll();
  }
}
