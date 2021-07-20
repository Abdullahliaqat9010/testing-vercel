import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { Button, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { RootState } from '../../../../types/state';

import { parseJwt } from '../../../../utils';
import { generatePropertyData } from '../../../../utils/generatePropertyData';

import {
  createPersonalAccountAction,
  createPropertyRequestAction
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

import { userToken } from '../../../../config/siteConfigs';

const CreatePersonalAccount = ({handleSwitchSteps}: any) => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('private');
  const {auth} = useSelector((state: RootState) => state.userInfo);

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleClickPrevBtn = () => {
    router.back();
  };

  const goToLogin = () => {
    if (!auth) {
      router.push('/login');
    } else {
      const parseData = parseJwt(userToken);
      const sendData = {
        leadId: parseData.id,
        owner: Boolean(activePrivateBlock === 'homeowner'),
        interest: 'asap',
        selling_way: String(data.howSell).length ? String(data.howSell) : undefined,
        residence_type: 'other',
        ...generatePropertyData(
          addressFromStepOne,
          additionalAddress,
          selectedProperty,
          propertyDetails,
          details,
          utilities,
          location)
      };
      dispatch(createPropertyRequestAction({...sendData}));
    }
  }

  const disabledBtn = () => {
    if (data.accountType === 'private') {
      return data?.sellProperty?.length === 0 || data.selectedResidence?.length === 0 || data?.selectedItem?.length === 0;
    }
    return data.selectedItem.length === 0;
  }

  const handleClickNextBtn = () => {
    if (!auth) {
      dispatch(createPersonalAccountAction(data));
      handleSwitchSteps();
    } else {
      const parseData = parseJwt(userToken);
      const sendData = {
        leadId: parseData.id,
        owner: Boolean(activePrivateBlock === 'homeowner'),
        interest: data.accountType === 'professional' ? 'asap' : String(data.sellProperty),
        selling_way: String(data.howSell).length ? String(data.howSell) : undefined,
        residence_type: data.accountType === 'professional' ? 'other' : String(data.selectedResidence),
        ...generatePropertyData(
          addressFromStepOne,
          additionalAddress,
          selectedProperty,
          propertyDetails,
          details,
          utilities,
          location)
      };
      dispatch(createPropertyRequestAction({...sendData}));
    }
  };

  const handleSelectResidence = (el) => {
    //console.log(el.target.name)
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
      <span onClick={goToLogin} className='have-account'>
        { t('link.already-have-account') }<img src={ LinkArrow } alt="LinkArrow"/>
      </span>
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
            <div className="first-dd">
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
            </div>
            <div className="second-dd">
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
            </div>
            {
              data.sellProperty === 'in_process' &&
              <div className='third-dd'>
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
              </div>
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
        <Button
          disabled={disabledBtn()}
          onClick={ handleClickNextBtn }
          className='next-step'
        >
          { t('button.next') }
        </Button>
      </div>
    </div>
  );
};

export default CreatePersonalAccount;