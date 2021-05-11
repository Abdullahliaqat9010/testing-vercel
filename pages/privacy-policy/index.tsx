import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <HeaderContainer title='Our privacy policy' />
      PrivacyPolicyPage
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, []),
  },
});

export default PrivacyPolicyPage;