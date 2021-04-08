import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../types/state';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';
import StepsBlock from './StepsBlock';
import InfoBlock from './InfoBlock';

const MainPageComponent = () => {
  const {mainBlocks, goToDashboard} = useSelector((state: RootState) => state.stepsInfo);

  useEffect(() => {
    if (goToDashboard) {
      window.location.href = '/dashboard';
    }
  }, [goToDashboard]);

  return (
    <div className='main-page'>
      {
        !mainBlocks
          ?
          <>
            <ImagesBlock/>
            <InfoBlock/>
            <TestimonialsBlock/>
            <div className="short-footer d-flex justify-content-between">
              <span>Agence:  | Numéro IPI: | Immo Wallonie ©{ new Date().getFullYear() }. All Rights Reserved.</span>
              <span className="link">Politique de Confidentialité.</span>
            </div>
          </>
          :
          <StepsBlock/>
      }
    </div>
  );
};

export default MainPageComponent;