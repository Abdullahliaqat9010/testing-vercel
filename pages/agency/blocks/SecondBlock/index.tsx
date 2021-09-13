import React from 'react';
import { Button } from 'react-bootstrap';

import AgentOne from '../../../../assets/images/agency-page/temp/1.png';
import AgentTwo from '../../../../assets/images/agency-page/temp/2.png';
import AgentThree from '../../../../assets/images/agency-page/temp/3.png';
import AgentFour from '../../../../assets/images/agency-page/temp/4.png';
import AgentFive from '../../../../assets/images/agency-page/temp/5.png';
import AgentSix from '../../../../assets/images/agency-page/temp/6.png';
import LoadMoreImage from '../../../../assets/images/load-more.svg';
import { useTranslation } from 'react-i18next';
const SecondBlock = () => {
  const { t } = useTranslation("agency-page")

  return (
    <div className="Agency__second-block">
      <div className="main-content">
        <h3>{t("h3.meat-team")}</h3>
        <p> {t("p.found")}  1,205 {t("p.agents")}</p>
        <div className="agents-block">
          <div className="agent">
            <img src={ AgentOne } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Kristin Watson</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
          <div className="agent">
            <img src={ AgentTwo } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Theresa Webb</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
          <div className="agent">
            <img src={ AgentThree } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Jacob Jones</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
          <div className="agent">
            <img src={ AgentFour } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Theresa Webb</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
          <div className="agent">
            <img src={ AgentFive } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Floyd Miles</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
          <div className="agent">
            <img src={ AgentSix } alt="avatar"/>
            <div className="agent-info">
              <span className="agent-name">Guy Hawkins</span>
              <span className="agent-position">Agency owner</span>
            </div>
          </div>
        </div>
        <Button className='load-more'>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/> {t("button.learn-more")}
        </Button>
      </div>
    </div>
  )
};

export default SecondBlock;