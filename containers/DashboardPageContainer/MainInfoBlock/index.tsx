import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { RootState } from '../../../types/state';

import arrowIcon from '../../../assets/images/arrow-blue.svg';
import squareIcon from '../../../assets/images/square.svg';
import bedsIcon from '../../../assets/images/beds.svg';
import bathIcon from '../../../assets/images/bath.svg';
// import { goToModifyPropertyAction } from '../../../actions';

const MainInfoBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const {mainProperty} = useSelector((state: RootState) => state.userInfo);

  const modifyProperty = () => {
    // const propertyObjectForModify = {
    //   mainBlocks: true,
    //   stepBlock: {
    //     step: 1,
    //     addressFromStepOne: mainProperty.search_address,
    //     additionalAddress: {
    //       street: mainProperty.street,
    //       number: mainProperty.street_number,
    //       zip: mainProperty.zip,
    //       locality: mainProperty.locality,
    //       country: mainProperty.country,
    //     },
    //     selectedProperty: mainProperty.property_type,
    //     propertyDetails: {
    //       livingArea: mainProperty.live_area,
    //       landSurface: mainProperty.total_area,
    //       facadesNumber: mainProperty.facades,
    //       numberBedrooms: mainProperty.bedrooms,
    //       numberBathrooms: mainProperty.bathrooms,
    //       numberLevels: mainProperty.floor,
    //       // gardenTerras: false,
    //       // gardenTerrasValue: '0',
    //       elevator: mainProperty.elevator,
    //     },
    //     details: {
    //       prestige: mainProperty.prestige,
    //       condition: mainProperty.state,
    //       constructionYear: mainProperty.construction_year,
    //       renovated: mainProperty.renov_year ? 1 : 0,
    //       renovationYear: mainProperty.renov_year,
    //       renovationLevel: mainProperty.renov_level,
    //       // numberFloors: 1,
    //     },
    //     utilities: {
    //       epc: mainProperty.epc,
    //       view: mainProperty.view,
    //       orientation: mainProperty.orientation_terras,
    //       atticValue: mainProperty.attic,
    //       cellarValue: mainProperty.cellar,
    //       elevator: mainProperty.elevator,
    //       swimmingPool: mainProperty.pool,
    //       indoorGarage: mainProperty.indoor_garage,
    //       // indoorGarageCheck: false,
    //       outdoorGarage: mainProperty.outdoor_garage,
    //       // outdoorGarageCheck: false,
    //       carport: mainProperty.carport,
    //       // carportCheck: false,
    //       // parking: false,
    //       solarPanels: mainProperty.solar_panels,
    //     },
    //     personalAccount: {
    //       // accountType: 'private',
    //       // selectedItem: '',
    //       selectedResidence: mainProperty.residence_type,
    //       sellProperty: mainProperty.interest,
    //       howSell: mainProperty.selling_way,
    //     },
    //     location: {
    //       lat: mainProperty.lat,
    //       lng: mainProperty.lng
    //     },
    //   },
    // }
    // dispatch(goToModifyPropertyAction(propertyObjectForModify));
  };

  return (
    <div className='main-info-block'>
      <div className="top-block d-flex align-items-center justify-content-between">
        <h4>{ mainProperty?.search_address }</h4>
        <span className='d-flex align-items-center' onClick={ modifyProperty }>
          { t('link.modify') } <img src={ arrowIcon } alt="arrowIcon"/>
        </span>
      </div>
      <div className="bottom-block d-flex">
        <div className="image-block d-flex">
          <img src={ squareIcon } alt="squareIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.square') }</span>
            <span className="desc">{ mainProperty?.live_area }m²</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bedsIcon } alt="bedsIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.beds') }</span>
            <span className="desc">{ mainProperty?.bedrooms }</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bathIcon } alt="bathIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.baths') }</span>
            <span className="desc">{ mainProperty?.bathrooms }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlock;