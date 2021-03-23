import React from 'react';

import NavBarContainer from '../../containers/NavBar';

import './index.scss';

const DashboardPage = () => {
  return (
    <div className='Dashboard container d-flex'>
      <NavBarContainer />
      <h4>Dashboard Page</h4>
    </div>
  );
};

export default DashboardPage;