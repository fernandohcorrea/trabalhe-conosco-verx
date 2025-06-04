import { SeedCommand } from './commands/seed.command';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CfgModule } from '../_config/cfg.module';
import { cliProviders } from './cli.providers';
import { SharedModule } from '../shared/shared.module';
import { seedersProviders } from '../shared/databases/verx/seeders.providers';
import { populateProviders } from '../shared/databases/verx/populate.providers';
import { PopulateCommand } from './commands/populate.command';

@Module({
  imports: [CfgModule, SharedModule, CommandModule],
  providers: [
    ...cliProviders,
    ...seedersProviders,
    ...populateProviders,
    SeedCommand,
    PopulateCommand,
  ],
})
export class CliModule {}
