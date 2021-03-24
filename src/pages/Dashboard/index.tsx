import React from 'react';

import MainInfoBlock from './MainInfoBlock';
import EstimateBlock from './EstimateBlock';
import PropertiesBlock from './PropertiesBlock';

import NavBarContainer from '../../containers/NavBar';

import './index.scss';

const DashboardPage = () => {
  return (
    <div className='Dashboard container d-flex'>
      <NavBarContainer/>
      <div className="Dashboard__container">
        <MainInfoBlock/>
        <EstimateBlock/>
        <PropertiesBlock/>
      </div>
    </div>
  );
};

export default DashboardPage;