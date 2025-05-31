import { dataSource } from './verx/verx.datasource';

export const DatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return await dataSource.initialize();
    },
  },
];
