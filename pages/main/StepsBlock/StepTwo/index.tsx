import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import IconClear from '../../../../assets/images/icon-close.svg';

const StepTwo = () => {
  const [addressValue, setAddressValue] = useState('');

  const handleChangeVal = (el: any) => {
    setAddressValue(el.target.value);
  };

  const clearInput = () => {
    setAddressValue('');
  };

  return (
    <div className='step-two'>
      <span className="step-title">Step 2</span>
      <h4>Address</h4>
      <Form>
        <Form.Row>
          <Form.Group className='mr-4' controlId="street">
            <Form.Label>Street</Form.Label>
            <InputGroup>
              <Form.Control value={ addressValue } onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>
                  <img onClick={clearInput} src={ IconClear } alt="IconClear"/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>№</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className='mr-4' controlId="zip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group controlId="locality">
            <Form.Label>Locality</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form.Row>
      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button className='prev-step'>Back</Button>
        <Button className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepTwo;