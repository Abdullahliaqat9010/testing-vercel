import React from 'react';

import Logo from '../../assets/images/logo.png';
import NoPhoto from '../../assets/images/no-photo.png';
import AddIcon from '../../assets/images/icon-plus.svg';

import './index.scss';
import { NavDropdown, Image, Button } from 'react-bootstrap';

const HeaderContainer = () => {
  return (
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
  );
};

export default HeaderContainer;