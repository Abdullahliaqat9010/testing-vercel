import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { closeVerifyEmailModalAction } from '../../../actions';
import { RootState } from '../../../types/state';

const VerifyEmailModal = () => {
  const dispatch = useDispatch();
  const { needVerifyEmailModal  } = useSelector((state: RootState) => state.modals);

  const handleCloseModal = () => {
    dispatch(closeVerifyEmailModalAction());
  };
  return (
    <Modal
      size="lg"
      show={needVerifyEmailModal}
      onHide={ handleCloseModal }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <p>
          To contact the agency you need to verify your email. Please check the email that you pointed
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ handleCloseModal }>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyEmailModal;