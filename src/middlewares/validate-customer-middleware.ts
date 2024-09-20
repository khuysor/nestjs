import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class ValidateMidleWare implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({
        code: 1,
        msg: 'Unauthorization',
      });
    }
    next();
  }
}
