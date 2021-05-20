import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { closeRemindPasswordModalAction } from '../../../actions';
import { RootState } from '../../../types/state';

const RemindPasswordModal = () => {
  const dispatch = useDispatch();
  const { remindPasswordModal  } = useSelector((state: RootState) => state.modals);

  const handleCloseModal = () => {
    dispatch(closeRemindPasswordModalAction());
  };
  return (
    <Modal
      size="lg"
      show={remindPasswordModal}
      onHide={ handleCloseModal }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <p>
          We have sent instructions to your mailbox with the following steps, please check it.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ handleCloseModal }>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemindPasswordModal;