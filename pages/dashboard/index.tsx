import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { userToken } from '../../config/siteConfigs';

import NavBarContainer from '../../containers/NavBar';
import MainInfoBlock from '../../containers/DashboardPageContainer/MainInfoBlock';
import EstimateBlock from '../../containers/DashboardPageContainer/EstimateBlock';
import PropertiesBlock from '../../containers/DashboardPageContainer/PropertiesBlock';
import FindAgentBlock from '../../containers/DashboardPageContainer/FindAgentBlock';
import FooterContainer from '../../containers/Footer';
import HeaderContainer from '../../containers/Header';
import ContactAgentModal from '../../containers/Modals/ContactAgentModal';
import VerifyEmailModal from '../../containers/Modals/VerifyEmailModal';

import { getPropertyForCurrentUserAction } from '../../actions';
import { parseJwt } from '../../utils';
import { isMobile } from 'react-device-detect';

const DashboardPage = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  /**
   * @todo Add private routes
   */
  useEffect(() => {
    if (!userToken) {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      const parseData = parseJwt(userToken);
      const elementsOnPage = isMobile ? 3 : 6;
      dispatch(getPropertyForCurrentUserAction({userId: parseData.id, elementsOnPage}));
    }
  }, []);

  return (
    <>
      <ContactAgentModal/>
      <VerifyEmailModal/>
      <HeaderContainer title={ t('title') }/>
      <div className='Dashboard container d-flex'>
        <NavBarContainer/>
        <div className="Dashboard__container">
          <MainInfoBlock/>
          <EstimateBlock/>
          <PropertiesBlock/>
          <FindAgentBlock/>
        </div>
      </div>
      <FooterContainer/>
    </>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['dashboard-page', 'header', 'common']),
  },
});

export default DashboardPage;