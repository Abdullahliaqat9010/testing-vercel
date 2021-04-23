import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import MainPageComponent from './main';
import HeaderContainer from '../containers/Header';

const MainPage = () => {
  const { t } = useTranslation('header');
  return (
    <>
      <HeaderContainer title={t('title')} />
      <MainPageComponent/>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['main-page', 'header', 'steps']),
  }
})

export default MainPage;