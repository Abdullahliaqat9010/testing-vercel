import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from 'react-bootstrap';

import NavBarContainer from '../../containers/NavBar';
import FooterContainer from '../../containers/Footer';
import HeaderContainer from '../../containers/Header';

import AddIcon from '../../assets/images/icon-plus.svg';
import ArrowIcon from '../../assets/images/arrow-blue.svg';
import SquareIcon from '../../assets/images/square.svg';
import BedsIcon from '../../assets/images/beds.svg';
import BathIcon from '../../assets/images/bath.svg';

import { userToken } from '../../config/siteConfigs';
import { parseJwt } from '../../utils';

import { getPropertyForCurrentUserAction } from '../../actions';
import { RootState } from '../../types/state';

const PropertiesPage = () => {
  const router = useRouter();
  const {locale} = router;
  const dispatch = useDispatch();

  const {properties} = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    if (userToken) {
      const parseData = parseJwt(userToken);
      const elementsOnPage = 6;
      dispatch(getPropertyForCurrentUserAction({userId: parseData.id, elementsOnPage}));
    }
  }, []);

  const goToMainPage = () => {
    window.location.href = '/' + locale;
  };

  return (
    <>
      <HeaderContainer title='My Properties'/>
      <div className='PropertiesPage container d-flex'>
        <NavBarContainer/>
        <div className="PropertiesPage__container w-100">
          <div className="title-block d-flex justify-content-between">
            <h1>My Properties</h1>
            <Button className='new-estimate' onClick={ goToMainPage }>
              <img src={ AddIcon } alt="AddIcon"/><span>New Estimate</span>
            </Button>
          </div>
          {
            properties.length && properties.map(
              (property, index) =>
                <div className="property" key={index}>
                  <div className="property__head">
                    <span className='address'>{ property.search_address }</span>
                    <span className="blue">View <img src={ ArrowIcon } alt="ArrowIcon"/></span>
                  </div>
                  <div className="property__body">
                    <div className="short-info">
                      <div className="square">
                        <img src={ SquareIcon } alt="SquareIcon"/>
                        <div className="info-block">
                          <span className="gray">Square</span>
                          <span>{ property.total_area }m²</span>
                        </div>
                      </div>
                      <div className="beds">
                        <img src={ BedsIcon } alt="BedsIcon"/>
                        <div className="info-block">
                          <span className="gray">Beds</span>
                          <span>{ property.bedrooms }</span>
                        </div>
                      </div>
                      <div className="baths">
                        <img src={ BathIcon } alt="BathIcon"/>
                        <div className="info-block">
                          <span className="gray">Baths</span>
                          <span>{ property.bathrooms }</span>
                        </div>
                      </div>
                    </div>
                    <div className="property-estimation">
                      <p>Property estimation</p>
                      <div className='d-flex align-items-center'>
                        <div className="minimal d-flex flex-column">
                          <span className="estimation-title">Minimal</span>
                          <span className="estimation-desc">€1,007,500</span>
                          <span className="estimation-per-metre">€1,007.500 per m²</span>
                        </div>
                        <div className="average d-flex flex-column">
                          <span className="estimation-title">Average</span>
                          <span className="estimation-desc">€1,097,500</span>
                          <span className="estimation-per-metre">€1,097.500 per m²</span>
                        </div>
                        <div className="maximal d-flex flex-column">
                          <span className="estimation-title">Maximal</span>
                          <span className="estimation-desc">€1,197,500</span>
                          <span className="estimation-per-metre">€1,197.500 per m²</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )
          }
        </div>
      </div>
      <FooterContainer/>
    </>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'common']),
  },
});

export default PropertiesPage;