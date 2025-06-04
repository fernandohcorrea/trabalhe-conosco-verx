import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Command, Option } from 'nestjs-command';
import { AbstractCommand } from './base/abstract.command';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class PopulateCommand extends AbstractCommand {
  @Inject('DATA_SOURCE')
  private dataSource: DataSource;

  @Inject('LIST_POPULATES')
  private listPopulates: any;

  constructor(private moduleRef: ModuleRef) {
    super();
  }

  @Command({
    command: 'populate',
    describe: 'Populate the database up or down',
  })
  async create(
    @Option({
      name: 'populate_factor',
      alias: 'f',
      describe: '',
      default: 2,
      requiresArg: false,
      type: 'number',
    })
    populate_factor: number,
  ) {
    this.strOut.outSession('Populating database', 'info');
    await this.run(populate_factor);
    process.exit(0);
  }

  private async run(populate_factor: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    for (const item of this.listPopulates) {
      const populateObj = await this.moduleRef.resolve(item.provide);
      this.strOut.outInfo(`  Populate ${item.provide}: `, false);

      try {
        await populateObj.up(queryRunner, populate_factor);

        this.strOut.outSuccess('[ OK ]');
      } catch (error) {
        this.strOut.outDanger('[ FAIL ]');
        console.error(error);
        process.exit(1);
      }
    }

    return this.strOut.outSuccess('Populates done!');
  }
}
