import React from 'react';

import { googleMapStyle } from '../../config/googleMapStyle';
import { googleMapConfig } from '../../config/siteConfigs';

import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapConfig.apiKey }}
        defaultCenter={{
          lat: 40.7510674,
          lng: -74.1660403
        }}
        options={{
          fullscreenControl: false,
          zoomControl: false,
          styles: googleMapStyle
        }}
        defaultZoom={13}
      >
        {/*<AnyReactComponent*/}
        {/*  lat={59.955413}*/}
        {/*  lng={30.337844}*/}
        {/*  text="My Marker"*/}
        {/*/>*/}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;