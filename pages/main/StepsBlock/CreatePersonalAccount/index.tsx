import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

import { RootState } from '../../../../types/state';

import {
  createPersonalAccountAction,
  createPropertyRequestAction,
  goToNextStepAction,
  goToPrevStepAction, updatePropertyRequestAction,
} from '../../../../actions';

import IconBack from '../../../../assets/images/long-arrow.svg';
import LinkArrow from '../../../../assets/images/arrow-blue.svg';
import HomeownerIcon from '../../../../assets/images/home-noactive.svg';
import HomeownerIconActive from '../../../../assets/images/home-active.svg';
import NotOwnerIcon from '../../../../assets/images/user-noactive.svg';
import NotOwnerIconActive from '../../../../assets/images/user-active.svg';
import CheckedIcon from '../../../../assets/images/valid-blue.svg';
import Other from '../../../../assets/images/steps/professional-account/other-inactive.svg';
import OtherActive from '../../../../assets/images/steps/professional-account/other-active.svg';

import { professionalAccountList } from '../../../../templates/professionalAccountList';
import { residenceSelect } from '../../../../templates/residenceSelect';
import { sellPropertySelect } from '../../../../templates/sellPropertySelect';
import { howSellSelect } from '../../../../templates/howSellSelect';
import { parseJwt } from '../../../../utils';
import { userToken } from '../../../../config/siteConfigs';
import { useTranslation } from 'next-i18next';

