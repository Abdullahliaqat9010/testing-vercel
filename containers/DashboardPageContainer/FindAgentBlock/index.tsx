import React from 'react';
import { useTranslation } from 'next-i18next';

// import { Button } from 'react-bootstrap';
// import LoadMoreImage from '../../../assets/images/load-more.svg';

import Agency from '../../../containers/Agency';

import { agentsList } from '../../../templates/agentsList';

const FindAgentBlock = () => {
  const {t} = useTranslation('dashboard-page');
  return (
    <div className='find-agent-block'>
      <h3>{t('title.find-your-agent')}</h3>
      <p>{t('desc.we-found')} { agentsList.length } {t('desc.agents-near-you')}</p>
      {
        agentsList.map(
          (agency, index) =>
            <Agency agency={agency} key={index}/>
        )
      }
      {/*<Button className='load-more'>*/}
      {/*  <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }*/}
      {/*</Button>*/}
    </div>
  )
}

export default FindAgentBlock;