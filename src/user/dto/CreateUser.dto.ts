import { ApiProperty } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import exp from 'constants';

class UserDto {
  // @ApiProperty({ required: false })
  // @IsNumberString()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  id: number; // Make optional

  @IsNotEmpty()
  @MinLength(3, { message: 'username must be atleast 8' })
  @ApiProperty() // Document the property
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty() // Document the property
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password must be atleast 8 charactor' })
  @ApiProperty() // Document the property
  password: string;

  @IsString()
  @IsOptional()
  displayName: string; // Make optional
}
function toUserCreate(user: UserDto) {
  return {
    username: user.userName,
    email: user.email,
    password: enCodePassword(user.password),
    display_name: user.displayName,
  };
}
function enCodePassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}
export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
function toUserReponse(
  user: Prisma.UserUncheckedCreateInput | User,
): UserResponseDto {
  const response: any = {
    id: user.id,
    userName: user.username,
    email: user.email,
    displayName: user.display_name,
    createdAt: user.create_at,
    updatedAt: user.update_at,
  };

  if ('user_setting' in user) {
    response.userSetting = user.user_setting;
  }

  return response;
}

class UserLogin {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
class UserLoginSuccess {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  accessToken: string;
}
export { UserDto, toUserReponse, toUserCreate, UserLogin, UserLoginSuccess };
