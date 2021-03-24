import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EstimateBlock = () => {
  return (
    <div className='estimate-block'>
      <h4>Estimated Market Value</h4>
      <p>Route des Cent Ecus, 24370 Sainte Mondane</p>
      <div className="scale-block">
        <div className="line">
          <OverlayTrigger
            key='tooltip'
            placement='top'
            show
            overlay={
              <Tooltip id='price-block'>
                €1,097,500
              </Tooltip>
            }
          >
            <div className="circle"/>
          </OverlayTrigger>
        </div>
        <div className="range d-flex justify-content-between">
          <div className="min">€ <span>1,009,750</span></div>
          <div className="max">€ <span>1,185,250</span></div>
        </div>
        <div className="btn-block">
          <span className='btn-block__title w-100'>How accurate is this estimation?</span>
          <ButtonGroup size="lg" className="w-100">
            <Button>Inaccurate</Button>
            <Button>Low</Button>
            <Button>Medium</Button>
            <Button>High</Button>
            <Button>Exact</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}

export default EstimateBlock;