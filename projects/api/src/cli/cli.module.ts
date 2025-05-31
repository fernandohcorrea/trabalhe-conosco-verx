import { BasicCommand } from './commands/basic.command';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CfgModule } from 'src/_config/cfg.module';
import { cliProviders } from './cli.providers';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [CfgModule, SharedModule, CommandModule],
  providers: [...cliProviders, BasicCommand],
})
export class CliModule {}
