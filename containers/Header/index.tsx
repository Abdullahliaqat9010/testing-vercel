import React from 'react';
import Head from 'next/head';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';

import { NavDropdown, Image, Button } from 'react-bootstrap';

const HeaderContainer = ({title}: {title: string}) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='Header d-flex justify-content-between align-items-center'>
        <Image src={ Logo } alt='Logo' />
        <div className="right-block d-flex align-items-center">
          <Image src={ NoPhoto } roundedCircle />
          <NavDropdown title="Anna Johns" id="header-dropdown">
            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
          <Button className='add-property'><img src={ AddIcon } alt="AddIcon"/>Add a property</Button>
        </div>
      </div>
    </>
  );
};

export default HeaderContainer;