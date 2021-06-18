import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';
import NavBarContainer from '../../containers/NavBar';

import NoPhoto from '../../assets/images/no-avatar.png';
import ArrowIcon from '../../assets/images/arrow-blue.svg';
import LockIcon from '../../assets/images/lock-icon-blue.svg';
import AccountImage from '../../assets/images/account-image.png';

const SettingsPage = () => {
  const [validated, setValidated] = useState(false);

  return (
    <>
      <HeaderContainer title='Account Settings'/>
      <div className='SettingsPage container'>
        <NavBarContainer/>
        <div className="SettingsPage__container w-100">
          <div className="first-block">
            <h1>Profile details</h1>
            <Form noValidate validated={ validated }>
              <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  name='firstName'
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  name='lastName'
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name='email'
                  type="email"
                />
                <Form.Control.Feedback type="invalid">
                  required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  required
                  name='phone'
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='d-flex flex-column mb-0'>
                <Form.Label>Gender</Form.Label>
                <ButtonGroup className="custom-button-group">
                  <Button>Male</Button>
                  <Button>Female</Button>
                  <Button>Other</Button>
                </ButtonGroup>
              </Form.Group>
              <div className="password-block">
                <h2>Password</h2>
                <p>We strongly recommend to use strong password, with at least one symbol and digit.</p>
                <Form.Group className='mb-0' controlId="password">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    required
                    name='password'
                    type="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    required
                  </Form.Control.Feedback>
                </Form.Group>
                <span className="change-pass"><img src={ LockIcon } alt="LockIcon"/>Change password</span>
              </div>
              <div className="notification-block">
                <h3>Notifications</h3>
                <p>Please check if you like to be notified about system updates, new estimations.</p>
                <Form.Group className='mb-0' >
                  <Form.Check
                    type="checkbox"
                    label='I allow Immo Belgium to send me updates about my market.'
                  />
                </Form.Group>
                <Button className='save'>Save changes</Button>
              </div>
            </Form>
          </div>
          <div className="second-block">
            <div className="top-block d-flex">
              <img src={ AccountImage } alt="AccountImage"/>
              <div className="account-info d-flex flex-column">
                <span className="title">Pro Account</span>
                <span className="desc">Are you interested in becoming a PRO user?</span>
              </div>
            </div>
            <Button className='become-pro'>Become PRO</Button>
          </div>
        </div>
        <div className="user-info-block">
          <div className="user-avatar">
            <img src={ NoPhoto } alt="NoPhoto"/>
            <span className="upload-btn">Upload photo</span>
          </div>
          <div className="user-short-info">
            <span className="fullname">Anna Johns</span>
            <span className="status">Professional</span>
          </div>
          <span className="logout">Log out <img src={ ArrowIcon } alt="ArrowIcon"/></span>
        </div>
      </div>
      <FooterContainer/>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header', 'common']),
  },
});

export default SettingsPage;