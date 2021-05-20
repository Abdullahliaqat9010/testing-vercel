import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { isMobile } from 'react-device-detect';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';
import LoginArrow from '../../assets/images/arrow.svg';
import LogoutIcon from '../../assets/images/nav-bar/logout.svg';
import CheckedIcon from '../../assets/images/valid-blue.svg';
// import ProIcon from '../../assets/images/pro-workspace.svg';
import CurrentStepIcon from '../../assets/images/header-step-current.svg';
import SuccessStepIcon from '../../assets/images/header-step-success.svg';

//preload main page images
import FirstSlide from '../../assets/images/main-page/slider/first-slide.webp';
import FirstSlideMobile from '../../assets/images/main-page/slider/first-slide-mobile.webp';
import SecondSlide from '../../assets/images/main-page/slider/second-slide.webp';
import SecondSlideMobile from '../../assets/images/main-page/slider/second-slide-mobile.webp';
import ThirdSlide from '../../assets/images/main-page/slider/third-slide.webp';
import ThirdSlideMobile from '../../assets/images/main-page/slider/third-slide-mobile.webp';

import FirstImage from '../../assets/images/main-page/info-block/first-image.webp';
import FirstImageMobile from '../../assets/images/main-page/info-block/first-mobile.webp';
import SecondImage from '../../assets/images/main-page/info-block/second-image.webp';
import SecondImageMobile from '../../assets/images/main-page/info-block/second-mobile.webp';
import ThirdImage from '../../assets/images/main-page/info-block/third-image.webp';
import ThirdImageMobile from '../../assets/images/main-page/info-block/third-mobile.webp';
import FourthImage from '../../assets/images/main-page/info-block/fourth-image.webp';
import FifthImage from '../../assets/images/main-page/info-block/fifth-image.webp';
import MapImage from '../../assets/images/main-page/info-block/user-map.webp';
import MapImageMobile from '../../assets/images/main-page/info-block/user-map-mobile.webp';

import { NavDropdown, Image, Button } from 'react-bootstrap';

import { RootState } from '../../types/state';
import navBarList from '../../config/navBarList';

const langList = [
  {
    id: 'en',
    tag: 'eng',
    label: 'english',
  },
  {
    id: 'fr',
    tag: 'fr',
    label: 'france',
  },
];

