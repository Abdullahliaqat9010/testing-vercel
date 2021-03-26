import React from 'react';

import { Button } from 'react-bootstrap';

import GoogleMap from '../../../components/GoogleMap';
import PropertyBlock from '../../../containers/Property';

import LoadMoreImage from '../../../assets/images/load-more.svg';
import { propertiesList } from '../../../templates/propertiesList';

const PropertiesBlock = () => {
  return (
    <div className='properties-block d-flex'>
      <div className="map-block w-50">
        <GoogleMap />
      </div>
      <div className="properties-list w-50">
        <h5>Similar Sold Properties</h5>
        <p>We found 1,205 similar sold properties in this area.</p>
        {
          propertiesList.map(
            (item, index) =>
              <PropertyBlock key={index} property={item} />
              )
        }
        <Button className='load-more'>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>Load More
        </Button>
      </div>
    </div>
  );
};

export default PropertiesBlock;