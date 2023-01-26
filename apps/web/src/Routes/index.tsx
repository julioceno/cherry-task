import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignIn, SignUp, Dashboard } from '../pages';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export { RoutesComponent };
