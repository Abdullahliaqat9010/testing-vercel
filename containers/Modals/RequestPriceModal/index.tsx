import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import GoogleMap from '../../../components/GoogleMap';

import BathImage from '../../../assets/images/bath-gray.svg';
import BedsImage from '../../../assets/images/beds-gray.svg';
import SquareImage from '../../../assets/images/square-gray.svg';
import LivingSquareImage from '../../../assets/images/living-square-gray.svg';
import { isMobileOnly } from 'react-device-detect';

const RequestPriceModal = ({show, handleClose}) => {
  const [validated, setValidated] = useState(false);

  const [data, setData] = useState({
    fullName: '',
    phone: '',
    email: '',
    desc: 'I have seen you sold property [2464 Royal Ln. Mesa, New Jersey 45463] and I’d like to know the sold price.',
    agree: false,
  });

  const handleChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [el.target.name]: el.target.name === 'agree' ? el.target.checked : el.target.value,
    });
  };

  const validation = () => {
    return data.fullName.length > 0
      && data.phone.length > 0
      && data.email.length > 0
      && data.agree;
  };

  const handleConfirm = () => {
    if (validation()) {
      console.log('send data to BE');
    }
    setValidated(true);
  };

  const handleCloseBtn = () => {
    setData({
      fullName: '',
      phone: '',
      email: '',
      desc: 'I have seen you sold property [2464 Royal Ln. Mesa, New Jersey 45463] and I’d like to know the sold price.',
      agree: false,
    });
    setValidated(false);
    handleClose();
  };

  return (
    <Modal
      className='request-property-modal'
      show={ show }
      onHide={ handleCloseBtn }
      size="lg"
      aria-labelledby="request-property-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="request-property-modal">
          Request the price
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='custom-req-price-modal'>
        {
          isMobileOnly && <span className='mobile-address'>2464 Royal Ln. Mesa, New Jersey 45463</span>
        }
        <div className="left-block">
          <Form noValidate validated={ validated }>
            <Form.Group controlId="fullName">
              <Form.Label>First and Last name</Form.Label>
              <Form.Control
                required
                value={ data.fullName }
                name='fullName'
                type="text"
                onChange={ handleChange }
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                name='phone'
                type="text"
                value={ data.phone }
                placeholder="Please enter"
                onChange={ handleChange }
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                value={ data.email }
                name='email'
                type="email"
                onChange={ handleChange }
              />
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Message</Form.Label>
              <Form.Control
                required
                value={ data.desc }
                as="textarea"
                rows={ 5 }
                name='desc'
                onChange={ handleChange }
              />
            </Form.Group>
            <Form.Group controlId="agree">
              <Form.Check
                required
                checked={ data.agree }
                name='agree'
                type="checkbox"
                onChange={ handleChange }
                label='I agree to Terms and Conditions of Belgium Immo'
              />
            </Form.Group>
            <div className="modal-btn-group">
              <Button className='confirm' onClick={ handleConfirm }>
                confirm
              </Button>
              <Button className='cancel' onClick={ handleCloseBtn }>
                cancel
              </Button>
            </div>
          </Form>
        </div>
        <div className="right-block">
          <p className="property-address">
            2464 Royal Ln. Mesa, New Jersey 45463
          </p>
          <div className="property-location">
            {/*@ts-ignore*/ }
            <GoogleMap coordsCurrentProperty={ {lat: 50.4666086, lng: 4.0528334} }/>
          </div>
          <div className="property-info">
            <div className="property-info__item">
              <img src={ SquareImage } alt="SquareImage"/>
              <div className="info-block">
                <span className='gray'>Total Square</span>
                <span className='nunito-bold'>100m²</span>
              </div>
            </div>
            <div className="property-info__item">
              <img src={ BedsImage } alt="BedsImage"/>
              <div className="info-block">
                <span className='gray'>Beds</span>
                <span className='nunito-bold'>3</span>
              </div>
            </div>
            <div className="property-info__item living-square">
              <img src={ LivingSquareImage } alt="LivingSquareImage"/>
              <div className="info-block">
                <span className='gray'>Living Square</span>
                <span className='nunito-bold'>65m²</span>
              </div>
            </div>
            <div className="property-info__item">
              <img src={ BathImage } alt="BathImage"/>
              <div className="info-block">
                <span className='gray'>Baths</span>
                <span className='nunito-bold'>2</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPriceModal;