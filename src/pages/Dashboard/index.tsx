import React from 'react';

import NavBarContainer from '../../containers/NavBar';

import MainInfoBlock from './MainInfoBlock';
import EstimateBlock from './EstimateBlock';
import PropertiesBlock from './PropertiesBlock';
import FindAgentBlock from './FindAgentBlock';

import './index.scss';


const DashboardPage = () => {
  return (
    <div className='Dashboard container d-flex'>
      <NavBarContainer/>
      <div className="Dashboard__container">
        <MainInfoBlock/>
        <EstimateBlock/>
        <PropertiesBlock/>
        <FindAgentBlock/>
      </div>
    </div>
  );
};

export default DashboardPage;