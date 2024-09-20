import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResultRep } from 'src/common/dto/result.dto';

@Catch(HttpException)
export class CustomResponse implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();
    res.send(ResultRep.failedWithMessage(exception.message));
  }
}
