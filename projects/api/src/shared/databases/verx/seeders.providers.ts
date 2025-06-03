import * as path from 'path';
import * as fs from 'fs/promises';
import { SeedHarvests1748894444155 } from './seeders/1748894444155-SeedHarvests';
import { SeedRuralProductionItems1748911145275 } from './seeders/1748911145275-SeedRuralProductionItems';

const preProviders = [
  {
    provide: 'SeedHarvests1748894444155',
    useClass: SeedHarvests1748894444155,
  },
  {
    provide: 'SeedRuralProductionItems1748911145275',
    useClass: SeedRuralProductionItems1748911145275,
  },
];

export const seedersProviders = [
  ...preProviders,
  {
    provide: 'LIST_SEEDERS',
    useFactory: async () => {
      const files = await fs.readdir(path.join(__dirname, '/seeders'));
      const listOut = [];

      for (const file of files) {
        if (!file.endsWith('.js')) {
          continue;
        }

        const regex = /^(?<time>[0-9]{1,})-(?<name>.{1,})(?<ext>.js)$/g;
        const ereg = regex.exec(file);

        if (!ereg) {
          continue;
        }

        const className = `${ereg.groups.name}${ereg.groups.time}`;

        preProviders.map((item) => {
          if (item.provide === className) {
            listOut.push(item);
            return item;
          }
        });
      }

      return listOut;
    },
  },
];
