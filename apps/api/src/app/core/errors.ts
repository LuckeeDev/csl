import { saveError } from '@common/logs';

export function setupErrors() {
  process.on('unhandledRejection', (err) => {
    saveError('UnhandledRejection occurred, check db for more details', {
      category: 'server',
      err,
    });
  });

  process.on('uncaughtException', (err) => {
    saveError('UnhandledException occurred, check db for more details', {
      category: 'server',
      err,
    });
  });
}
