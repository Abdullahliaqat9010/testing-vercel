import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TermsAndConditionsPage = () => {
  return (
    <div>
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