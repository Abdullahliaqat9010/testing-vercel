import React from 'react';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';

const MainPageComponent = () => {
  return (
    <div className='main-page'>
      <ImagesBlock/>
      <TestimonialsBlock/>
      <div className="short-footer d-flex justify-content-between">
        <span>Agence:  | Numéro IPI: | Immo Wallonie ©{ new Date().getFullYear() }. All Rights Reserved.</span>
        <span className="link">Politique de Confidentialité.</span>
      </div>
    </div>
  );
};

export default MainPageComponent;