import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { store, persistor } from '../store';

import TagManager from 'react-gtm-module';

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

const tagManagerArgs = {
  gtmId: 'GTM-KGQ67XP'
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const { locale } = router;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])

  return(
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Component { ...pageProps } />
      </PersistGate>
    </Provider>
  )
}

export default appWithTranslation(MyApp);
