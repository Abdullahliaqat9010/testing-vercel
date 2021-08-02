import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

import { goToNextStepAction } from '../../../../actions';

import IconBack from '../../../../assets/images/long-arrow.svg';

const StepTwoPro = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = () => {
    // if (!validated) {
    //   setValidated(false);
    //   dispatch(goToNextStepAction());
    // }
    dispatch(goToNextStepAction());
    return setValidated(true);
  };

  return (
    <div className="pro-step-two">
      <h1>Tell us about your agency</h1>
      <h2>You will be able to customize agency profile from your dashboard.</h2>
      <Form noValidate validated={ validated }>
        <Form.Group controlId="vitrineName">
          <Form.Label>Name of the vitrine</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue="Century 21 Real Estate"
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue="Brussels"
          />
        </Form.Group>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              defaultValue="Boulevard Adolphe Max."
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <div className="form-block d-flex">
          <Form.Group controlId="streetNumber">
            <Form.Label>Street number</Form.Label>
            <Form.Control
              type="text"
              defaultValue="45"
              required
            />
          </Form.Group>
          <Form.Group controlId="zipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              defaultValue="107, 1000"
              required
            />
          </Form.Group>
        </div>
        <div className="button-group">
          <Button className='back-step'><img src={ IconBack } alt="IconBack"/>Back</Button>
          <Button className='next-step' onClick={ handleSubmit }>Next</Button>
        </div>
      </Form>
    </div>
  )
}

export default StepTwoPro;