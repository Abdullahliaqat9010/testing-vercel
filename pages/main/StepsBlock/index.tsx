import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import StepTwo from './StepTwo';
import GoogleMap from '../../../components/GoogleMap';

const StepsBlock = () => {
  return (
    <div className='steps-block'>
      <ProgressBar className='steps-block__progress-bar' now={20} />
      <div className="steps-block__main d-flex">
        <div className='ml-156 w-50 mt-87'>
          <StepTwo />
        </div>
        <div className='w-50'>
          <GoogleMap lat={40.7510674} lng={-74.1660403} />
        </div>
      </div>
    </div>
  )
}

export default StepsBlock;