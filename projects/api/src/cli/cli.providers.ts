import StrOut from './commands/base/str-out';

export const cliProviders = [
  {
    provide: 'STR_OUT',
    useFactory: () => new StrOut(),
  },
];
