import * as path from 'path';
import * as fs from 'fs/promises';
import { PopulateRuralProducers1748894444160 } from './populates/1748894444160-PopulateRuralProducers';
import { PopulateAddresses1748987407542 } from './populates/1748987407542-PopulateAddresses';
import { PopulateRuralProperty1749042366576 } from './populates/1749042366576-PopulateRuralProperty';
import { PopulatePlots1749046211538 } from './populates/1749046211538-PopulatePlots';
import { PopulateHarvestProductions1749049920096 } from './populates/1749049920096-PopulateHarvestProductions';

const preProviders = [
  {
    provide: 'PopulateRuralProducers1748894444160',
    useClass: PopulateRuralProducers1748894444160,
  },
  {
    provide: 'PopulateAddresses1748987407542',
    useClass: PopulateAddresses1748987407542,
  },
  {
    provide: 'PopulateRuralProperty1749042366576',
    useClass: PopulateRuralProperty1749042366576,
  },
  {
    provide: 'PopulatePlots1749046211538',
    useClass: PopulatePlots1749046211538,
  },
  {
    provide: 'PopulateHarvestProductions1749049920096',
    useClass: PopulateHarvestProductions1749049920096,
  },
];

export const populateProviders = [
  ...preProviders,
  {
    provide: 'LIST_POPULATES',
    useFactory: async () => {
      const files = await fs.readdir(path.join(__dirname, '/populates'));
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
