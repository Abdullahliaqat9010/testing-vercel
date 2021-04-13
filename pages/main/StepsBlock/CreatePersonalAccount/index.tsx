import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

import { RootState } from '../../../../types/state';

import { createPersonalAccountAction, goToNextStepAction, goToPrevStepAction } from '../../../../actions';

import IconBack from '../../../../assets/images/long-arrow.svg';
import LinkArrow from '../../../../assets/images/arrow-blue.svg';
import HomeownerIcon from '../../../../assets/images/home-noactive.svg';
import HomeownerIconActive from '../../../../assets/images/home-active.svg';
import NotOwnerIcon from '../../../../assets/images/user-noactive.svg';
import NotOwnerIconActive from '../../../../assets/images/user-active.svg';
import CheckedIcon from '../../../../assets/images/valid-blue.svg';

import { professionalAccountList } from '../../../../templates/professionalAccountList';

const CreatePersonalAccount = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>('private');
  const {
    accountType,
    selectedItem,
    selectedResidence,
    sellProperty,
    howSell
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.personalAccount);
  const [data, setData] = useState({
    accountType,
    selectedItem,
    selectedResidence,
    sellProperty,
    howSell
  });
  const [kindOfHomeValue, setKindOfHomeValue] = useState<string>('Please select');
  const [sellPropertyValue, setSellPropertyValue] = useState<string>('Please select');
  const [howSellValue, setHowSellValue] = useState<string>('Please select');
  const [activePrivateBlock, setActivePrivateBlock] = useState<string | boolean>(false);

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    dispatch(createPersonalAccountAction(data));
    dispatch(goToNextStepAction());
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
                <span>Other</span>
                <div className="active-item"/>
              </div>
            </div>
        }
        {
          activePrivateBlock === 'homeowner' && activeTab === 'private' &&
          <>
            <span className="label">What kind of home do you own?</span>
            <Dropdown>
              <Dropdown.Toggle>
                { kindOfHomeValue }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  className={ data.selectedResidence === 'principal' ? 'active' : '' }
                  name='principal'
                  onClick={ handleSelectResidence }
                >
                  Principal residence
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  className={ data.selectedResidence === 'secondary' ? 'active' : '' }
                  name='secondary'
                  onClick={ handleSelectResidence }
                >
                  Secondary residence
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  className={ data.selectedResidence === 'rental' ? 'active' : '' }
                  name='rental'
                  onClick={ handleSelectResidence }
                >
                  Rental residence
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  className={ data.selectedResidence === 'other' ? 'active' : '' }
                  name='other'
                  onClick={ handleSelectResidence }
                >
                  Other
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="label">Would you like to sell property?</span>
            <Dropdown>
              <Dropdown.Toggle>
                { sellPropertyValue }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  name='started'
                  className={ data.sellProperty === 'started' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  Yes, I have already started selling.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='possible'
                  className={ data.sellProperty === 'possible' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  Yes, as fast as possible.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='three-month'
                  className={ data.sellProperty === 'three-month' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  Yes, within this and 3 months.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='six-month'
                  className={ data.sellProperty === 'six-month' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  Yes, within this and 6 months.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='six-month-more'
                  className={ data.sellProperty === 'six-month-more' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  Yes, more then 6 months.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='curious'
                  className={ data.sellProperty === 'curious' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  No, I'm just curious.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
                <Dropdown.Item
                  name='bought'
                  className={ data.sellProperty === 'bought' ? 'active' : '' }
                  onClick={ handleSelectSellProperty }
                >
                  No, I have just bought this home.
                  <img src={ CheckedIcon } alt="CheckedIcon"/>
                </Dropdown.Item>
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
                    <Dropdown.Item
                      name='agency'
                      className={ data.howSell === 'agency' ? 'active' : '' }
                      onClick={ handleSetHowSell }
                    >
                      With an agency
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>
                    <Dropdown.Item
                      name='myself'
                      className={ data.howSell === 'myself' ? 'active' : '' }
                      onClick={ handleSetHowSell }
                    >
                      By myself
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>
                    <Dropdown.Item
                      name='both'
                      className={ data.howSell === 'both' ? 'active' : '' }
                      onClick={ handleSetHowSell }
                    >
                      Both
                      <img src={ CheckedIcon } alt="CheckedIcon"/>
                    </Dropdown.Item>
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