import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

class PostDto {
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  id: number;

  @IsString()
  title: string;
  @IsString()
  discription: string;
  
  @IsInt({ message: 'userId must be an integer' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  userId: number;
}
function toCreatePost(post: PostDto) {
  return {
    title: post.title,
    discription: post.discription,
    user_id: post.userId,
  };
}
function toPostRespone(post: Prisma.PostUncheckedCreateInput) {
  return {
    id: post.id,
    title: post.title,
    discription: post.discription,
    userId: post.user_id,
  };
}
export { PostDto, toCreatePost, toPostRespone };
