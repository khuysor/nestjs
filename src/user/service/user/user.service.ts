import { HttpStatus, Injectable } from '@nestjs/common';
import { ResoucreNotFound } from 'src/exception/not-found-exception.exception';

@Injectable()
export class UserService {
  data = [
    {
      id: 1,
      name: 'kok',
    },
    {
      id: 2,
      name: 'kok',
    },
  ];
  getAllUser() {
    return this.data;
  }
  getUserById(id: number) {
    const res = this.data.filter((d) => d.id == id);
    if (res.length == 0)
      throw new ResoucreNotFound(
        `user not found with id :${id}`,
        HttpStatus.NOT_FOUND,
      );
    return res;
  }
}
