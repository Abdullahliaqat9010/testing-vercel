import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../types/state';

// import loadable from '@loadable/component';

import ImagesBlock from './ImagesBlock';
import TestimonialsBlock from './TestimonialsBlock';
import StepsBlock from './StepsBlock';
import InfoBlock from './InfoBlock';
// const ImagesBlock = loadable(() => import('./ImagesBlock'));
// const TestimonialsBlock = loadable(() => import('./TestimonialsBlock'));
// const StepsBlock = loadable(() => import('./StepsBlock'));
// const InfoBlock = loadable(() => import('./InfoBlock'));

const MainPageComponent = () => {
  const router = useRouter();

  const { locale } = router;
  const {mainBlocks, goToDashboard} = useSelector((state: RootState) => state.stepsInfo);

  useEffect(() => {
    if (goToDashboard) {
      window.location.href = locale + '/dashboard';
    }
  }, [goToDashboard]);

  return (
    <div className='main-page'>
      {
        mainBlocks ? <StepsBlock/> :
          <>
            <ImagesBlock/>
            <InfoBlock/>
            <TestimonialsBlock/>
            <div className="short-footer d-flex justify-content-between">
              <p>
                <span>Immo Belgium </span>
                <span>{ new Date().getFullYear() }. All Rights Reserved.</span>
              </p>
              <span className="link">
                <a href={ locale + '/privacy-policy' } target='_blank'>Politique de Confidentialité.</a>
              </span>
            </div>
          </>
      }
    </div>
  );
};

export default MainPageComponent;