const HeaderContainer = ({title, mainPage}: { title: string, mainPage?: boolean }) => {
  const router = useRouter();

  const {locale} = router;
  const {t} = useTranslation('header');
  const {mainBlocks, stepBlock} = useSelector((state: RootState) => state.stepsInfo);
  const {auth, userName, userSurname} = useSelector((state: RootState) => state.userInfo);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openLangList, setOpenLangList] = useState<boolean>(false);

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
    window.location.href = '/' + locale;
  };

  const Logout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  };

  const openSwitcherBlock = () => {
    setOpenLangList(!openLangList);
  };

  const selectLang = (lang: string) => {
    router.push(router.pathname, lang + router.pathname, {locale: lang});
  };

  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href={ '/favicon.ico' }/>
        <link rel="apple-touch-icon" sizes="180x180" href={ '/apple-touch-icon.png' }/>
        <link rel="icon" type="image/png" sizes="32x32" href={ '/favicon-32x32.png' }/>
        <link rel="icon" type="image/png" sizes="16x16" href={ '/favicon-16x16.png' }/>
        <link rel="manifest" href={ '/site.webmanifest' }/>
        <link rel="mask-icon" href={ '/safari-pinned-tab.svg' } color="#3871ef"/>
        {
          mainPage &&
          <>
            {
              isMobile ?
                <>
                  <link rel='preload' as="image" href={ FirstSlideMobile }/>
                  <link rel='preload' as="image" href={ SecondSlideMobile }/>
                  <link rel='preload' as="image" href={ ThirdSlideMobile }/>
                  <link rel='preload' as="image" href={ FirstImageMobile }/>
                  <link rel='preload' as="image" href={ SecondImageMobile }/>
                  <link rel='preload' as="image" href={ ThirdImageMobile }/>
                  <link rel='preload' as="image" href={ MapImageMobile }/>
                </> :
                <>
                  <link rel='preload' as="image" href={ FirstSlide }/>
                  <link rel='preload' as="image" href={ SecondSlide }/>
                  <link rel='preload' as="image" href={ ThirdSlide }/>
                  <link rel='preload' as="image" href={ FirstImage }/>
                  <link rel='preload' as="image" href={ SecondImage }/>
                  <link rel='preload' as="image" href={ ThirdImage }/>
                  <link rel='preload' as="image" href={ FourthImage }/>
                  <link rel='preload' as="image" href={ FifthImage }/>
                  <link rel='preload' as="image" href={ MapImage }/>
                </>
            }
          </>
        }
        <meta name="robots" content="noindex, nofollow"/>
        <meta name="apple-mobile-web-app-title" content="BelgiumImmo"/>
        <meta name="application-name" content="BelgiumImmo"/>
        <meta name="msapplication-TileColor" content="#3871ef"/>
        <meta name="theme-color" content="#3871ef"/>
        <script id="Cookiebot" src={ 'https://consent.cookiebot.com/uc.js' }
                data-cbid="26e5718e-f774-4fb6-bf24-3522ca807a53"
                data-blockingmode="auto"
                type="text/javascript"
        />
        <script
          data-cookieconsent='ignore'
          dangerouslySetInnerHTML={ {
            __html: `window.dataLayer = window.dataLayer || [];
                                            function gtag() {
                                                dataLayer.push(arguments)
                                            }
                                            gtag("consent", "default", {
                                                ad_storage: "denied",
                                                analytics_storage: "denied",
                                                wait_for_update: 500,
                                            });
                                            gtag("set", "ads_data_redaction", true);`,
          } }
        />
      </Head>
      <div className='Header d-flex justify-content-between align-items-center'>
        <Image onClick={ () => goToMainPage() } className={ `logo ${ auth ? 'ml-67' : '' }` } src={ Logo } alt='Logo'/>
        {
          mainBlocks && stepBlock.step <= 3 &&
          <div className='step-info'>
            <div className={ `header-step-one ${ stepBlock.step === 0 ? 'active-step' : '' }` }>
              <div className={ `image-block ${ stepBlock.step !== 0 ? 'success' : '' }` }>
                <img src={ stepBlock.step !== 0 ? SuccessStepIcon : CurrentStepIcon } alt="steps-icon"/>
              </div>
              { t('span.step') } 1
            </div>
            <div className={ `header-step-two ${ stepBlock.step === 1 ? 'active-step' : '' }` }>
              <div className={ `image-block ${ stepBlock.step > 1 ? 'success' : '' }` }>
                {
                  stepBlock.step >= 1 &&
                  <img src={ stepBlock.step > 1 ? SuccessStepIcon : CurrentStepIcon } alt="steps-icon"/>
                }
              </div>
              { t('span.step') } 2
            </div>
            <div className={ `header-step-three ${ stepBlock.step > 1 ? 'active-step' : '' }` }>
              <div className="image-block">
                {
                  stepBlock.step >= 2 &&
                  <img src={ CurrentStepIcon } alt="steps-icon"/>
                }
              </div>
              { t('span.step') } 3
            </div>
          </div>
        }
        <div className='d-flex align-items-center'>
          {
            auth ?
              <div className="right-block d-flex align-items-center">
                {
                  !mainBlocks &&
                  <>
                    {
                      !openMenu && <Image className='user-avatar' src={ NoPhoto } roundedCircle/>
                    }
                    <NavDropdown title={ isMobile ? '' : userName + ' ' + userSurname } id="header-dropdown"
                                 onClick={ isActive }>
                      {/*<NavDropdown.Item className='pro-workspace'>*/ }
                      {/*  <img src={ ProIcon } alt="ProIcon"/>*/ }
                      {/*  {t('li.pro-workspace')}*/ }
                      {/*</NavDropdown.Item>*/ }
                      {
                        isMobile &&
                        <Button onClick={ goToMainPage } className='add-property-mobile'>
                          <img src={ AddIcon } alt="AddIcon"/><span>{ t('button.add-property') }</span>
                        </Button>
                      }
                      {
                        navBarList.map((list, index) => (
                          <NavDropdown.Item href={ '/' + locale + list.href } key={ index }>
                            <img src={ list.img } alt={ list.title }/>
                            { t(`nav-li.${ list.id }`) }
                          </NavDropdown.Item>
                        ))
                      }
                      <NavDropdown.Item onClick={ Logout }>
                        <img className='logout-image' src={ LogoutIcon } alt='logout'/>
                        Logout
                      </NavDropdown.Item>
                      {
                        isMobile &&
                        <div className="mobile-block">
                          <Image className='user-avatar' src={ NoPhoto } roundedCircle/>
                          <span className="user-name">{ userName + ' ' + userSurname }</span>
                          {/*<span className="pro">PRO</span>*/ }
                          <div className="mobile-lang-list">
                            {
                              langList.map((lang, index) =>
                                <span
                                  className={ lang.id === locale ? 'active' : '' }
                                  key={ index }
                                  onClick={ () => selectLang(lang.id) }
                                >
                                    { lang.label }
                                  </span>,
                              )
                            }
                          </div>
                        </div>
                      }
                    </NavDropdown>
                    {
                      !isMobile &&
                      <div className={ `switcher-lang position-relative ${ openLangList ? 'active-locale' : '' }` }>
                        <span onClick={ openSwitcherBlock }>{ locale }</span>
                        {
                          openLangList &&
                          <div className="lang-list">
                            {
                              langList.map((lang, index) =>
                                  <span
                                    className={ lang.id === locale ? 'active' : '' }
                                    key={ index }
                                    onClick={ () => selectLang(lang.id) }
                                  >
                              { lang.tag }{ lang.id === locale && <img src={ CheckedIcon } alt="CheckedIcon"/> }
                            </span>,
                              )
                            }
                          </div>
                        }
                      </div>
                    }
                    {
                      !openMenu &&
                      <Button className='add-property' onClick={ goToMainPage }>
                        <img src={ AddIcon } alt="AddIcon"/><span>{ t('button.add-property') }</span>
                      </Button>
                    }
                  </>
                }
              </div>
              :
              <Link href={ '/login' } locale={ locale }>
              <span className='sign-in-btn'>
                { t('button.login') } <img src={ LoginArrow } alt="LoginArrow"/>
              </span>
              </Link>
          }
          {
            !auth &&
            <div className={ `switcher-lang position-relative ${ openLangList ? 'active-locale' : '' }` }>
              <span onClick={ openSwitcherBlock }>{ locale }</span>
              {
                openLangList &&
                <div className={ `lang-list ${ !auth ? 'p-right' : '' }` }>
                  {
                    langList.map((lang, index) =>
                      <span
                        className={ lang.id === locale ? 'active' : '' }
                        key={ index }
                        onClick={ () => selectLang(lang.id) }
                      >{ lang.tag }{ lang.id === locale && <img src={ CheckedIcon } alt="CheckedIcon"/> }
                      </span>,
                    )
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default HeaderContainer;