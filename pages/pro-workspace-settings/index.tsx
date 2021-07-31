import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';

const ProWorkspaceSettings = () => {
  return (
    <div className='ProWorkspaceSettingsPage'>
      <HeaderContainer title='Create professional account'/>
      <div className="ProWorkspaceSettingsPage__main-content">

      </div>
      <FooterContainer/>
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'common']),
  },
});

export default ProWorkspaceSettings;