import { HttpException, HttpStatus } from '@nestjs/common';

export class ResoucreNotFound extends HttpException {
  constructor(msg: string, code: HttpStatus) {
    super(msg || 'resoucre not found', code || HttpStatus.NOT_FOUND);
  }
}
