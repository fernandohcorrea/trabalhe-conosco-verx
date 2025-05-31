import { CfgModule } from './../_config/cfg.module';
import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './controllers/home.service';
@Module({
  imports: [CfgModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class ApiModule {}
