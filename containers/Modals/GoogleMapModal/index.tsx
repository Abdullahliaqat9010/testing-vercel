import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useTranslation } from 'next-i18next';
import { Button, Modal } from 'react-bootstrap';

import GoogleMap from '../../../components/GoogleMap';

const GoogleMapModal = ({show, handleClose}) => {
  const {t} = useTranslation('property-page');

  return (
    <Modal
      className='map-modal'
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          2464 Royal Ln. Mesa, New Jersey 45463
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*@ts-ignore*/}
        <GoogleMap coordsCurrentProperty={{lat: 50.4666086, lng: 4.0528334}} />
      </Modal.Body>
      {
        isMobileOnly && <Button className='close-btn' onClick={handleClose}>{ t('button.close') }</Button>
      }
    </Modal>
  )
}

export default GoogleMapModal;