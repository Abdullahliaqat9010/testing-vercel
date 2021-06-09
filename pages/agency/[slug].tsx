import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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

import { agentsList } from '../../templates/agentsList';

const AgencyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {slug} = router.query;

  const [currentAgency] = agentsList.filter(agency => agency.url === slug);

  const elementsOnPage = 3;

  useEffect(() => {
    if (!currentAgency) {
      router.push('/404');
    }
  }, []);

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
        <a href={ '/dashboard' }>
          <span className='Agency__back'>
            <img src={ ArrowImage } alt="ArrowImage"/> Back to dashboard
          </span>
        </a>
        <FirstBlock currentAgency={ currentAgency }/>
        <SecondBlock/>
        <ThirdBlock currentAgency={ currentAgency } elementsOnPage={ elementsOnPage }/>
        <FourthBlock currentAgency={ currentAgency }/>
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