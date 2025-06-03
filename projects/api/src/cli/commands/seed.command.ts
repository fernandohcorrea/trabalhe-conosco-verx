import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Command, Option } from 'nestjs-command';
import { AbstractCommand } from './base/abstract.command';
import { toWays, toWaysStrings } from './base/types';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class SeedCommand extends AbstractCommand {
  @Inject('DATA_SOURCE')
  private dataSource: DataSource;

  @Inject('LIST_SEEDERS')
  private listSeeders: any;

  constructor(private moduleRef: ModuleRef) {
    super();
  }

  @Command({
    command: 'seed',
    describe: 'Seeds the database up or down',
  })
  async create(
    @Option({
      name: 'to',
      alias: 't',
      describe: 'direction up or down',
      default: 'up',
      requiresArg: false,
      type: 'string',
    })
    to: toWaysStrings,
  ) {
    const goToWay = toWays[to.toUpperCase()];
    if (!goToWay) {
      this.strOut.outDanger('Invalid direction');
      process.exit(1);
    }

    this.strOut.outSession('Seeding database', 'info');
    await this.run(goToWay);
    process.exit(0);
  }

  private async run(goToWay: toWaysStrings): Promise<any> {
    if (goToWay === 'UP') {
      this.strOut.outWarning('Seeding UP: ');
    } else if (goToWay === 'DOWN') {
      this.strOut.outWarning('Seeding DOWN: ');
      this.listSeeders = this.listSeeders.reverse();
    }

    const queryRunner = this.dataSource.createQueryRunner();

    for (const item of this.listSeeders) {
      const seederObj = await this.moduleRef.resolve(item.provide);
      this.strOut.outInfo(`  Seeding ${item.provide}: `, false);

      try {
        if (goToWay === 'UP') {
          await seederObj.up(queryRunner);
        } else if (goToWay === 'DOWN') {
          await seederObj.down(queryRunner);
        } else {
          this.strOut.outDanger('Invalid direction');
          process.exit(1);
        }

        this.strOut.outSuccess('[ OK ]');
      } catch (error) {
        this.strOut.outDanger('[ FAIL ]');
        console.error(error);
        process.exit(1);
      }
    }

    return this.strOut.outSuccess('Seeders done!');
  }
}
