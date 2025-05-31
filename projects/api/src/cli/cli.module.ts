import { BasicCommand } from './commands/basic.command';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CfgModule } from 'src/_config/cfg.module';
import { cliProviders } from './cli.providers';

@Module({
  imports: [CfgModule, CommandModule],
  providers: [...cliProviders, BasicCommand],
})
export class CliModule {}
