import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.scss';
import '../styles/header.scss';
import '../styles/footer.scss';
import '../styles/navbar.scss';
import '../styles/property-block.scss';
import '../styles/agency-block.scss';
import '../styles/contact-agent-modal.scss';
import '../styles/pages/main.scss';
import '../styles/pages/dashboard.scss';
import '../styles/pages/agency.scss';
import '../styles/pages/login.scss';

const MyApp = ({ Component, pageProps }) => {
  return(
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Component { ...pageProps } />
      </PersistGate>
    </Provider>
  )
}

export default MyApp;
