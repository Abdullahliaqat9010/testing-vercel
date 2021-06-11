import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import GoogleMap from '../../../components/GoogleMap';

const RequestPriceModal = ({show, handleClose}) => {
  return (
    <Modal
      className='request-property-modal'
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="request-price-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="request-price-modal">
          Request the price
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex'>
        <div className="left-block w-50">
          <Form>
            <Form.Group controlId="fullName">
              <Form.Label>First and Last name</Form.Label>
              <Form.Control
                value='Anna Johns'
                name='fullName'
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name='phone'
                type="text"
                placeholder="Please enter"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                value='anna.johns@gmail.com'
                name='email'
                type="email"
              />
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>desc</Form.Label>
              <Form.Control
                value='I have seen you sold property [2464 Royal Ln. Mesa, New Jersey 45463] and I’d like to know the sold price.'
                as="textarea"
                rows={ 5 }
                name='desc'
              />
            </Form.Group>
            <Form.Group controlId="agree">
              <Form.Check
                name='agree'
                type="checkbox"
                label='I agree to Terms and Conditions of Belgium Immo'
              />
            </Form.Group>
            <div className="modal-btn-group">
              <Button className='confirm'>
                confirm
              </Button>
              <Button className='cancel'>
                cancel
              </Button>
            </div>
          </Form>
        </div>
        <div className="right-block w-50">
          <p className="property-address">
            2464 Royal Ln. Mesa, New Jersey 45463
          </p>
          <div className="property-location">
            {/*@ts-ignore*/}
            <GoogleMap coordsCurrentProperty={{lat: 50.4666086, lng: 4.0528334}} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
};

export default RequestPriceModal;