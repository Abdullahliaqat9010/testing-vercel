import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userToken } from '../../config/siteConfigs';

import NavBarContainer from '../../containers/NavBar';
import MainInfoBlock from '../../containers/DashboardPageContainer/MainInfoBlock';
import EstimateBlock from '../../containers/DashboardPageContainer/EstimateBlock';
import PropertiesBlock from '../../containers/DashboardPageContainer/PropertiesBlock';
import FindAgentBlock from '../../containers/DashboardPageContainer/FindAgentBlock';
import FooterContainer from '../../containers/Footer';
import HeaderContainer from '../../containers/Header';
import ContactAgentModal from '../../containers/ContactAgentModal';

import { getPropertyForCurrentUserAction } from '../../actions';
import { parseJwt } from '../../utils';

const DashboardPage = () => {
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
      dispatch(getPropertyForCurrentUserAction(parseData.id));
    }
  }, []);

  return (
    <>
      <ContactAgentModal/>
      <HeaderContainer title='Dashboard'/>
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

export default DashboardPage;