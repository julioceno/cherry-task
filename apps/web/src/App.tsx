import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { tokenRefreshLink } from 'trpc-token-refresh-link';
import { RoutesComponent } from './Routes';
import { Snackbar } from './components/Snackbar';
import { config } from './config';
import { theme } from './theme';
import { getUserLink, trpc } from './utils';
import { AxiosTrpcResponse, axiosIntance } from './utils/axios';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        tokenRefreshLink({
          tokenRefreshNeeded: () => {
            try {
              const accessToken = localStorage.getItem(
                config.tokens.accessToken
              );

              if (!accessToken) {
                return false;
              }

              const decodedToken = jwt_decode(accessToken) as { exp: number };

              const expiresIn = decodedToken.exp - Date.now() / 1000;
              if (expiresIn < 1) {
                return true;
              }

              return false;
            } catch {
              return false;
            }
          },
          fetchAccessToken: async () => {
            try {
              const response = await axiosIntance.post<
                AxiosTrpcResponse<{ token: string; refreshToken?: string }>
              >('refreshToken', {
                refreshToken: localStorage.getItem(config.tokens.refreshToken),
              });

              localStorage.setItem(
                config.tokens.accessToken,
                response.data.result.data.token
              );

              if (response.data.result.data.refreshToken) {
                localStorage.setItem(
                  config.tokens.refreshToken,
                  response.data.result.data.refreshToken
                );
              }
            } catch (error) {
              if (error instanceof Error && error.message.includes('401')) {
                localStorage.removeItem(config.tokens.accessToken);
                localStorage.removeItem(config.tokens.refreshToken);
                window.location.href = '/';
              }
            }
          },
        }),
        getUserLink,
        httpBatchLink({
          url: config.appUrl,
          headers() {
            const accessToken = localStorage.getItem(config.tokens.accessToken);

            if (accessToken) {
              return {
                authorization: `Bearer ${accessToken}`,
              };
            }

            return {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutesComponent />
          <Snackbar />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
