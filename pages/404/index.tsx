import React from 'react';
import Link from 'next/link';
import { Jumbotron } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();

  const {locale} = router;

  return (
    <div className='ErrorPage'>
      <HeaderContainer title='404 Something went wrong'/>
      <Jumbotron>
        <h1>404</h1>
        <p>
          Sorry this page does not exist
        </p>
        <p>
          <Link href={ locale + '/' }>To home</Link>
        </p>
      </Jumbotron>
    </div>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, []),
  },
});

export default ErrorPage;