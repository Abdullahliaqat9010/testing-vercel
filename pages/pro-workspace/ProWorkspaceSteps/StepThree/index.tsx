import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

// import { goToNextStepAction } from '../../../../actions';
// import { RootState } from '../../../../types/state';

import IconBack from '../../../../assets/images/long-arrow.svg';

const StepThreePro = () => {
  // const dispatch = useDispatch();
  const [validated, setValidated] = useState<boolean>(false);
  const [subBlock, setSubBlock] = useState<boolean>(false);

  const handleSubmit = () => {
    // if (!validated) {
    //   setValidated(false);
    //   dispatch(goToNextStepAction());
    // }

    return setValidated(true);
  };

  const showSubBlock = () => {
    setSubBlock(!subBlock);
  };

  return (
    <div className="pro-step-three">
      <h1>Company details?</h1>
      <h2>Benefit from using ImmoBelgium for your agency</h2>
      <Form noValidate validated={ validated }>
        <Form.Group controlId="ipi">
          <Form.Label>IPI number</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue="105159105701"
          />
        </Form.Group>
        <Form.Group controlId="companyName">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue="Century 21 Real Estate"
          />
        </Form.Group>
        {
          !subBlock &&
          <Form.Group controlId="vat">
            <Form.Label>VAT number</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Enter your company VAT"
              />
              <Form.Control.Feedback type="invalid">
                Please Enter VAT Number.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        }
        <Form.Group onClick={ showSubBlock }>
          <Form.Check
            defaultChecked={ !subBlock }
            label="Use the same billing address as a company address:"
          />
        </Form.Group>
        {
          !subBlock ? <span className="full-address">Boulevard Adolphe Max. 45, 107, 1000</span>
            :
            <div className="sub-block">
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
            </div>
        }
        <div className="button-group">
          <Button className='back-step'><img src={ IconBack } alt="IconBack"/>Back</Button>
          <Button className='next-step' onClick={ handleSubmit }>Finish</Button>
        </div>
      </Form>
    </div>
  );
};

export default StepThreePro;