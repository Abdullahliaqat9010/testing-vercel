import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { Button, Form, Modal } from 'react-bootstrap';
import { RootState } from '../../types/state';
import { closeModalWindowContactAgentAction, contactAgencyAction } from '../../actions';

const ContactAgentModal = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const {
    showAgentModal,
    agencyContactInfo,
    userName,
    userSurname,
    userEmail,
    properties,
  } = useSelector((state: RootState) => state.userInfo);

  const [data, setData] = useState({
    fullName: userName + ' ' + userSurname,
    phone: '',
    email: userEmail,
    desc: '',
    selectedProperty: '',
    agree: false,
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (properties.length > 0) {
      setData({...data, selectedProperty: properties[0].search_address});
    }
  }, [properties]);

  const handleCloseModal = () => {
    dispatch(closeModalWindowContactAgentAction());
  };

  const handleOnChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [el.target.name]: el.target.name === 'agree' ? el.target.checked : el.target.value,
    });
  };

  const validation = () => {
    return data.fullName.length > 0
      && data.phone.length > 0
      && data.email.length > 0
      && data.desc.length > 0
      && data.selectedProperty.length > 0;
  };

  const sendToAgency = () => {
    if (validation()) {

      const findProp = properties.find(property => property.search_address === data.selectedProperty);

      const dataInfo = {
        agentId: agencyContactInfo.agencyId,
        phone: data.phone,
        message: data.desc,
        propertyId: findProp.id,
        free_evaluated: data.agree,
      };

      dispatch(contactAgencyAction(dataInfo));
    }

    setValidated(true);
  };

  return (
    <Modal
      className='contact-agent-modal'
      show={ showAgentModal }
      onHide={ handleCloseModal }
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex flex-column'>
          { t('button.contact') } { agencyContactInfo.agentName + ' ' + agencyContactInfo.agentSurname }
          <p>{ agencyContactInfo.title }</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={ validated }>
          <Form.Group controlId="fullName">
            <Form.Label>{ t('label.fullname') }</Form.Label>
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
            <Form.Label>{ t('label.phone') }</Form.Label>
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
            <Form.Label>{ t('label.email') }</Form.Label>
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
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              required
              value={ data.desc }
              as="textarea"
              rows={ 5 }
              name='desc'
              onChange={ handleOnChange }
            />
            <Form.Control.Feedback type="invalid">
              { t('error.required') }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="select-property">
            <Form.Label>{ t('label.select') }</Form.Label>
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
          <Form.Group controlId="agree">
            <Form.Check
              name='agree'
              onChange={ handleOnChange }
              type="checkbox"
              label={ t('label.free-charge') }
              checked={ data.agree }
            />
          </Form.Group>
          <div className="modal-btn-group">
            <Button className='confirm' onClick={ sendToAgency }>
              { t('button.confirm') }
            </Button>
            <Button className='cancel' onClick={ handleCloseModal }>
              { t('button.cancel') }
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactAgentModal;