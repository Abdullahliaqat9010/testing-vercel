import React from 'react';
import MainPageComponent from './main';
import HeaderContainer from '../containers/Header';

const MainPage = () => {
  return (
    <>
      <HeaderContainer title='Evaluate your home' />
      <MainPageComponent/>
    </>
  )
}

export default MainPage;