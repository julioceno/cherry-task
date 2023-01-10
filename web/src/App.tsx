import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';

import { RoutesComponent } from './Routes';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3333/cherry-tasks', // TODO: colocar isso num .env
          headers() {
            return {
              authorization: localStorage.getItem('token')
                ? `Bearer ${localStorage.getItem('token')}`
                : undefined,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RoutesComponent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
