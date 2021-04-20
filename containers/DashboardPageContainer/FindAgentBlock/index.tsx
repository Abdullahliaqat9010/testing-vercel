import React from 'react';

import { Button } from 'react-bootstrap';
import LoadMoreImage from '../../../assets/images/load-more.svg';

import Agency from '../../../containers/Agency';

import { agentsList } from '../../../templates/agentsList';

const FindAgentBlock = () => {
  return (
    <div className='find-agent-block'>
      <h3>Find your agent</h3>
      <p>We found 2 agents that are near to you property location.</p>
      {
        agentsList.map(
          (agency, index) =>
            <Agency agency={agency} key={index}/>
        )
      }
      <Button className='load-more'>
        <img src={ LoadMoreImage } alt="LoadMoreImage"/>Load More
      </Button>
    </div>
  )
}

export default FindAgentBlock;