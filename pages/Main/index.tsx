import React from 'react';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';

const MainPageComponent = () => {
  return (
    <div className='main-page'>
      <ImagesBlock/>
      <TestimonialsBlock/>
    </div>
  );
};

export default MainPageComponent;