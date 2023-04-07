import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { trpc } from './utils/trpc';

import CssBaseline from '@mui/material/CssBaseline';
import { useCookies } from 'react-cookie';
import { RoutesComponent } from './Routes';
import { Snackbar } from './components/Snackbar';
import { config } from './config';
import { theme } from './theme';
import { userStore } from './stores';

function App() {
  const [cookies] = useCookies(['token']);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.appUrl,
          headers() {
            return {
              authorization: `Bearer ${cookies.token}`,
            };
          },
        }),
      ],
    })
  );

  userStore.getAndValidateTokens();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RoutesComponent />
            <Snackbar />
          </ThemeProvider>
        </DndProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
