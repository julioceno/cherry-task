import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import axios from 'axios';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { tokenRefreshLink } from 'trpc-token-refresh-link';
import { trpc } from './utils/trpc';

import CssBaseline from '@mui/material/CssBaseline';
import { observer } from 'mobx-react-lite';
import { RoutesComponent } from './Routes';
import { Snackbar } from './components/Snackbar';
import { config } from './config';
import { userStore } from './stores';
import { theme } from './theme';

const App = observer(() => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        tokenRefreshLink({
          tokenRefreshNeeded: (query) => {
            console.log(query);
            if (!config.tokens.accessToken) {
              return false;
            }

            return true;
          },
          fetchAccessToken: async (query) => {
            try {
              const response = await axios.post(
                `${config.appUrl}/refreshToken`,
                {
                  refreshToken: localStorage.getItem(
                    config.tokens.refreshToken
                  ),
                }
              );

              localStorage.setItem(
                config.tokens.accessToken,
                response.data.result.data.token
              );
              // TODO: fazer o do refresh token
            } catch (error) {
              if (error instanceof Error && error.message.includes('401')) {
                localStorage.removeItem(config.tokens.accessToken);
                localStorage.removeItem(config.tokens.refreshToken);
                window.location.href = '/';
              }
            }
          },
        }),
        httpBatchLink({
          url: config.appUrl,
          headers() {
            console.log('aaa', localStorage.getItem(config.tokens.accessToken));
            return {
              authorization: `Bearer ${localStorage.getItem(
                config.tokens.accessToken
              )}`,
            };
          },
        }),
      ],
    })
  );

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
});

export default App;
