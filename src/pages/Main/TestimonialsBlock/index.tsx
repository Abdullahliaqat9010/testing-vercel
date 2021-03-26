import React from 'react';

import { Button } from 'react-bootstrap';

import LoadMoreImage from '../../../assets/images/load-more.svg';

const TestimonialsBlock = () => {
  return (
    <div className='testimonials container'>
      <h4>Testimonials</h4>
      <div className="testimonials__list">
        <div className="testimonials__item"/>
        <div className="testimonials__item"/>
        <div className="testimonials__item"/>
        <div className="testimonials__item"/>
        <div className="testimonials__item"/>
        <div className="testimonials__item"/>
        <Button className='load-more'>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>Load More
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsBlock;