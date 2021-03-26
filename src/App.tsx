import React from 'react';
import { BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';

import HeaderContainer from './containers/Header';

import routes from './routes';
import PrivateRoute from './routes/privateRoute';
import FooterContainer from './containers/Footer';

const App = () => {

  /**
   * not show footer if this page not in whitelist for header
   */
  const { pathname } = useLocation();
  const isAuth = true;

  /**
   * add logic for private routes
   */
  // const [isAuth, setIsAuth] = useState<boolean>(true);

  return (
    <Router>
      <HeaderContainer />
      <Switch>
        {
          routes.map((route, index) =>
            <PrivateRoute key={ index } isAuth={isAuth} { ...route } />
          )
        }
      </Switch>
      {
        pathname !=='/' && <FooterContainer />
      }
    </Router>
  );
}

export default App;
