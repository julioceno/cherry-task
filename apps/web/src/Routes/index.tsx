import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppWrap } from '../components';
import { menuItemsPrivateList, menuItemsPublic } from './menuItems';

import { config } from '../config';

function RoutesComponent() {
  // FIXME: mudar logica pra saber se esta logado
  const hasLogged = localStorage.getItem(config.tokens.accessToken);
  const list = hasLogged ? menuItemsPrivateList : menuItemsPublic;

  return (
    <Router>
      <Routes>
        {list.map((item, index) => (
          <Route
            path={item.pathname}
            key={index}
            element={
              <AppWrap label={item.label} publicRouter={item.publicRouter}>
                <item.component />
              </AppWrap>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export { RoutesComponent };
