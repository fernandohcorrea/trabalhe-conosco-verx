import { HomeService } from './home.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.homeService.getHello();
  }
}
