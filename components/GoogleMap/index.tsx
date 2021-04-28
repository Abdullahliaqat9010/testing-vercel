import React from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { RootState } from '../../types/state';

import { googleMapStyle } from '../../config/googleMapStyle';
import { googleMapConfig } from '../../config/siteConfigs';

import MarkerIcon from '../../assets/images/marker.png';

const Marker = props => {
  return <img src={ MarkerIcon } alt='MarkerIcon' className="marker"/>;
};

interface locationProps {
  lat?: number,
  lng?: number
}

const GoogleMap = (location: locationProps) => {
  const {location: locationData} = useSelector((state: RootState) => state.stepsInfo.stepBlock);

  return (
    // Important! Always set the container height explicitly
    <div style={ {height: '100%', width: '100%'} }>
      <GoogleMapReact
        bootstrapURLKeys={ {key: googleMapConfig.apiKey} }
        defaultCenter={ {
          lat: Number(location.lat) || Number(locationData.lat),
          lng: Number(location.lng) || Number(locationData.lng),
        } }
        options={ {
          fullscreenControl: false,
          zoomControl: false,
          styles: googleMapStyle,
        } }
        defaultZoom={ 13 }
      >
        <Marker
          lat={ Number(location.lat) || Number(locationData.lat) }
          lng={ Number(location.lng) || Number(locationData.lng) }
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;