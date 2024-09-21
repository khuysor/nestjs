import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResultRep<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  msg: string;

  constructor(code: number, msg: string, data?: T) {
    this.code = code;
    this.msg = msg;
    if (data !== undefined) {
      this.data = data;
    }
  }

  @ApiPropertyOptional({ type: 'object', required: false })
  data?: T;

  static success<T>(data?: T, msg?: string): ResultRep<T | null> {
    return new ResultRep<T>(200, 'Success', data);
  }
  static created<T>(data?: T, msg?: string): ResultRep<T | null> {
    return new ResultRep<T>(201, 'Success', data);
  }
  static notfound(): ResultRep<null> {
    return new ResultRep<null>(1, 'Not found'); // No data returned
  }

  static failed(): ResultRep<null> {
    return new ResultRep<null>(1, 'Faild'); // No data returned
  }

  static failedWithMessage(msg: string): ResultRep<null> {
    return new ResultRep<null>(1, msg); // No data returned
  }
}
export class ResultRepWithOutData {
  @ApiProperty()
  code: number;
  @ApiProperty()
  msg: string;
}
