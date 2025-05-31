import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cfg from './config-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [cfg],
    }),
  ],
})
export class CfgModule {}
