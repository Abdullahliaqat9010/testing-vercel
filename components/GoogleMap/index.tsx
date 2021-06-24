import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { RootState } from '../../types/state';

import { googleMapStyle } from '../../config/googleMapStyle';
import { googleMapConfig } from '../../config/siteConfigs';

import MarkerHomeIcon from '../../assets/images/marker.svg';
import MarkerAgencyIcon from '../../assets/images/marker-agency.svg';
import MarkerPropertyIcon from '../../assets/images/similar-property-marker.svg';
import MarkerPropertyActiveIcon from '../../assets/images/similar-property-marker-active.svg';
import { setActivePropertyFromMapAction } from '../../actions';

interface GoogleMapProps {
  google?: any,
  agencyLocation?: {
    lat?: number | string,
    lng?: number | string,
  },
  agencyName?: string
}

const GoogleMap = ({google, agencyLocation, agencyName}: GoogleMapProps) => {
  const dispatch = useDispatch();
  const {location} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const {agencySimilarPropertiesList} = useSelector((state: RootState) => state.agency);
  const [similarProperties] = agencySimilarPropertiesList.filter(list => list.name === agencyName);
  const {similarPropertiesLocation, mainProperty} = useSelector((state: RootState) => state.userInfo);
  const [useLocation, setUseLocation] = useState({lat: null, lng: null});

  useEffect(() => {
    if (location.lng && location.lat) {
      setUseLocation({
        lat: location.lat,
        lng: location.lng,
      });
    }

    if (mainProperty.lng && mainProperty.lat) {
      setUseLocation({
        lat: mainProperty.lat,
        lng: mainProperty.lng,
      });
    }
  }, [location, mainProperty, agencyLocation]);

  const setActiveMarker = (propertyId) => {
    if (propertyId) {
      dispatch(setActivePropertyFromMapAction(propertyId));
    }
    return;
  };

  const RenderMarkers = () => {
    if (!agencyLocation && similarPropertiesLocation.length && mainProperty) {
      const markerList = [...similarPropertiesLocation,
        {
          mainProperty: true,
          activeOnMap: false,
          lat: mainProperty.lat,
          lng: mainProperty.lng,
        }];

      return markerList.map((property, index) =>
        <Marker
          key={ index }
          icon={ property.mainProperty
            ? MarkerHomeIcon : property.activeOnMap
              ? MarkerPropertyActiveIcon : MarkerPropertyIcon
          }
          onClick={ () => setActiveMarker(property.id) }
          position={ {
            lat: property.lat,
            lng: property.lng,
          } }
        />,
      );
    }

    if(agencyLocation && mainProperty.lat && mainProperty.lng) {
      const markerList = [
        {
          agencyMarker: false,
          similar: false,
          lat: mainProperty.lat,
          lng: mainProperty.lng,
        },
        {
          agencyMarker: true,
          similar: false,
          lat: agencyLocation.lat,
          lng: agencyLocation.lng,
        }
      ]

      if (similarProperties && similarProperties.estates.length > 0) {
        similarProperties.estates.map(estate => markerList.push({
          agencyMarker: false,
          similar: true,
          lat: estate.lat,
          lng: estate.lng
        }));
      }

      return markerList.map((property, index) =>
        <Marker
          key={ index }
          icon={ property.agencyMarker ? MarkerAgencyIcon : property.similar ? MarkerPropertyIcon : MarkerHomeIcon }
          position={ {
            lat: property.lat,
            lng: property.lng,
          } }
        />,
      );
    }

    return <Marker
      icon={  agencyLocation ? MarkerAgencyIcon : MarkerHomeIcon }
      position={
        {
          lat: useLocation.lat || 51.260197,
          lng: useLocation.lng || 4.402771,
        }
      }
    />;
  };

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
        RenderMarkers()
      }
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: (googleMapConfig.apiKey),
})(GoogleMap);