import React from 'react';
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

import FirstImage from '../../../assets/images/main-page/info-block/first-image.png';
import FirstImageMobile from '../../../assets/images/main-page/info-block/first-mobile.png';
import SecondImage from '../../../assets/images/main-page/info-block/second-image.png';
import SecondImageMobile from '../../../assets/images/main-page/info-block/second-mobile.png';
import ThirdImage from '../../../assets/images/main-page/info-block/third-image.png';
import ThirdImageMobile from '../../../assets/images/main-page/info-block/third-mobile.png';
import FourthImage from '../../../assets/images/main-page/info-block/fourth-image.png';
import FifthImage from '../../../assets/images/main-page/info-block/fifth-image.png';
import MapImage from '../../../assets/images/main-page/info-block/user-map.png';
import MapImageMobile from '../../../assets/images/main-page/info-block/user-map-mobile.png';
import LogoGray from '../../../assets/images/main-page/info-block/logo.svg';

const InfoBlock = () => {
  const { t } = useTranslation('main-page');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='info-block container'>
      <div className="info-block__top d-flex justify-content-between">
        <div className="left-block">
          <h4>{t('title.top-block')}</h4>
          <p>
            {t('desc.top-block')}
          </p>
          <Button className='get-estimation' onClick={scrollToTop}>
            {t('button.get-free-estimation')}
          </Button>
        </div>
        <div className="right-block">
          <div className="image-block d-flex">
            {
              isMobile
                ?
                <>
                  <img src={ FirstImageMobile } alt="FirstImageMobile"/>
                  <img className='mt-30px' src={ SecondImageMobile } alt="SecondImageMobile"/>
                  <img src={ ThirdImageMobile } alt="ThirdImageMobile"/>
                </>
                :
                <>
                  <div className="image-block__left mr-16px">
                    <img src={ FirstImage } alt="FirstImage"/>
                  </div>
                  <div className="image-block__right">
                    <div className="top">
                      <img className='mr-16px' src={ SecondImage } alt="SecondImage"/>
                      <img src={ ThirdImage } alt="ThirdImage"/>
                    </div>
                    <div className="bottom">
                      <img className='mr-16px' src={ FourthImage } alt="FourthImage"/>
                      <img src={ FifthImage } alt="FifthImage"/>
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </div>
      <div className="info-block__middle d-flex justify-content-between">
        <div className="left-block w-55">
          <img src={ isMobile ? MapImageMobile : MapImage } alt="MapImage"/>
        </div>
        <div className="right-block">
          <h4>{t('title.bottom-block')}</h4>
          <p>
            {t('desc.bottom-block')}
          </p>
          <Button className='get-estimation' onClick={scrollToTop}>
            {t('button.get-free-estimation')}
          </Button>
        </div>
      </div>
      <div className="info-block__bottom">
        <span className="gray">{t('title.mission-block')}</span>
        <p>
          {t('desc.mission-block')}
        </p>
        <img src={ LogoGray } alt="LogoGray"/>
      </div>
    </div>
  );
};

export default InfoBlock;