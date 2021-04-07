import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import {isMobile} from 'react-device-detect';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';
import LoginArrow from '../../assets/images/arrow.svg';
import ProIcon from '../../assets/images/pro-workspace.svg';

import { NavDropdown, Image, Button } from 'react-bootstrap';

import { RootState } from '../../types/state';
import navBarList from '../../config/navBarList';


const HeaderContainer = ({title}: { title: string }) => {
  const {mainBlocks, stepBlock} = useSelector((state: RootState) => state.stepsInfo);
  const {auth} = useSelector((state: RootState) => state.userInfo);

  const stepInfo = () => {
    if (stepBlock.step === 0) {
      return 'Step 2: Confirm address';
    }
    if (stepBlock.step === 1) {
      return 'Step 3: Property type';
    }
    if (stepBlock.step === 2) {
      return 'Step 4: Property details';
    }
    return '';
  };

  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className='Header d-flex justify-content-between align-items-center'>
        <Image className='logo' src={ Logo } alt='Logo'/>
        {
          auth ?
            <div className="right-block d-flex align-items-center">
              <Image className='user-avatar' src={ NoPhoto } roundedCircle/>
              <NavDropdown title={ isMobile ? '' : 'Anna Johns' } id="header-dropdown">
                <NavDropdown.Item className='pro-workspace'>
                  <img src={ ProIcon } alt="ProIcon"/>
                  Go to my pro workspace
                </NavDropdown.Item>
                {
                  navBarList.map((list, index) => (
                    <NavDropdown.Item href={ list.href } key={ index }>
                      <img src={ list.img } alt={ list.title }/>
                      { list.title }
                    </NavDropdown.Item>
                  ))
                }
              </NavDropdown>
              <Button className='add-property'><img src={ AddIcon } alt="AddIcon"/><span>Add a property</span></Button>
            </div>
            :
            !mainBlocks
              ? <span className='sign-in-btn'>Sign in <img src={ LoginArrow } alt="LoginArrow"/></span>
              : <div className='step-info'>{ stepInfo() }</div>
        }

      </div>
    </>
  );
};

export default HeaderContainer;