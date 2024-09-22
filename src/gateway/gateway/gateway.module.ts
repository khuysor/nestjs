import { Module } from '@nestjs/common';
import { MyGateWay } from './web-socker-gateway';

@Module({
    providers:[MyGateWay],
})
export class GatewayModule {}
