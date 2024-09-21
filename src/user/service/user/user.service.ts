import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ResultRep } from 'src/common/dto/result.dto';
import { PrismaService } from 'src/prisma/primsa/primsa.service';
import {
  UserDto,
  UserLogin,
  UserLoginSuccess,
  toUserCreate,
  toUserReponse,
} from 'src/user/dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async deleteById(id: number) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        user_setting: true,
      },
    });
    if (!res) {
      return ResultRep.failedWithMessage(`can't found user this id ${id}`);
    }
    const del = await this.prisma.user.delete({
      where: { id: id },
    });
    if (del) {
      return ResultRep.success();
    }
    return ResultRep.failed();
  }
  async saveOrUpdateUser(user: UserDto) {
    if (user.id != null) {
      return await this.prisma.user
        .findUnique({
          where: { id: user.id },
        })
        .then((e) => {
          if (e != null) {
            return this.prisma.user
              .update({
                where: { id: user.id },
                data: {
                  ...toUserCreate(user),
                  update_at: new Date(),
                },
              })
              .then((e) => ResultRep.success(toUserReponse(e)))
              .catch(() =>
                ResultRep.failedWithMessage('Failed to update user.'),
              );
          }
          return ResultRep.failedWithMessage(
            `can't update user with ${user.id}`,
          );
        })
        .catch(() =>
          ResultRep.failedWithMessage(`can't update user with ${user.id}`),
        );
    }

    return await this.prisma.user
      .create({
        data: {
          ...toUserCreate(user),
          user_setting: {
            create: {
              sms_enable: true,
              notifation_on: true,
            },
          },
        },
      })
      .then((e) => ResultRep.created(toUserReponse(e)))
      .catch(() => ResultRep.failedWithMessage('Failed to create user.'));
  }

  async getAllUser() {
    return await this.prisma.user
      .findMany({
        orderBy: { id: 'desc' },
        include: { user_setting: true },
      })
      .then((e) => e.map((u) => toUserReponse(u)))
      .catch(() => ResultRep.failedWithMessage('Something went wrong'));
  }

  async getUserById(id: number) {
    return await this.prisma.user
      .findUnique({
        where: { id: id },
        include: { user_setting: true }, // Include user settings if needed
      })
      .then((data) => ResultRep.success(toUserReponse(data)))
      .catch(() =>
        ResultRep.failedWithMessage(`User not found with id: ${id}`),
      );
  }

  async userLogin(data: UserLogin) {
    return await this.prisma.user
      .findUnique({
        where: {
          username: data.userName,
        },
      })
      .then((user: User) => {
        if (!user || !this.checkingPassword(data.password, user.password)) {
          return ResultRep.failedWithMessage('Invalid username password');
        } else {
          const data: UserLoginSuccess = {
            userName: user.username,
            accessToken: this.jwtService.sign({
              sub: user.id,
              username: user.username,
            }),
          };
          return ResultRep.success(data);
        }
      })
      .catch((e) => {
        console.log(e);
        ResultRep.failedWithMessage('Something when wrong');
      });
  }
  private checkingPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
