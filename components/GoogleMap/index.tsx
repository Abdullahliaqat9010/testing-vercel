import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { RootState } from '../../types/state';

import { googleMapStyle } from '../../config/googleMapStyle';
import { googleMapConfig } from '../../config/siteConfigs';

import MarkerIcon from '../../assets/images/marker.png';

interface GoogleMapProps {
  google?: any,
  agencyLocation?: {
    lat?: number | string,
    lng?: number | string,
  }
}
const GoogleMap = ({google, agencyLocation}: GoogleMapProps) => {
  const {location} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const {similarPropertiesLocation, mainProperty} = useSelector((state: RootState) => state.userInfo);
  const [useLocation, setUseLocation] = useState({lat: null, lng: null});

  useEffect(() => {
    if (location.lng && location.lat) {
      setUseLocation({
        lat: location.lat,
        lng: location.lng
      })
    }

    if (mainProperty.lng && mainProperty.lat) {
      setUseLocation({
        lat: mainProperty.lat,
        lng: mainProperty.lng
      })
    }

    if (agencyLocation) {
      setUseLocation({
        lat: agencyLocation.lat,
        lng: agencyLocation.lng
      })
    }
  }, [location, mainProperty, agencyLocation]);

  return (
    <Map
      fullscreenControl={ false }
      zoomControl={ false }
      mapTypeControl={ false }
      streetViewControl={ false }
      styles={ googleMapStyle }
      zoom={ similarPropertiesLocation.length ? 11 : 13 }
      google={ google }
      initialCenter={ {
        lat: useLocation.lat || 51.260197,
        lng: useLocation.lng || 4.402771,
      } }
      center={ {
        lat: useLocation.lat,
        lng: useLocation.lng,
      } }
    >

      {
        !agencyLocation && similarPropertiesLocation.length ? similarPropertiesLocation.map((property, index) =>
            <Marker
              key={ index }
              icon={ MarkerIcon }
              position={ {
                lat: property.lat,
                lng: property.lng,
              } }
            />,
          ) :
          <Marker
            icon={ MarkerIcon }
            position={ {
              lat: useLocation.lat || 51.260197,
              lng: useLocation.lng || 4.402771,
            } }
          />
      }
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: (googleMapConfig.apiKey),
})(GoogleMap);