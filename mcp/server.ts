import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { catalog } from './catalog.generated';
import { createCatalogServer } from './catalog';

serveStdio(() => {
  return createCatalogServer(catalog);
});
