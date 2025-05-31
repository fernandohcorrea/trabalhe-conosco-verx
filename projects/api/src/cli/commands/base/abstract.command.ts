import { Inject, Injectable } from '@nestjs/common';
import StrOut from './str-out';

/**
 * Abstract Commands
 */
@Injectable()
export abstract class AbstractCommand {
  /**
   * StrOut
   */
  @Inject('STR_OUT')
  protected strOut: StrOut;

  /**
   * Keep Running
   *
   * @param {number} ms default 3000 ms
   * @param {any} callback
   * @param {any[]} args
   * @returns {Promise<void>}
   */
  protected async keepRunning(
    ms: number = 3000,
    callback: any = null,
    args: any[] = [],
  ): Promise<void> {
    while (true) {
      await new Promise((r) => setTimeout(r, ms));
      if (callback) await callback.call(this, args);
    }
  }
}
