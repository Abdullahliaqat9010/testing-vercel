import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Modal } from 'react-bootstrap';
import { RootState } from '../../types/state';
import { closeModalWindowContactAgentAction, contactAgencyAction } from '../../actions';

const ContactAgentModal = () => {
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

  const sendToAgency = () => {
    const findProp = properties.find(property => property.search_address === data.selectedProperty);

    const dataInfo = {
      agentId: agencyContactInfo.agencyId,
      phone: data.phone,
      message: data.desc,
      propertyId: findProp.id,
      free_evaluated: data.agree,
    };

    dispatch(contactAgencyAction(dataInfo));
  };

  return (
    <Modal
      className='contact-agent-modal'
      show={ showAgentModal }
      onHide={ handleCloseModal }
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex flex-column'>
          Contact { agencyContactInfo.agentName + ' ' + agencyContactInfo.agentSurname }
          <p>{ agencyContactInfo.title }</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>First and Last name</Form.Label>
            <Form.Control
              onChange={ handleOnChange }
              name='fullName'
              type="text"
              value={ data.fullName }
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={ handleOnChange }
              name='phone'
              type="text"
              placeholder="Please enter"
              value={ data.phone }
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              onChange={ handleOnChange }
              name='email'
              type="email"
              value={ data.email }
            />
          </Form.Group>

          <Form.Group controlId="desc">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control value={ data.desc } as="textarea" rows={ 5 } name='desc' onChange={ handleOnChange }/>
          </Form.Group>
          <Form.Group controlId="select-property">
            <Form.Label>Select your property</Form.Label>
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
              label="I would like to have my property evaluated free of charge"
              checked={ data.agree }
            />
          </Form.Group>
          <div className="modal-btn-group">
            <Button className='confirm' onClick={ sendToAgency }>
              Confirm
            </Button>
            <Button className='cancel' onClick={ handleCloseModal }>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactAgentModal;