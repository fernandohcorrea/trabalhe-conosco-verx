import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { CliModule } from './cli/cli.module';

async function bootstrap() {
  const cli = await NestFactory.createApplicationContext(CliModule, {
    // logger: false,
  });

  try {
    await cli.select(CommandModule).get(CommandService).exec();
    await cli.close();
  } catch (error) {
    console.error(error);
    await cli.close();
    process.exit(1);
  }
}

bootstrap();
