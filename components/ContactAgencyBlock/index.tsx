import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ContactAgencyBlock = () => {
  return (
    <div className='contact-agency-block'>
      <div className='contact-agency'>
        <h4>Contact Agency</h4>
        <p>Century 21 - PATRIMOINE 24</p>
        <Form>
          <Form.Control type="text" defaultValue='Anna Johns' />
          <Form.Control type="text" placeholder="Please enter" />
          <Form.Control type="email" defaultValue='anna.johns@gmail.com' />
          <Form.Control
            placeholder="I have seen your profile on Immo Belgium and I would like to speak with
          you about my real estate project."
            as="textarea"
            rows={5}
          />
          <Form.Control className='custom-select' as="select" defaultValue="Select">
            <option>Select</option>
            <option>...</option>
            <option>...</option>
          </Form.Control>
          <Form.Group controlId="agree">
            <Form.Check type="checkbox" label="I would like to have my property evaluated free of charge" />
          </Form.Group>
          <Button className='confirm'>Confirm</Button>
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