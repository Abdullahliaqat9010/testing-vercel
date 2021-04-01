import React from 'react';
import { Button, Form } from 'react-bootstrap';

import ArrowIcon from '../../../../assets/images/arrow-blue.svg'

const FinalStep = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='final-step'>
      <span className="step-title">Good job!</span>
      <h4>Your estimation is ready!</h4>
      <span className="step-desc">
        We finalized your estimation and personal report. You need to create an account or use existing
        account to review it.
      </span>
      <span className="have-account">
        I already have an account
        <img src={ ArrowIcon } alt="ArrowIcon"/>
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Row className='mb-4'>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form.Row>
        <Form.Group className='mb-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"/>
        </Form.Group>
        <Form.Row>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>

        </Form.Row>
        <span className='recommendation'>We strongly recommend to use strong password, with at least one symbol and digit.</span>
        <Form.Check label="I’d like to receive occasional promotions by email."/>
        <Form.Check label="I have read and agree to service Privacy Policy and Terms and conditions"/>
        <Button type="submit">Create an account</Button>
      </Form>
    </div>
  )
}

export default FinalStep;