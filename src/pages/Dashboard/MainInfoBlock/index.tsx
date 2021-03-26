import React from 'react';

import arrowIcon from '../../../assets/images/arrow-blue.svg';
import squareIcon from '../../../assets/images/square.svg';
import bedsIcon from '../../../assets/images/beds.svg';
import bathIcon from '../../../assets/images/bath.svg';

const MainInfoBlock = () => {
  return (
    <div className='main-info-block'>
      <div className="top-block d-flex align-items-center justify-content-between">
        <h4>Route des Cent Ecus, 24370 Sainte Mondane</h4>
        <span className='d-flex align-items-center'>
          Edit <img src={ arrowIcon } alt="arrowIcon"/>
        </span>
      </div>
      <div className="bottom-block d-flex">
        <div className="image-block d-flex">
          <img src={ squareIcon } alt="squareIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Square</span>
            <span className="desc">100m²</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bedsIcon } alt="bedsIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Beds</span>
            <span className="desc">3</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bathIcon } alt="bathIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Baths</span>
            <span className="desc">2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlock;