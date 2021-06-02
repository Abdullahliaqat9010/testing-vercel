import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { Button, Form } from 'react-bootstrap';

import { contactAgencyAction } from '../../actions';
import { RootState } from '../../types/state';

const ContactAgencyBlock = ({agencyInfo}) => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const {
    userName,
    userSurname,
    userEmail,
    userPhone,
    properties,
  } = useSelector((state: RootState) => state.userInfo);

  const [data, setData] = useState({
    fullName: userName + ' ' + userSurname,
    phone: userPhone,
    email: userEmail,
    desc: t('placeholder.message'),
    selectedProperty: '',
    freeCharge: false,
  });

  const handleOnChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [el.target.name]: el.target.name === 'freeCharge' ? el.target.checked : el.target.value,
    });
  };

  const validation = () => {
    return data.fullName.length > 0
      && data.phone.length > 0
      && data.email.length > 0
      && data.selectedProperty.length > 0;
  };

  const sendToAgency = () => {
    if (validation()) {

      const findProp = properties.find(property => property.search_address === data.selectedProperty);

      const dataInfo = {
        agentId: agencyInfo.id,
        phone: data.phone,
        message: data.desc.length > 0 ? data.desc : t('placeholder.message'),
        propertyId: findProp.id,
        free_evaluated: data.freeCharge,
      };

      dispatch(contactAgencyAction(dataInfo));
    }

    setValidated(true);
  };

  return (
    <div className='contact-agency-block'>
      <div className='contact-agency'>
        <h4>Contact Agency</h4>
        <p>{ agencyInfo.title }</p>
        <Form noValidate validated={ validated }>
          <Form.Group controlId="fullName">
            <Form.Control
              required
              onChange={ handleOnChange }
              name='fullName'
              type="text"
              value={ data.fullName }
            />
            <Form.Control.Feedback type="invalid">
              { t('error.required') }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Control
              required
              onChange={ handleOnChange }
              name='phone'
              type="text"
              placeholder="Please enter"
              value={ data.phone }
            />
            <Form.Control.Feedback type="invalid">
              { t('error.required') }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              required
              onChange={ handleOnChange }
              name='email'
              type="email"
              value={ data.email }
            />
            <Form.Control.Feedback type="invalid">
              { t('error.required') }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="desc">
            <Form.Control
              placeholder={t('placeholder.message')}
              value={ data.desc }
              as="textarea"
              rows={ 5 }
              name='desc'
              onChange={ handleOnChange }
            />
          </Form.Group>
          <Form.Group controlId="select-property">
            <Form.Control
              onChange={ handleOnChange }
              name='selectedProperty'
              className='custom-select'
              as="select"
              value={ data.selectedProperty }
            >
              {
                properties.map((property, index) =>
                  <option key={ index }>{ property.search_address }</option>,
                )
              }
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="freeCharge">
            <Form.Check
              name='freeCharge'
              onChange={ handleOnChange }
              type="checkbox"
              label='I would like to have my property evaluated free of charge'
              checked={ data.freeCharge }
            />
          </Form.Group>
          <div className="modal-btn-group">
            <Button className='confirm' onClick={ sendToAgency }>
              { t('button.confirm') }
            </Button>
          </div>
        </Form>
      </div>
      <div className="contact-agency-block__desc">
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt <span className='link'>nostrud amet.</span> Amet
          minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. <span className='link'>
          Velit officia</span> consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          Amet minim mollit non deserunt ullamco est sit aliqu,
        </p>
      </div>
    </div>
  )
}

export default ContactAgencyBlock;