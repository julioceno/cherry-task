import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppWrap } from '../components';

import { menuItems } from './menuItems';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        {menuItems.map((item, index) => (
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
