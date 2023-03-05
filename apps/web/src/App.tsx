import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { RoutesComponent } from './Routes';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar } from './components/Snackbar';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['token']);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3333/cherry-tasks', // TODO: colocar isso num .env
          headers() {
            return {
              authorization: `Bearer ${cookies.token}`,
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <RoutesComponent />
              <Snackbar />
            </ThemeProvider>
          </LocalizationProvider>
        </DndProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