const CreatePersonalAccount = () => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>('private');
  const {auth} = useSelector((state: RootState) => state.userInfo);
  const {propertyId} = useSelector((state: RootState) => state.stepsInfo);
  const {
    addressFromStepOne,
    additionalAddress,
    location,
    selectedProperty,
    propertyDetails,
    personalAccount,
    details,
    utilities,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const {accountType, selectedItem, selectedResidence, sellProperty, howSell} = personalAccount;
  const [data, setData] = useState({accountType, selectedItem, selectedResidence, sellProperty, howSell});
  const [kindOfHomeValue, setKindOfHomeValue] = useState<string>(t('placeholder.please-select'));
  const [sellPropertyValue, setSellPropertyValue] = useState<string>(t('placeholder.please-select'));
  const [howSellValue, setHowSellValue] = useState<string>(t('placeholder.please-select'));
  const [activePrivateBlock, setActivePrivateBlock] = useState<string | boolean>(false);

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    if (!auth) {
      dispatch(createPersonalAccountAction(data));
      dispatch(goToNextStepAction());
    } else {
      const parseData = parseJwt(userToken);
      const sendData = {
        leadId: parseData.id,
        search_address: String(addressFromStepOne),
        country: String(additionalAddress.country),
        street: String(additionalAddress.street),
        street_number: String(additionalAddress.number),
        zip: String(additionalAddress.zip),
        locality: String(additionalAddress.locality),
        property_type: String(selectedProperty),
        live_area: Number(propertyDetails.livingArea),
        total_area: Number(propertyDetails.landSurface),
        bedrooms: Number(propertyDetails.numberBedrooms),
        bathrooms: Number(propertyDetails.numberBathrooms),
        floor: Number(propertyDetails.numberLevels),
        // levels: Number(),   //number of floors
        prestige: String(details.prestige),
        facades: Number(propertyDetails.facadesNumber),
        construction_year: Number(details.constructionYear),
        renov_year: details.renovated ? Number(details.renovationYear) : undefined,
        renov_level: details.renovated ? Number(details.renovationLevel) : undefined,
        epc: Number(utilities.epc),
        view: String(utilities.view),
        orientation_terras: String(utilities.orientation),
        attic: Number(utilities.atticValue),
        cellar: Number(utilities.cellarValue),
        elevator: Boolean(utilities.elevator),
        pool: Boolean(utilities.swimmingPool),
        indoor_garage: Number(utilities.indoorGarage),
        outdoor_garage: Number(utilities.outdoorGarage),
        carport: Number(utilities.carport),
        solar_panels: Number(utilities.solarPanels),
        owner: Boolean(activePrivateBlock === 'homeowner'),
        interest: String(data.sellProperty),
        selling_way: String(data.howSell),
        state: String(details.condition),
        source: 'immoBelgium',
        status: 'for_sale',
        residence_type: String(data.selectedResidence),
        lat: location.lat,
        lng: location.lng,
      };
      if (propertyId) {
        dispatch(updatePropertyRequestAction({...sendData}, propertyId));
      } else {
        dispatch(createPropertyRequestAction({...sendData}));
      }
    }
  };

  const handleSelectResidence = (el) => {
    setKindOfHomeValue(el.target.text);
    setData({
      ...data,
      selectedResidence: el.target.name,
    });
  };

  const handleSelectSellProperty = (el) => {
    setSellPropertyValue(el.target.text);
    setData({
      ...data,
      sellProperty: el.target.name,
    });
  };

  const handleSetHowSell = (el) => {
    setHowSellValue(el.target.text);
    setData({
      ...data,
      howSell: el.target.name,
    });
  };

  const selectItem = (name: string) => {
    setActivePrivateBlock(name);
    setData({
      ...data,
      selectedItem: name,
    });
  };

  const switchTab = (name: string) => {
    setActiveTab(name);
    setData({
      ...data,
      accountType: name,
    });
  };

  return (
    <div className='create-personal-account'>
      <span className="step-title">{ t('title.great-job') }</span>
      <h4>{ t('title.estimation-ready') }</h4>
      <span className="step-title">
       { t('desc.finalized-estimation') }
      </span>
      <Link href={ '/login' }>
        <span className='have-account'>{ t('link.already-have-account') }<img src={ LinkArrow } alt="LinkArrow"/></span>
      </Link>
      <div className="create-personal-account__main-block">
        <div className="title-block">
          <span
            onClick={ () => switchTab('private') }
            className={ activeTab === 'private' ? 'active' : '' }
          >
            { t('label.private-account') }
          </span>
          <span
            onClick={ () => switchTab('professional') }
            className={ activeTab === 'professional' ? 'active' : '' }
          >
            { t('label.professional-account') }
          </span>
        </div>
        {
          activeTab === 'private'
            ?
            <div className="switch-block">
              <div
                className={ `homeowner-block ${ activePrivateBlock === 'homeowner' ? 'active-block' : '' }` }
                onClick={ () => selectItem('homeowner') }
              >
                <img
                  src={ activePrivateBlock === 'homeowner' ? HomeownerIconActive : HomeownerIcon }
                  alt="HomeownerIcon"
                />
                <span>{ t('select.homeowner') }</span>
                <div className="active-item"/>
              </div>
              <div
                className={ `not-owner-block ${ activePrivateBlock === 'not-owner' ? 'active-block' : '' }` }
                onClick={ () => selectItem('not-owner') }
              >
                <img
                  src={ activePrivateBlock === 'not-owner' ? NotOwnerIconActive : NotOwnerIcon }
                  alt="NotOwnerIcon"/>
                <span>{ t('select.not-owner') }</span>
                <div className="active-item"/>
              </div>
            </div>
            :
            <div className="switch-block professional">
              {
                professionalAccountList.map((item, index) => (
                  <div
                    key={ index }
                    className={ `professional-account ${ activePrivateBlock === item.name ? 'active-block' : '' }` }
                    onClick={ () => selectItem(item.name) }
                  >
                    <img
                      src={ activePrivateBlock === item.name ? item.activeImg : item.img }
                      alt={ item.name }
                    />
                    <span>{ t(`select.${ item.tag }`) }</span>
                    <div className="active-item"/>
                  </div>
                ))
              }
              <div
                className={ `professional-account other ${ activePrivateBlock === 'other' ? 'active-block' : '' }` }
                onClick={ () => selectItem('other') }
              >
                <span>
                  {
                    isMobile && <img src={ activePrivateBlock === 'other' ? OtherActive : Other } alt="other"/>
                  }
                  { t('select.other') }
                </span>
                <div className="active-item"/>
              </div>
            </div>
        }
        {
          activePrivateBlock && activeTab === 'private' &&
          <>
            <span className="label">{ t('label.kind-of-home') }</span>
            <Dropdown>
              <Dropdown.Toggle>
                { kindOfHomeValue }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  residenceSelect.map((item, index) =>
                    <Dropdown.Item
                      key={ index }
                      className={ data.selectedResidence === item.name ? 'active' : '' }
                      name={ item.name }
                      onClick={ handleSelectResidence }
                    >
                      { t(`li.${ item.name }`) }
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>,
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
            <span className="label">{ t('label.would-you-like') }</span>
            <Dropdown>
              <Dropdown.Toggle>
                { sellPropertyValue }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  sellPropertySelect.map((item, index) =>
                    <Dropdown.Item
                      key={ index }
                      name={ item.name }
                      className={ data.sellProperty === item.name ? 'active' : '' }
                      onClick={ handleSelectSellProperty }
                    >
                      { t(`li.${ item.name }`) }
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>,
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
            {
              data.sellProperty === 'in_process' &&
              <>
                <span className="label">{ t('label.how-you-sell') }</span>
                <Dropdown>
                  <Dropdown.Toggle>
                    { howSellValue }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      howSellSelect.map((item, index) =>
                        <Dropdown.Item
                          key={ index }
                          name={ item.name }
                          className={ data.howSell === item.name ? 'active' : '' }
                          onClick={ handleSetHowSell }
                        >
                          { t(`li.${ item.name }`) }
                          <img src={ CheckedIcon } alt="CheckedIcon"/>
                        </Dropdown.Item>,
                      )
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </>
            }
          </>
        }
      </div>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>{ t('button.back') }
        </Button>
        <Button onClick={ handleClickNextBtn } className='next-step'>{ t('button.next') }</Button>
      </div>
    </div>
  );
};

export default CreatePersonalAccount;