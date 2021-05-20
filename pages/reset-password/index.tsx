import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Alert, Button, Form } from 'react-bootstrap';
import Link from 'next/link';

import HeaderContainer from '../../containers/Header';

import ArrowLink from '../../assets/images/arrow-blue.svg';
import LockIcon from '../../assets/images/lock-icon.svg';
import BackArrow from '../../assets/images/full-arrow.svg';

import { closeChangePasswordModalAction, sendDataForUpdatePasswordAction } from '../../actions';
import { RootState } from '../../types/state';

const ResetPasswordPage = () => {
  const {t} = useTranslation('login-page');

  const dispatch = useDispatch();
  const router = useRouter();
  const {locale} = router;
  const {token} = router.query;
  const { changePasswordModal, error  } = useSelector((state: RootState) => state.modals);
  const [userData, setUserData] = useState({password: '', confirmPassword: ''});
  const [errorsData, setErrorsData] = useState({
    noValid: false,
    password: 'this field is required',
    confirmPassword: 'this field is required',
  });

  const handleChangeData = (el: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [el.target.name]: el.target.value.trim(),
    });
  };

  const closeModal = () => {
    dispatch(closeChangePasswordModalAction());
    router.push('/login');
  }

  const handleSendData = (event) => {
    event.preventDefault();
    if (userData.password.length === 0 || userData.confirmPassword.length === 0) {
      return setErrorsData({
        noValid: true,
        password: 'this field is required',
        confirmPassword: 'this field is required',
      });
    }

    if (userData.password.length < 5 || userData.confirmPassword.length < 5) {
      return setErrorsData({
        noValid: true,
        password: userData.password.length < 5 ? 'password should be more then 5 symbols' : '',
        confirmPassword: userData.confirmPassword.length < 5 ? 'password should be more then 5 symbols' : '',
      });
    }

    if (userData.password !== userData.confirmPassword) {
      return setErrorsData({
        ...errorsData,
        noValid: true,
        confirmPassword: 'Passwords dont match',
      });
    } else {
      setErrorsData({
        noValid: false,
        confirmPassword: '',
        password: '',
      });
      const {password} = userData;

      if (token) {
        dispatch(sendDataForUpdatePasswordAction(password, token));
      }
    }
  };

  return (
    <div className='ResetPassword'>
      <Alert className='custom-alert' show={changePasswordModal} variant={ error.length ? 'danger' : 'success' }>
        <Alert.Heading>
          {
            error.length ? 'Oh snap! You got an error!' : "Congratulations!"
          }
        </Alert.Heading>
        <p>
          {
            error.length ? error : "Your password has been changed, please use it to log in"
          }
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={closeModal} variant={ error.length ? 'outline-danger' : 'outline-success' }>
            Close me!
          </Button>
        </div>
      </Alert>
      <HeaderContainer title="Reset your password"/>
      <div className="bg-image">
        <h4>Reset password</h4>
      </div>
      <p className='desc'>
        If you know your password please
        <Link href={ '/login' } locale={ locale }>
          <span className='link'> go back to login <img src={ ArrowLink } alt="ArrowLink"/></span>
        </Link>
      </p>
      <Form validated={ errorsData.noValid }>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <img src={ LockIcon } alt="LockIcon"/>
          <Form.Control
            name="password"
            required
            minLength={ 5 }
            type="password"
            onChange={ handleChangeData }
          />
          <Form.Control.Feedback type="invalid">
            { errorsData.password }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <img src={ LockIcon } alt="LockIcon"/>
          <Form.Control
            name="confirmPassword"
            required
            minLength={ 5 }
            isInvalid={ errorsData.confirmPassword === 'Passwords dont match' }
            type="password"
            onChange={ handleChangeData }
          />
          <Form.Control.Feedback type="invalid">
            { errorsData.confirmPassword }
          </Form.Control.Feedback>
        </Form.Group>
        <div className="group-btn">
          <Button type='submit' className='send-reminder' onClick={ handleSendData }>
            Change Password
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

export default ResetPasswordPage;