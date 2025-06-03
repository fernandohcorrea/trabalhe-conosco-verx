import { SeedCommand } from './commands/seed.command';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CfgModule } from 'src/_config/cfg.module';
import { cliProviders } from './cli.providers';
import { SharedModule } from '../shared/shared.module';
import { seedersProviders } from '../shared/databases/verx/seeders.providers';

@Module({
  imports: [CfgModule, SharedModule, CommandModule],
  providers: [...cliProviders, ...seedersProviders, SeedCommand],
})
export class CliModule {}
