import { colorConsole, Tracer } from 'tracer';

const logger: Tracer.Logger = colorConsole({
  format: '[{{timestamp}}] [{{title}}] [{{file}}:{{line}}] {{message}}',
  dateformat: 'HH:MM:ss'
});

export default logger;
