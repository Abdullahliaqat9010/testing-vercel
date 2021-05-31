import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';

import ArrowImage from '../../assets/images/arrow-blue.svg';

import { userToken } from '../../config/siteConfigs';
import { parseJwt } from '../../utils';
import { getPropertyForCurrentUserAction } from '../../actions';

import FirstBlock from './blocks/FirstBlock';
import SecondBlock from './blocks/SecondBlock';
import ThirdBlock from './blocks/ThirdBlock';
import FourthBlock from './blocks/FourthBlock';


const AgencyPage = () => {
  const dispatch = useDispatch();

  const elementsOnPage = 3;

  useEffect(() => {
    if (userToken) {
      const parseData = parseJwt(userToken);
      dispatch(getPropertyForCurrentUserAction({userId: parseData.id, elementsOnPage}));
    }
  }, []);

  return (
    <>
      <HeaderContainer title='Agency Info'/>
      <div className='Agency container'>
        <Link href={ '/dashboard' }>
          <span className='Agency__back'>
            <img src={ ArrowImage } alt="ArrowImage"/> Back to dashboard
          </span>
        </Link>
        <FirstBlock />
        <SecondBlock />
        <ThirdBlock elementsOnPage={elementsOnPage} />
        <FourthBlock />
      </div>
      <FooterContainer/>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'dashboard-page']),
  },
});

export default AgencyPage;