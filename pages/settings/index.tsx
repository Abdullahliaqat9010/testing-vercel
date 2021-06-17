import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';
import NavBarContainer from '../../containers/NavBar';

const SettingsPage = () => {
  return (
    <>
      <HeaderContainer title='Account Settings'/>
      <div className='SettingsPage container d-flex'>
        <NavBarContainer/>
        <div className="SettingsPage__container w-100">

        </div>
        <div className="user-info-block">

        </div>
      </div>
      <FooterContainer/>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'common']),
  },
});

export default SettingsPage;