import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['main-page']),
  }
})

export default MainPage;