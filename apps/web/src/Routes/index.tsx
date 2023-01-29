import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignIn, SignUp, Tasks } from '../pages';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export { RoutesComponent };
