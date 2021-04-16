import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';

import { RootState } from '../../types/state';
import { userLoginAction } from '../../actions';

import HeaderContainer from '../../containers/Header';

import ArrowLink from '../../assets/images/arrow-blue.svg';
import MailIcon from '../../assets/images/mail-icon.svg';
import LockIcon from '../../assets/images/lock-icon.svg';
import BackArrow from '../../assets/images/full-arrow.svg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector((state: RootState) => state.userInfo);
  const [data, setData] = useState({userData: '', password: ''});

  useEffect(() => {
    if (auth) {
      window.location.href = '/dashboard';
    }
  }, [auth]);

  const handleChangeData = (el: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(userLoginAction(data));
  };

  return (
    <div className='Login'>
      <HeaderContainer title='Login'/>
      <div className="bg-image">
        <h4>Log in</h4>
      </div>
      <p className='desc'>
        If you don’t have an account yet
        <Link href={ '#' }>
          <span className='link'> you can create it here <img src={ ArrowLink } alt="ArrowLink"/></span>
        </Link>
      </p>
      <Form>
        <Form.Group controlId="email-or-phone">
          <Form.Label>Email or Phone number</Form.Label>
          <img src={ MailIcon } alt="MailIcon"/>
          <Form.Control onChange={ handleChangeData } name='userData' type="text" placeholder="Enter your email"/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <img src={ LockIcon } alt="LockIcon"/>
          <Form.Control onChange={ handleChangeData } name='password' type="password"
                        placeholder="Enter your password"/>
        </Form.Group>
        <Link href={ '/remind-password' }>
          <span className="link">Remind password</span>
        </Link>
        <div className="group-btn">
          <Button onClick={ handleLogin }>
            Login
          </Button>
          <Link href='/'>
            <span><img src={ BackArrow } alt="BackArrow"/>Back</span>
          </Link>
        </div>
      </Form>
      <div className="short-footer d-flex justify-content-between">
        <p>
          <span>Immo Belgium </span>
          <span>{ new Date().getFullYear() }. All Rights Reserved.</span>
        </p>
        <span className="link">Politique de Confidentialité.</span>
      </div>
    </div>
  );
};

export default LoginPage;