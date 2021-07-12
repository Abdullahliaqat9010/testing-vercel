import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Modal, Spinner } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import { userToken } from '../../config/siteConfigs';

import NavBarContainer from '../../containers/NavBar';
import MainInfoBlock from '../../containers/DashboardPageContainer/MainInfoBlock';
import EstimateBlock from '../../containers/DashboardPageContainer/EstimateBlock';
import PropertiesBlock from '../../containers/DashboardPageContainer/PropertiesBlock';
import FindAgentBlock from '../../containers/DashboardPageContainer/FindAgentBlock';
import FooterContainer from '../../containers/Footer';
import HeaderContainer from '../../containers/Header';
import ContactAgentModal from '../../containers/Modals/ContactAgentModal';
import VerifyEmailModal from '../../containers/Modals/VerifyEmailModal';

import { getPropertyForCurrentUserAction } from '../../actions';
import { parseJwt } from '../../utils';
import { RootState } from '../../types/state';

const DashboardPage = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const {currentPropertyPrice} = useSelector((state: RootState) => state.userInfo);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

  /**
   * @todo Add private routes
   */
  useEffect(() => {
    if (!userToken) {
      window.location.href = '/';
    } else {
      const parseData = parseJwt(userToken);
      const elementsOnPage = isMobile ? 3 : 6;
      dispatch(getPropertyForCurrentUserAction({userId: parseData.id, elementsOnPage}));
    }
  }, []);

  useEffect(() => {
    if (currentPropertyPrice.totalValue) {
      setShowLoadingModal(true);
    } else {
      setShowLoadingModal(false);
    }
  }, [currentPropertyPrice]);

  return (
    <>
      {/*todo move to component*/ }
      <Modal
        size="lg"
        show={ !showLoadingModal }
        onHide={ () => showLoadingModal }
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Please wait contain is loading...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" variant="primary"/>
        </Modal.Body>
      </Modal>
      <ContactAgentModal/>
      <VerifyEmailModal/>
      <HeaderContainer title={ t('title') }/>
      <div className='Dashboard container d-flex'>
        <NavBarContainer/>
        <div className="Dashboard__container">
          <MainInfoBlock/>
          <EstimateBlock/>
          <PropertiesBlock/>
          <FindAgentBlock/>
        </div>
      </div>
      <FooterContainer/>
    </>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['dashboard-page', 'header', 'common']),
  },
});

export default DashboardPage;