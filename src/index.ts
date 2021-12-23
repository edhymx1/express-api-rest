if (!process.env.PRODUCTION) {
  require('dotenv').config();
}
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { readProperties } from './utils/reader';
import logger from './utils/logger';

async function main() {
  try {
    const sqlProperties = await readProperties('sql.properties');
    logger.debug('sql.properties', sqlProperties);

    const app = express();
    app.use(cors());
    app.use(morgan('dev'));

    app.listen(process.env.PORT, () => {
      logger.log('Servidor funcionando correctamente');
      logger.debug('PORT:', process.env.PORT);
    });
  } catch (error) {
    logger.error('No se pudo levantar el servidor', error);
    process.kill(process.pid);
  }
}

main();
