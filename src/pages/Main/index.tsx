import React from 'react';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';

import './index.scss';

const MainPage = () => {
  return (
    <div className='main-page'>
      <ImagesBlock/>
      <TestimonialsBlock/>
    </div>
  );
};

export default MainPage;