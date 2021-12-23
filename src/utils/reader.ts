import fs from 'fs';
import logger from './logger';

const readFile = function (filename: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, data: string) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export const readProperties = function (filename: string): Promise<any> {
  return new Promise(async function (resolve, reject) {
    readFile(__dirname.concat('/../properties/').concat(filename))
      .then(async (data) => {
        let keys: any = {};
        let lines = data.split(';');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim().length > 0) {
            let keyValue = line.split('=');
            let key = keyValue[0].trim();
            keyValue = keyValue.splice(1, keyValue.length);
            keys[key] = keyValue.join('=').trim().replace(/\s+/gm, ' ');
          }
        }
        return resolve(keys);
      })
      .catch((error) => {
        logger.error('No se pudo leer el archivo', error);
        return reject(error);
      });
  });
};
