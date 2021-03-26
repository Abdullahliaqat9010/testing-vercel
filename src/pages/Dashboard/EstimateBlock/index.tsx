import React, { useState } from 'react';
import { Button, ButtonGroup, FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import SuccessImage from '../../../assets/images/success.png';
import { estimationButtonsList } from '../../../templates/estimationButtonsList';

const EstimateBlock = () => {
  const [activeBtn, setActiveBtn] = useState<string>('');
  const [estimationPopup, setEstimationPopup] = useState<boolean>(false);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);

  const showEstimationPopup = (btnId: string) => {
    if (!thanksPopup) {
      setActiveBtn(btnId);
      setEstimationPopup(true);
    }
    return false;
  };

  const nextStepPopup = () => {
    setEstimationPopup(false);
    setThanksPopup(true);
  };

  const closePopups = () => {
    setActiveBtn('');
    setThanksPopup(false);
  };

  return (
    <div className='estimate-block'>
      <h4>Estimated Market Value</h4>
      <p>Route des Cent Ecus, 24370 Sainte Mondane</p>
      <div className="scale-block">
        <OverlayTrigger
          key='tooltip'
          placement='top'
          show
          overlay={
            <Tooltip id='price-block'>
              <span>€1,097,500</span>
              <span className='gray'>€1,185.250 per m²</span>
            </Tooltip>
          }
        >
          <div className="line"/>
        </OverlayTrigger>
        <div className="range d-flex justify-content-between">
          <div className="min">
            <span>€1,009,750</span>
            <span className='gray'>€1,009.750 per m²</span>
          </div>
          <div className="max">
            <span>€1,185,250</span>
            <span className='gray'>€1,185.250 per m²</span>
          </div>
        </div>
        <div className="btn-block">
          <span className='btn-block__title w-100'>How accurate is this estimation?</span>
          <ButtonGroup size="lg" className="w-100">
            {
              estimationButtonsList.map(
                (item, index) =>
                  <Button
                    key={index}
                    className={activeBtn === item.id ? 'custom-active' : ''}
                    onClick={ () => showEstimationPopup(item.id) }
                  >
                    { item.title }
                  </Button>
              )
            }
          </ButtonGroup>
        </div>
      </div>
      {
        estimationPopup &&
          <div className='estimation-popup'>
            <p className='estimation-popup__title'>What is your estimation?</p>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className='ico'>€</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className='border-left-0'
                placeholder="1,097,500"
              />
            </InputGroup>
            <p className='estimation-popup__title'>Do you have some feedback or comments regarding estimation?</p>
            <FormControl
              as="textarea"
              rows={5}
              placeholder="I think this property has accurate price because..."
            />
            <Button onClick={nextStepPopup} className='confirm'>Confirm</Button>
          </div>
      }
      {
        thanksPopup &&
          <div className='thanks-for-reply d-flex flex-column align-items-center'>
            <img src={ SuccessImage } alt="SuccessImage"/>
            <span className="thanks-for-reply__title">Thank you for your reply!</span>
            <span className="thanks-for-reply__desc">
              We appreciate your help and we will be working on improvement of our estimator tool.
            </span>
            <Button onClick={closePopups}>Close</Button>
          </div>
      }
    </div>
  );
};

export default EstimateBlock;