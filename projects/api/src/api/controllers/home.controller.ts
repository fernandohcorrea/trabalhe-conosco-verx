import { HomeService } from './home.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHello(): string {
    return this.homeService.getHello();
  }
}
