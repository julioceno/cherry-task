import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home, SignIn, SignUp } from '../pages';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export { RoutesComponent };
