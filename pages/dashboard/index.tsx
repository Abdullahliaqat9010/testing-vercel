import React  from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DashboardPageContainer from '../../containers/DashboardPageContainer';

const DashboardPage = () => {
  return (
    <DashboardPageContainer />
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['dashboard-page', 'header', 'common']),
  },
});

export default DashboardPage;