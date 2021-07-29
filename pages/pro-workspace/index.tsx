import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import ProWorkspaceSteps from './ProWorkspaceSteps';

const ProWorkspacePage = () => {
  return (
    <div className='ProWorkspacePage'>
      <HeaderContainer title='Create professional account'/>
      <ProWorkspaceSteps />
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'common']),
  },
});

export default ProWorkspacePage;