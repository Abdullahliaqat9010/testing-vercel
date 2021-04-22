import React from 'react';
import Link from 'next/link';

// import StarRatingComponent from 'react-star-rating-component';

import ContactAgencyBlock from '../../components/ContactAgencyBlock';
import HeaderContainer from '../../containers/Header';
import FooterContainer from '../../containers/Footer';

import ArrowImage from '../../assets/images/arrow-blue.svg';
import BGImage from '../../assets/images/bg-agency.png';
// import RatingStar from '../../assets/images/rating/full-star.svg';
// import RatingStarEmpty from '../../assets/images/rating/star.svg';


const AgencyPage = () => {
  return (
    <>
      <HeaderContainer title='Agency Info' />
      <div className='Agency container'>
        <Link href={ '/dashboard' }>
          <span className='Agency__back'><img src={ArrowImage} alt="ArrowImage"/> Back to dashboard</span>
        </Link>
        <div className="Agency__block">
          <div className="main-content">
            <div className="agency-info">
              <img src={ BGImage } alt="BGImage"/>
              {/*<div className="agency-info__block">*/}
              {/*  <span className="agency-name">Century 21 - PATRIMOINE 24</span>*/}
              {/*  <div className="rating-block d-flex align-items-center">*/}
              {/*    <span className='total'>5.0</span>*/}
              {/*    <StarRatingComponent*/}
              {/*      name="rate"*/}
              {/*      renderStarIcon={*/}
              {/*        (index, value) =>*/}
              {/*          <img*/}
              {/*          className='rating-star'*/}
              {/*          src={ index <= value ? RatingStar : RatingStarEmpty }*/}
              {/*          alt="RatingStar"*/}
              {/*          />*/}
              {/*        }*/}
              {/*      starCount={ 5 }*/}
              {/*      value={ 5 }*/}
              {/*    />*/}
              {/*    <span className="from">from 120 reviews</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <ContactAgencyBlock />
        </div>
      </div>
      <FooterContainer />
    </>
  )
}

export default AgencyPage;