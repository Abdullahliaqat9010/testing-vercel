import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';

import GoogleMapModal from '../../containers/Modals/GoogleMapModal';
import RequestPriceModal from '../../containers/Modals/RequestPriceModal';
import ContactAgencyBlock from '../../components/ContactAgencyBlock';
import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';

import ArrowImage from '../../assets/images/arrow-blue.svg';
import squareIcon from '../../assets/images/square-gray.svg';
import bedsIcon from '../../assets/images/beds-gray.svg';
import bathIcon from '../../assets/images/bath-gray.svg';
import MailIcon from '../../assets/images/mail-white-icon.svg';

import FirstImage from '../../assets/images/template/first-image.png';
import SecondImage from '../../assets/images/template/second-image.png';
import ThirdImage from '../../assets/images/template/third-image.png';
import Map from '../../assets/images/template/map-img.png';
import Stars from '../../assets/images/template/stars.png';
import TestAgency from '../../assets/images/agents/test-agency.png';

import { userToken } from '../../config/siteConfigs';
import { clearSimilarPropertiesLocation } from '../../actions';

const PropertyPage = () => {
  const {t} = useTranslation('property-page');
  const dispatch = useDispatch();
  const router = useRouter();
  const {locale} = router;
  const {propertyId} = router.query;

  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showRequestPriceModal, setShowRequestPriceModal] = useState<boolean>(false);

  /**
   * @todo Add private routes
   */
  useEffect(() => {
    if (!userToken) {
      window.location.href = '/';
    }
  }, []);

  const handleClearSimilarPropertiesLocation = () => {
    dispatch(clearSimilarPropertiesLocation());
  }

  const handleCloseMapModal = () => setShowMapModal(false);
  const handleShowMapModal = () => {
    handleClearSimilarPropertiesLocation();
    return setShowMapModal(true);
  }

  const handleCloseRequestPriceModal = () => setShowRequestPriceModal(false);
  const handleShowRequestPriceModal = () => {
    handleClearSimilarPropertiesLocation();
    return setShowRequestPriceModal(true);
  };


  // console.log(propertyId);

  return (
    <>
      <HeaderContainer title={ t('title') }/>
      <GoogleMapModal show={ showMapModal } handleClose={ handleCloseMapModal }/>
      <RequestPriceModal show={ showRequestPriceModal } handleClose={ handleCloseRequestPriceModal }/>
      <div className='PropertyPage container'>
        <Link href={ '/dashboard' } locale={ locale }>
          <span className='PropertyPage__back'>
            <img src={ ArrowImage } alt="ArrowImage"/> { t('link.back') }
          </span>
        </Link>
        <div className="PropertyPage__main-content d-flex">
          <div className='property-info'>
            <div className="images d-flex">
              <img className='main-image' src={ FirstImage } alt="FirstImage"/>
              <div className="second-block">
                <img src={ SecondImage } alt="SecondImage"/>
                <img src={ ThirdImage } alt="ThirdImage"/>
              </div>
            </div>
            <div className="property-content d-flex">
              <div className="property-content__info w-75">
                <p className="address">
                  2464 Royal Ln. Mesa, New Jersey 45463
                </p>
                <div className='d-flex w-100 align-items-center justify-content-between'>
                  <Button onClick={ handleShowRequestPriceModal } className='request-price' variant="outline-primary">
                    { t('button.request-price') }
                    <img src={ ArrowImage } alt="ArrowImage"/>
                  </Button>
                  <div className="info d-flex">
                    <div className="square">
                      <img src={ squareIcon } alt="squareIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">{ t('span.square') }</span>
                        <span className="info__desc">100m²</span>
                      </div>
                    </div>
                    <div className="beds">
                      <img src={ bedsIcon } alt="bedsIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">{ t('span.beds') }</span>
                        <span className="info__desc">3</span>
                      </div>
                    </div>
                    <div className="baths">
                      <img src={ bathIcon } alt="bathIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">{ t('span.baths') }</span>
                        <span className="info__desc">2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="property-content__map">
                <img onClick={ handleShowMapModal } src={ Map } alt="Map"/>
              </div>
            </div>
            <div className="agency-block">
              <p className="sold-by">
                { t('p.sold-by') }
              </p>
              <div className="agency-block__short-info">
                <div className="logo">
                  <img src={ TestAgency } alt="TestAgency"/>
                </div>
                <div className='d-flex justify-content-between agency-block__blocks'>
                  <div className="left-block w-50">
                    <p className="agency-name">
                      Century 21 - PATRIMOINE 24
                    </p>
                    <div className="agency-stats">
                      <span className="rate">5.0</span>
                      <div className="stars-block">
                        <img src={ Stars } alt="Stars"/>
                      </div>
                      <span className="from">{ t('span.from') } 120 { t('span.reviews') }</span>
                    </div>
                  </div>
                  <div className="right-block w-50">
                    <span className='count'>17</span>
                    <span className="similar">{ t('span.similar') }</span>
                  </div>
                </div>
              </div>
            </div>
            {
              isMobile &&
              <Button className='contact-agency-btn'>
                <img src={ MailIcon } alt="MailIcon"/>Contact this agency
              </Button>
            }
          </div>
          {
            !isMobile && <ContactAgencyBlock agencyInfo={ {id: 99, title: ''} }/>
          }
        </div>
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
    ...await serverSideTranslations(locale, ['header', 'dashboard-page', 'property-page', 'common']),
  },
});

export default PropertyPage;