import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Modal } from 'react-bootstrap';
import { RootState } from '../../types/state';
import { closeModalWindowContactAgentAction } from '../../actions';

const ContactAgentModal = () => {
  const dispatch = useDispatch();
  const { showAgentModal } = useSelector((state: RootState) => state.userInfo);

  const handleCloseModal = () => {
    dispatch(closeModalWindowContactAgentAction());
  }

  return (
    <Modal
      className='contact-agent-modal'
      show={showAgentModal}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title className='d-flex flex-column'>
          Contact Thierry Deviers
          <p>Century 21 - PATRIMOINE 24</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>First and Last name</Form.Label>
            <Form.Control type="text" defaultValue='Anna Johns' />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Please enter" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" defaultValue='anna.johns@gmail.com' />
          </Form.Group>

          <Form.Group controlId="desc">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control defaultValue="I have seen your profile on Immo Belgium and I would like to
            speak with you about my real estate project. " as="textarea" rows={5}
            />
          </Form.Group>
          <Form.Group controlId="select-property">
            <Form.Label>Select your property</Form.Label>
            <Form.Control as="select" defaultValue="Select">
              <option>Select</option>
              <option>...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="agree">
            <Form.Check type="checkbox" label="I would like to have my property evaluated free of charge" />
          </Form.Group>
          <div className="modal-btn-group">
            <Button className='confirm'>
              Confirm
            </Button>
            <Button className='cancel' onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ContactAgentModal;