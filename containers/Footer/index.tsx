import React, { useState } from 'react';

import { isMobile } from 'react-device-detect';

import LogoFooter from '../../assets/images/logo-footer.png';
import ArrowIcon from '../../assets/images/arrow-gray.svg';
import CloseBlock from '../../assets/images/arrow-close-block.svg';

const FooterContainer = () => {
  const [isOpen, setCurrentOpenBlock] = useState('firstBlock');

  const showBlock = (blockId) => {
    setCurrentOpenBlock(blockId);
  };

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
          <div className={ `block-list ${isOpen === 'firstBlock' ? '' : 'closed' }` }>
            <span className="block-list__title" onClick={ () => showBlock('firstBlock') }>
              <span>Group title</span>
              {
                isMobile && <img src={ CloseBlock } alt="CloseBlock"/>
              }
            </span>
            <div className="block-list__desc block-close">
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
            </div>
          </div>
          <div className={ `block-list ${isOpen === 'secondBlock' ? '' : 'closed' }` }>
            <span className="block-list__title" onClick={ () => showBlock('secondBlock') }>
              <span>Group title</span>
              {
                isMobile && <img src={ CloseBlock } alt="CloseBlock"/>
              }
            </span>
            <div className="block-list__desc block-close">
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
              <span>Prix immobilier <img src={ ArrowIcon } alt="ArrowIcon"/></span>
            </div>
          </div>
          <div className={ `block-list ${isOpen === 'thirdBlock' ? '' : 'closed' }` }>
            <span className="block-list__title" onClick={ () => showBlock('thirdBlock') }>
              <span>Group title</span>
              {
                isMobile && <img src={ CloseBlock } alt="CloseBlock"/>
              }
            </span>
            <div className="block-list__desc block-close">
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