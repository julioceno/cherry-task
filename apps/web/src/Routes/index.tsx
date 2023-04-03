import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppWrap } from '../components';
import { menuItemsPrivateList, menuItemsPublic } from './menuItems';

import { useCookies } from 'react-cookie';

function RoutesComponent() {
  const [cookies] = useCookies(['token']);
  const hasLogged = cookies.token;

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
