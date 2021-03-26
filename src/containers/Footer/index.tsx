import React from 'react';

import LogoFooter from '../../assets/images/logo-footer.png';
import ArrowIcon from '../../assets/images/arrow-gray.svg';

import './index.scss';

const FooterContainer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer__info w-25">
          <img src={ LogoFooter } alt="LogoFooter"/>
          <span className="desc">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </span>
          <span className="copyright">
          All rights reserved © Immo Belgium { new Date().getFullYear() }
        </span>
        </div>
        <div className="footer__main">
          <div className="block-list">
            <span className="block-list__title">
              Group title
            </span>
            <div className="block-list__desc">
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
            </div>
          </div>
          <div className="block-list">
            <span className="block-list__title">
              Group title
            </span>
            <div className="block-list__desc">
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
            </div>
          </div>
          <div className="block-list">
            <span className="block-list__title">
              Group title
            </span>
            <div className="block-list__desc">
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;