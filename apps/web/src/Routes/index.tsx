import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppWrap } from '../components';

import { SignIn, SignUp } from '../pages';
import { Item, menuItems } from './menuItems';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        {menuItems.map((item) => (
          <Route
            path={item.pathname}
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
