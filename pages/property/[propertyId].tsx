import React from 'react';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';

import ContactAgencyBlock from '../../components/ContactAgencyBlock';
import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';

import ArrowImage from '../../assets/images/arrow-blue.svg';
import squareIcon from '../../assets/images/square-gray.svg';
import bedsIcon from '../../assets/images/beds-gray.svg';
import bathIcon from '../../assets/images/bath-gray.svg';

import FirstImage from '../../assets/images/template/first-image.png';
import SecondImage from '../../assets/images/template/second-image.png';
import ThirdImage from '../../assets/images/template/third-image.png';
import Map from '../../assets/images/template/map-img.png';



const PropertyPage = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const {propertyId} = router.query;
  console.log(propertyId);

  return (
    <>
      <HeaderContainer title='Agency Info'/>
      <div className='PropertyPage container'>
        <Link href={ '/dashboard' }>
          <span className='PropertyPage__back'>
            <img src={ ArrowImage } alt="ArrowImage"/> Back to dashboard
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
              <div className="property-content__info">
                <p className="address">
                  2464 Royal Ln. Mesa, New Jersey 45463
                </p>
                <div className='d-flex w-100 align-items-center'>
                  <Button variant="outline-primary">
                    Request price
                    <img src={ ArrowImage } alt="ArrowImage"/>
                  </Button>
                  <div className="info d-flex">
                    <div className="square">
                      <img src={ squareIcon } alt="squareIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">Square</span>
                        <span className="info__desc">100m²</span>
                      </div>
                    </div>
                    <div className="beds">
                      <img src={ bedsIcon } alt="bedsIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">Beds</span>
                        <span className="info__desc">3</span>
                      </div>
                    </div>
                    <div className="baths">
                      <img src={ bathIcon } alt="bathIcon"/>
                      <div className='d-flex flex-column'>
                        <span className="info__title">Baths</span>
                        <span className="info__desc">2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="property-content__map">
                <img src={ Map } alt="Map"/>
              </div>
            </div>
            {/*<div className="agency-block">*/}

            {/*</div>*/}
          </div>
          {
            !isMobile && <ContactAgencyBlock agencyInfo={{id: 99, title: ''}}/>
          }
        </div>
      </div>
      <FooterContainer/>
    </>
  )
}

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

export default PropertyPage;