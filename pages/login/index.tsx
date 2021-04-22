import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { RootState } from '../../types/state';
import { userLoginAction } from '../../actions';

import HeaderContainer from '../../containers/Header';

import ArrowLink from '../../assets/images/arrow-blue.svg';
import MailIcon from '../../assets/images/mail-icon.svg';
import LockIcon from '../../assets/images/lock-icon.svg';
import BackArrow from '../../assets/images/full-arrow.svg';

const LoginPage = () => {
  const {t} = useTranslation('login-page');
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
      <HeaderContainer title={ t('title') }/>
      <div className="bg-image">
        <h4>{ t('title.login') }</h4>
      </div>
      <p className='desc'>
        { t('desc.dont-have-account') }
        <Link href={ '#' }>
          <span className='link'> { t('desc.create-here-link') } <img src={ ArrowLink } alt="ArrowLink"/></span>
        </Link>
      </p>
      <Form>
        <Form.Group controlId="email-or-phone">
          <Form.Label>{ t('label.email-phone') }</Form.Label>
          <img src={ MailIcon } alt="MailIcon"/>
          <Form.Control onChange={ handleChangeData } name='userData' type="text"
                        placeholder={ t('placeholder.email-phone') }/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>{ t('label.password') }</Form.Label>
          <img src={ LockIcon } alt="LockIcon"/>
          <Form.Control onChange={ handleChangeData } name='password' type="password"
                        placeholder={ t('placeholder.password') }/>
        </Form.Group>
        <Link href={ '/remind-password' }>
          <span className="link">{ t('link.remind-password') }</span>
        </Link>
        <div className="group-btn">
          <Button onClick={ handleLogin }>
            { t('button.login') }
          </Button>
          <Link href='/'>
            <span><img src={ BackArrow } alt="BackArrow"/>{ t('button.back') }</span>
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

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['login-page', 'header']),
  },
});

export default LoginPage;