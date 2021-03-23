import React from 'react';

const EstimateBlock = () => {
  return (
    <div className='estimate-block'>
      <h4>Estimated Market Value</h4>
      <p>Route des Cent Ecus, 24370 Sainte Mondane</p>
      <div className="scale-block">
        <div className="line">
          <div className="circle">

          </div>
        </div>
        <div className="range d-flex justify-content-between">
          <div className="min">€ <span>1,009,750</span></div>
          <div className="max">€ <span>1,185,250</span></div>
        </div>
      </div>
    </div>
  )
}

export default EstimateBlock;