import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { Button, ButtonGroup, FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getPriceForPropertyAction } from '../../../actions';
import { RootState } from '../../../types/state';

import SuccessImage from '../../../assets/images/success.png';
import { estimationButtonsList } from '../../../templates/estimationButtonsList';

const EstimateBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const { mainProperty, currentPropertyPrice } = useSelector((state: RootState) => state.userInfo);

  const [activeBtn, setActiveBtn] = useState<string>('');
  const [estimationPopup, setEstimationPopup] = useState<boolean>(false);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);

  useEffect(() => {
    if (mainProperty && mainProperty.id) {
      dispatch(getPriceForPropertyAction(mainProperty.id));
    }
  }, [mainProperty])

  const showEstimationPopup = (btnId: string) => {
    if (!thanksPopup) {
      setActiveBtn(btnId);
      setEstimationPopup(true);
    }
    return false;
  };

  const nextStepPopup = () => {
    setEstimationPopup(false);
    setThanksPopup(true);
  };

  const showTitle = (btnName: string) => {
    return btnName.toLowerCase();
  }

  const closePopups = () => {
    setActiveBtn('');
    setThanksPopup(false);
  };

  return (
    <div className='estimate-block'>
      <h4>Estimated Market Value</h4>
      <p>{ mainProperty?.search_address }</p>
      {
        mainProperty?.search_address &&
        <div className="scale-block">
          <OverlayTrigger
            key='tooltip'
            placement='top'
            show
            overlay={
              <Tooltip id='price-block'>
                <span>Construction price: €{ currentPropertyPrice }</span>
                <span className='gray'>Land Price: 0</span>
                {/*<span>€1,097,500</span>*/}
                {/*<span className='gray'>€1,185.250 per m²</span>*/}
              </Tooltip>
            }
          >
            <div className="line"/>
          </OverlayTrigger>
          <div className="range d-flex justify-content-between">
            <div className="min">
              <span>€1,009,750</span>
              <span className='gray'>€1,009.750 per m²</span>
            </div>
            <div className="max">
              <span>€1,185,250</span>
              <span className='gray'>€1,185.250 per m²</span>
            </div>
          </div>
          <div className="btn-block">
            <span className='btn-block__title w-100'>{ t('title.accurate-estimation') }</span>
            <ButtonGroup size="lg" className="w-100">
              {
                estimationButtonsList.map(
                  (item, index) =>
                    <Button
                      key={index}
                      className={activeBtn === item.id ? 'custom-active' : ''}
                      onClick={ () => showEstimationPopup(item.id) }
                    >
                      { t(`button.${ item.id }`) }
                    </Button>
                )
              }
            </ButtonGroup>
          </div>
        </div>
      }
      {
        estimationPopup &&
          <div className='estimation-popup'>
            <p className='estimation-popup__title'>{ t('label.what-your-estimation') }</p>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className='ico'>€</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className='border-left-0'
                placeholder="1,097,500"
              />
            </InputGroup>
            <p className='estimation-popup__title'>{ t('label.feedback-or-comments') }</p>
            <FormControl
              as="textarea"
              rows={5}
              placeholder={ `${ t('placeholder.property-has') } ${showTitle(t('button.' + activeBtn))} ${ t('placeholder.price-because') }...` }
            />
            <Button onClick={nextStepPopup} className='confirm'>{ t('button.confirm') }</Button>
          </div>
      }
      {
        thanksPopup &&
          <div className='thanks-for-reply d-flex flex-column align-items-center'>
            <img src={ SuccessImage } alt="SuccessImage"/>
            <span className="thanks-for-reply__title">{ t('title.thanks-reply') }</span>
            <span className="thanks-for-reply__desc">
              { t('desc.thanks-reply') }
            </span>
            <Button onClick={closePopups}>{ t('button.close') }</Button>
          </div>
      }
    </div>
  );
};

export default EstimateBlock;