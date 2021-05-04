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
  const percent = 11;
  const dispatch = useDispatch();
  const {mainProperty, currentPropertyPrice} = useSelector((state: RootState) => state.userInfo);

  const [activeBtn, setActiveBtn] = useState<string>('');
  const [priceValue, setPriceValue] = useState({
    min: null,
    max: null,
    minPerMeter: null,
    maxPerMeter: null,
  });
  const [estimationPopup, setEstimationPopup] = useState<boolean>(false);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);

  useEffect(() => {
    if (mainProperty && mainProperty.id) {
      dispatch(getPriceForPropertyAction(mainProperty.id));
    }
  }, [mainProperty]);

  useEffect(() => {
    if (currentPropertyPrice.constrValue && mainProperty.live_area) {
      const min = currentPropertyPrice.constrValue - 100 * percent;
      const max = currentPropertyPrice.constrValue + 100 * percent;

      setPriceValue({
        min: Math.ceil(min * 100)/100,
        max: Math.ceil(max * 100)/100,
        minPerMeter: Math.ceil((min / mainProperty.live_area) * 100)/100,
        maxPerMeter: Math.ceil((max / mainProperty.live_area) * 100)/100,
      });
    }
  }, [currentPropertyPrice]);

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
  };

  const closePopups = () => {
    setActiveBtn('');
    setThanksPopup(false);
  };

  const numberWithCommas = (value: string) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                <span>
                  Construction price: {
                  currentPropertyPrice.constrValue && '€' + numberWithCommas(currentPropertyPrice.constrValue.toString())
                }
                </span>
                <span className='gray'>
                  Land Price: {
                  currentPropertyPrice.landValue && '€' + numberWithCommas(currentPropertyPrice.landValue.toString())
                }
                </span>

                {/*<span>€1,097,500</span>*/ }
                {/*<span className='gray'>€1,185.250 per m²</span>*/ }
              </Tooltip>
            }
          >
            <div className="line"/>
          </OverlayTrigger>
          <div className="range d-flex justify-content-between">
            <div className="min">
              {
                priceValue.min &&
                <span>
                  €{ numberWithCommas(priceValue.min.toString()) }
                </span>
              }
              {
                priceValue.minPerMeter &&
                <span className='gray'>
                  €{ numberWithCommas(priceValue.minPerMeter.toString()) } per m²
                </span>
              }
            </div>
            <div className="max">
              {
                priceValue.max &&
                <span>
                  €{ numberWithCommas(priceValue.max.toString()) }
                </span>
              }
              {
                priceValue.maxPerMeter &&
                <span className='gray'>
                  €{ numberWithCommas(priceValue.maxPerMeter.toString()) } per m²
                </span>
              }
            </div>
          </div>
          <div className="btn-block">
            <span className='btn-block__title w-100'>{ t('title.accurate-estimation') }</span>
            <ButtonGroup size="lg" className="w-100">
              {
                estimationButtonsList.map(
                  (item, index) =>
                    <Button
                      key={ index }
                      className={ activeBtn === item.id ? 'custom-active' : '' }
                      onClick={ () => showEstimationPopup(item.id) }
                    >
                      { t(`button.${ item.id }`) }
                    </Button>,
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
            rows={ 5 }
            placeholder={ `${ t('placeholder.property-has') } ${ showTitle(t('button.' + activeBtn)) } ${ t('placeholder.price-because') }...` }
          />
          <Button onClick={ nextStepPopup } className='confirm'>{ t('button.confirm') }</Button>
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
          <Button onClick={ closePopups }>{ t('button.close') }</Button>
        </div>
      }
    </div>
  );
};

export default EstimateBlock;