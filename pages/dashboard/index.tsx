import React, { useEffect } from 'react';

import { userToken } from '../../config/siteConfigs';

import NavBarContainer from '../../containers/NavBar';
import MainInfoBlock from '../../containers/DashboardPageContainer/MainInfoBlock';
import EstimateBlock from '../../containers/DashboardPageContainer/EstimateBlock';
import PropertiesBlock from '../../containers/DashboardPageContainer/PropertiesBlock';
import FindAgentBlock from '../../containers/DashboardPageContainer/FindAgentBlock';
import FooterContainer from '../../containers/Footer';
import HeaderContainer from '../../containers/Header';
import ContactAgentModal from '../../containers/ContactAgentModal';

const DashboardPage = () => {

  /**
   * @todo Add private routes
   */
  useEffect(() => {
    if(!userToken) {
      window.location.href = '/'
    }
  },[])

  return (
    <>
      <ContactAgentModal/>
      <HeaderContainer title='Dashboard' />
      <div className='Dashboard container d-flex'>
        <NavBarContainer/>
        <div className="Dashboard__container">
          <MainInfoBlock/>
          <EstimateBlock/>
          <PropertiesBlock/>
          <FindAgentBlock/>
        </div>
      </div>
      <FooterContainer />
    </>
  )
}

export default DashboardPage;