import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';

import RemindPasswordModal from '../../containers/Modals/RemindPasswordModal';
import HeaderContainer from '../../containers/Header';

import ArrowLink from '../../assets/images/arrow-blue.svg';
import MailIcon from '../../assets/images/mail-icon.svg';
import BackArrow from '../../assets/images/full-arrow.svg';

import { remindPasswordAction } from '../../actions';

const ForgotPasswordPage = () => {
  const {t} = useTranslation('login-page');
  const [userData, setUserData] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const {locale} = router;

  const handleChangeData = (el: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(el.target.value.trim());
  };

  const handleSendData = (event) => {
    event.preventDefault();
    if (userData.length) {
      dispatch(remindPasswordAction(userData, locale));
    }
  };

  return (
    <div className='ForgotPassword'>
      <RemindPasswordModal />
      <HeaderContainer title="Remind password"/>
      <div className="bg-image">
        <h4>Remind password</h4>
      </div>
      <p className='desc'>
        If you know your password please
        <Link href={ '/login' } locale={ locale }>
          <span className='link'> go back to login <img src={ ArrowLink } alt="ArrowLink"/></span>
        </Link>
      </p>
      <Form>
        <Form.Group controlId="email-or-phone">
          <Form.Label>{ t('label.email-phone') }</Form.Label>
          <img src={ MailIcon } alt="MailIcon"/>
          <Form.Control
            type="text"
            value={ userData }
            onChange={ handleChangeData }
            placeholder={ t('placeholder.email-phone') }
          />
        </Form.Group>
        <div className="group-btn">
          <Button type='submit' className='send-reminder' onClick={ handleSendData }>
            Send a reminder
          </Button>
          <Link href='/' locale={ locale }>
            <span><img src={ BackArrow } alt="BackArrow"/>{ t('button.back') }</span>
          </Link>
        </div>
      </Form>
      <div className="short-footer d-flex justify-content-between">
        <p>
          <span>Immo Belgium </span>
          <span>{ new Date().getFullYear() }. All Rights Reserved.</span>
        </p>
        <span className="link">
          <a href={ '/' + locale + '/privacy-policy' } target='_blank'>Politique de Confidentialité.</a>
        </span>
      </div>
    </div>
  );
};

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['login-page', 'header']),
  },
});

export default ForgotPasswordPage;