import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';
import LoginArrow from '../../assets/images/arrow.svg';

import { NavDropdown, Image, Button } from 'react-bootstrap';

import { RootState } from '../../types/state';

const HeaderContainer = ({title}: { title: string }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const {mainBlocks, stepBlock} = useSelector((state: RootState) => state.stepsInfo);

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
        <Image src={ Logo } alt='Logo'/>
        {
          auth ?
            <div className="right-block d-flex align-items-center">
              <Image src={ NoPhoto } roundedCircle/>
              <NavDropdown title="Anna Johns" id="header-dropdown">
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
              <Button className='add-property'><img src={ AddIcon } alt="AddIcon"/>Add a property</Button>
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