import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { Settings } from 'luxon';

Settings.defaultZone = 'America/Sao_Paulo';
Settings.defaultLocale = 'pt-BR';

async function bootstrap() {
  const main = await NestFactory.create(ApiModule);

  const config = main.get(ConfigService);

  main.enableCors();

  const api_host = config.get('api_host');
  const api_port = config.get('api_port');

  console.log(`http://${api_host}:${api_port}`);
  await main.listen(api_port);
}
bootstrap();
