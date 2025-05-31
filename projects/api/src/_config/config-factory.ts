import { ConfigFactory } from '@nestjs/config';
import * as path from 'node:path';
import databases from './databases';

export const cfg: ConfigFactory = async () => {
  const config_data = {
    /**
     * Main Configs
     */
    root_dir: path.join(__dirname, `../../`),

    api_host: process.env.API_HOST || '0.0.0.0',

    api_port: process.env.API_PORT || 3000,

    logger: {
      // Levels: 'log;error;warn;debug;verbose'
      levels: process.env.LOGGER_LEVEL || 'log;error;warn;verbose',
    },

    /**
     * Databases configs
     */
    databases,
  };

  return config_data;
};

export default cfg;
