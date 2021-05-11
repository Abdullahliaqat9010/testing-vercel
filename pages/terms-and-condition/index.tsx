import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';

const TermsAndConditionsPage = () => {
  return (
    <div>
      <HeaderContainer title='Our terms and conditions' />
      TermsAndConditionsPage
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, []),
  },
});

export default TermsAndConditionsPage;