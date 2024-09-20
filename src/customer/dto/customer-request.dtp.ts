import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CustomerRequest {
  @Transform(
    (value) => (typeof value === 'string' ? parseInt(value, 10) : value),
    { toClassOnly: true },
  )
  @ApiProperty({ required: false })
  id: any;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}

export class CustomerResponse {
  id: number;
  name: string;
  email: string;
}
