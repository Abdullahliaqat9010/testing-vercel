import React from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';
import { Button } from 'react-bootstrap';

const ErrorPage = () => {
  const router = useRouter();

  const {locale} = router;

  const goToDashboard = () => {
    router.push('/dashboard', '/dashboard', {locale});
  };

  return (
    <div className='ErrorPage'>
      <HeaderContainer title='404 Something went wrong'/>
      <div className="ErrorPage__main-component">
        <div className="image-bg"/>
        <h1>This page does’t seem to exist…</h1>
        <p>Please check if the URL is correct</p>
        <Button onClick={ goToDashboard }>Dashboard</Button>
      </div>
      <FooterContainer/>
    </div>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, []),
  },
});

export default ErrorPage;