import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../types/state';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';
import StepsBlock from './StepsBlock';

const MainPageComponent = () => {
  const { mainBlocks } = useSelector((state: RootState) => state.stepBlock);

  return (
    <div className='main-page'>
      {
        !mainBlocks
          ?
          <>
            <ImagesBlock/>
            <TestimonialsBlock/>
            <div className="short-footer d-flex justify-content-between">
              <span>Agence:  | Numéro IPI: | Immo Wallonie ©{ new Date().getFullYear() }. All Rights Reserved.</span>
              <span className="link">Politique de Confidentialité.</span>
            </div>
          </>
          :
          <StepsBlock />
      }
    </div>
  );
};

export default MainPageComponent;