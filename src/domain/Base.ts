import logger from '../utils/logger';

export default class Base {
  constructor() {}

  getLogger = () => {
    return logger;
  };
}
