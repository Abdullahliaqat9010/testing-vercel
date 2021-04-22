import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { isMobile } from 'react-device-detect';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';
import LoginArrow from '../../assets/images/arrow.svg';
// import ProIcon from '../../assets/images/pro-workspace.svg';
import CurrentStepIcon from '../../assets/images/header-step-current.svg';
import SuccessStepIcon from '../../assets/images/header-step-success.svg';

import { NavDropdown, Image, Button } from 'react-bootstrap';

import { RootState } from '../../types/state';
import navBarList from '../../config/navBarList';

const HeaderContainer = ({title}: { title: string }) => {
  const { t } = useTranslation('header');
  const {mainBlocks, stepBlock} = useSelector((state: RootState) => state.stepsInfo);
  const {auth, userName, userSurname} = useSelector((state: RootState) => state.userInfo);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const isActive = () => {
    if (isMobile) {
      /**
       * makes no scroll body
       */
      if (!openMenu) {
        document.body.className += 'modal-open';
      } else {
        document.body.classList.remove('modal-open');
      }
      setOpenMenu(!openMenu);
    }
  };

  const goToMainPage = () => {
    window.location.href = '/';
  }

  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href={ '/favicon.ico' }/>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className='Header d-flex justify-content-between align-items-center'>
        <Image className={ `logo ${auth ? 'ml-67' : ''}` } src={ Logo } alt='Logo'/>
        {
          mainBlocks && stepBlock.step <= 3 &&
          <div className='step-info'>
            <div className={ `header-step-one ${ stepBlock.step === 0 ? 'active-step' : '' }` }>
              <div className={ `image-block ${ stepBlock.step !== 0 ? 'success' : '' }` }>
                <img src={ stepBlock.step !== 0 ? SuccessStepIcon : CurrentStepIcon } alt="steps-icon"/>
              </div>
              {t('span.step')} 1
            </div>
            <div className={ `header-step-two ${ stepBlock.step === 1 ? 'active-step' : '' }` }>
              <div className={ `image-block ${ stepBlock.step > 1 ? 'success' : '' }` }>
                {
                  stepBlock.step >= 1 &&
                  <img src={ stepBlock.step >1 ? SuccessStepIcon : CurrentStepIcon } alt="steps-icon"/>
                }
              </div>
              {t('span.step')} 2
            </div>
            <div className={ `header-step-three ${ stepBlock.step > 1 ? 'active-step' : '' }` }>
              <div className="image-block">
                {
                  stepBlock.step >= 2 &&
                  <img src={ CurrentStepIcon } alt="steps-icon"/>
                }
              </div>
              {t('span.step')} 3
            </div>
          </div>
        }
        {
          auth ?
            <div className="right-block d-flex align-items-center">
              {
                !mainBlocks &&
                  <>
                    {
                      !openMenu && <Image className='user-avatar' src={ NoPhoto } roundedCircle/>
                    }
                    <NavDropdown title={ isMobile ? '' : userName + ' ' + userSurname } id="header-dropdown" onClick={ isActive }>
                      {/*<NavDropdown.Item className='pro-workspace'>*/}
                      {/*  <img src={ ProIcon } alt="ProIcon"/>*/}
                      {/*  {t('li.pro-workspace')}*/}
                      {/*</NavDropdown.Item>*/}
                      {
                        isMobile &&
                        <Button onClick={goToMainPage} className='add-property-mobile'>
                          <img src={ AddIcon } alt="AddIcon"/><span>{t('button.add-property')}</span>
                        </Button>
                      }
                      {
                        navBarList.map((list, index) => (
                          <NavDropdown.Item href={ list.href } key={ index }>
                            <img src={ list.img } alt={ list.title }/>
                            {t(`nav-li.${list.id}`)}
                          </NavDropdown.Item>
                        ))
                      }
                      {
                        isMobile &&
                        <div className="mobile-block">
                          <Image className='user-avatar' src={ NoPhoto } roundedCircle/>
                          <span className="user-name">{ userName + ' ' + userSurname }</span>
                          <span className="pro">PRO</span>
                        </div>
                      }
                    </NavDropdown>
                    {
                      !openMenu &&
                      <Button className='add-property' onClick={goToMainPage}>
                        <img src={ AddIcon } alt="AddIcon"/><span>{t('button.add-property')}</span>
                      </Button>
                    }
                  </>
              }
            </div>
            :
            <Link href={ '/login' }>
              <span className='sign-in-btn'>
                {t('button.login')} <img src={ LoginArrow } alt="LoginArrow"/>
              </span>
            </Link>
        }
      </div>
    </>
  );
};

export default HeaderContainer;