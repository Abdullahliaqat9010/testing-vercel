import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Button } from 'react-bootstrap';
import LoadMoreImage from '../../../assets/images/load-more.svg';

import Agency from '../../../containers/Agency';

import { agentsList } from '../../../templates/agentsList';
import { getAgencyPropertyDataAction, getInfoAgencyAction } from '../../../actions';
import { useDispatch } from 'react-redux';

const FindAgentBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();

  const elementsOnPage = 3;
  const [sizeArr, setSizeArr] = useState(elementsOnPage);
  const agencyList = agentsList.slice(0, sizeArr);

  useEffect(() => {
    dispatch(getInfoAgencyAction());
    dispatch(getAgencyPropertyDataAction());
  }, [])

  const loadMore = () => {
    setSizeArr(sizeArr + elementsOnPage);
  }

  return (
    <div className='find-agent-block'>
      <h3>{t('title.find-your-agent')}</h3>
      <p>{t('desc.we-found')} { agentsList.length } {t('desc.agents-near-you')}</p>
      {
        agencyList.map(
          (agency, index) =>
            <Agency agency={agency} key={index}/>
        )
      }
      {
        agencyList.length < agentsList.length &&
        <Button className='load-more' onClick={loadMore}>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }
        </Button>
      }
    </div>
  )
}

export default FindAgentBlock;