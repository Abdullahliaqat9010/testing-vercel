import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import MainPageComponent from './main';
import HeaderContainer from '../containers/Header';
import { goToModifyPropertyAction } from '../actions';

const MainPage = () => {
  const { t } = useTranslation('header');
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.sessionStorage.getItem('modify')) {
      const propertyObjectForModify = JSON.parse(window.sessionStorage.getItem('modify'));
      const propertyId = JSON.parse(window.sessionStorage.getItem('modifyId'));
      dispatch(goToModifyPropertyAction(propertyObjectForModify, +propertyId));
      window.sessionStorage.removeItem('modify');
      window.sessionStorage.removeItem('modifyId');
    }
  },[]);

  return (
    <>
      <HeaderContainer mainPage title={t('title')} />
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