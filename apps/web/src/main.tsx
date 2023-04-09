import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Suspense>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.Suspense>
);

//O React pode esta com o Suspense pois tenho que renderizar meu retorno de destruição de componente uma unica vez, pois assim, fazemos uma escrita no banco. Dessa forma, desabilitei para evitar trabalho
