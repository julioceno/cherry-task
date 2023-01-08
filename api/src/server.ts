import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

import { appRouter } from './routes';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const app = express();

app.use(cors());
app.use(
  '/cherry-tasks',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

/**
 * ##  PRECISAMOS DISSO ##
 * No momento que eu salvo a aplicação, o ts-node-dev "mata" a o
 * processo filho e abre um novo processo. O ts-node-dev não estava
 * conceguindo "matar" o processo pois o Prisma cria um outro processo
 * (acredito que seja a conexão aberta do o banco de dados).
 *
 * https://pt.stackoverflow.com/questions/485723/erro-no-reload-ts-node-dev-e-prismaclient
 */
process.on('SIGTERM', () => {
  process.exit();
});

app.listen(3333);
