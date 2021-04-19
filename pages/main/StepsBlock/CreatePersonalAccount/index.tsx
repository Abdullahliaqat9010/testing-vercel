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
  goToPrevStepAction,
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

const CreatePersonalAccount = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>('private');
  const {auth} = useSelector((state: RootState) => state.userInfo);
  const {
    addressFromStepOne,
    additionalAddress,
    location,
    selectedProperty,
    propertyDetails,
    personalAccount,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const {accountType, selectedItem, selectedResidence, sellProperty, howSell} = personalAccount;
  const [data, setData] = useState({accountType, selectedItem, selectedResidence, sellProperty, howSell});
  const [kindOfHomeValue, setKindOfHomeValue] = useState<string>('Please select');
  const [sellPropertyValue, setSellPropertyValue] = useState<string>('Please select');
  const [howSellValue, setHowSellValue] = useState<string>('Please select');
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
      dispatch(createPropertyRequestAction({
        leadId: parseData.id,
        search_address: addressFromStepOne,
        lat: location.lat,
        lng: location.lng,
        property_type: selectedProperty,
        live_area: +propertyDetails.livingArea,
        total_area: +propertyDetails.landSurface,
        bedrooms: propertyDetails.numberBedrooms,
        bathrooms: propertyDetails.numberBathrooms,
        levels: propertyDetails.numberLevels,
        street: additionalAddress.street,
        street_number: additionalAddress.number,
        zip: additionalAddress.zip,
        locality: +additionalAddress.locality,
      }));
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
      <span className="step-title">Great job!</span>
      <h4>Estimation is ready!</h4>
      <span className="step-title">
        We finalized your estimation and personal report. You need to create an account or use existing
        account to review it.
      </span>
      <Link href={ '/login' }>
        <span className='have-account'>I already have an account<img src={ LinkArrow } alt="LinkArrow"/></span>
      </Link>
      <div className="create-personal-account__main-block">
        <div className="title-block">
          <span
            onClick={ () => switchTab('private') }
            className={ activeTab === 'private' ? 'active' : '' }
          >
            Private account
          </span>
          <span
            onClick={ () => switchTab('professional') }
            className={ activeTab === 'professional' ? 'active' : '' }
          >
            Professional account
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
                <span>Homeowner</span>
                <div className="active-item"/>
              </div>
              <div
                className={ `not-owner-block ${ activePrivateBlock === 'not-owner' ? 'active-block' : '' }` }
                onClick={ () => selectItem('not-owner') }
              >
                <img
                  src={ activePrivateBlock === 'not-owner' ? NotOwnerIconActive : NotOwnerIcon }
                  alt="NotOwnerIcon"/>
                <span>Not owner</span>
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
                    <span>{ item.name }</span>
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
                  Other
                </span>
                <div className="active-item"/>
              </div>
            </div>
        }
        {
          activePrivateBlock && activeTab === 'private' &&
          <>
            <span className="label">This home is</span>
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
                      { item.label }
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>,
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
            <span className="label">Would you like to sell property?</span>
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
                      { item.label }
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>,
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
            {
              data.sellProperty === 'started' &&
              <>
                <span className="label">How are you selling your home?</span>
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
                          { item.label }
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
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button onClick={ handleClickNextBtn } className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default CreatePersonalAccount;