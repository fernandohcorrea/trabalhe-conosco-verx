import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { AbstractCommand } from './base/abstract.command';

@Injectable()
export class BasicCommand extends AbstractCommand {
  @Command({
    command: 'basic',
    describe: 'Basic Command Test',
  })
  async create() {
    this.strOut.outSession('Basic Command', 'info');
    process.exit(0);
  }
}
