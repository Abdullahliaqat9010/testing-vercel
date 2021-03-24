import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

// import PriceGraphImage from '../../../assets/images/price-graph.svg';

const EstimateBlock = () => {
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
            <Button>Way too low</Button>
            <Button>Too low</Button>
            <Button>Accurate</Button>
            <Button>Too high</Button>
            <Button>Way to high</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default EstimateBlock;