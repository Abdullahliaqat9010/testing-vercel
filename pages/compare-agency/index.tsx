import React, { useState, useEffect } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";
import Link from "next/link";
import {
  Button,
  InputGroup,
  FormControl,
  Carousel,
  ListGroup,
} from "react-bootstrap";
import goAhead from "../../assets/images/compare-agency/go-ahead.svg";
import reviewImage from "../../assets/images/compare-agency/reviews-image.png";
import locationImage from "../../assets/images/compare-agency/location-image.png";
import homeImage from "../../assets/images/compare-agency/home-image.png";
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg";
import StarRatingComponent from "react-star-rating-component";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import HomeownerIcon from "../../assets/images/home-noactive.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAutocompleteItemsAction,
  clearAutocompleteItems,
} from "../../actions";
import { RootState } from "../../types/state";

const compareAgency = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { locale } = router;
  const [value, setValue] = useState("");
  const [dataInfo, setData] = useState({});
  const { dataFromMapBox } = useSelector((state: RootState) => state.stepsInfo);

  useEffect(() => {
    dispatch(clearAutocompleteItems());
  }, []);

  const gotoAgenciesPages = () => {
    router.push({
      pathname: locale + "/agency-result",
    });
  };
  const handleAutocomplete = (el: React.ChangeEvent<HTMLInputElement>) => {
    setValue(el.target.value);
    if (el.target.value.length > 0) {
      dispatch(getAutocompleteItemsAction(el.target.value, el.target.name));
    } else {
      dispatch(clearAutocompleteItems());
    }
  };

  const handleSelectAddress = (addressId: string) => {
    const [currentAddress] = dataFromMapBox.filter(
      (list) => list.id === addressId
    );
    setValue(currentAddress.fullAddress);

    const dataForNextStep = {
      locality:
        currentAddress.locality.length > 1
          ? currentAddress.locality
          : currentAddress.place,
      number: currentAddress.number,
      street: currentAddress.street,
      zip: currentAddress.postcode,
      country: currentAddress.country,
    };

    localStorage.setItem("address", JSON.stringify(dataForNextStep));

    setData({ ...dataForNextStep });
    dispatch(clearAutocompleteItems());
  };

  return (
    <>
      <HeaderContainer title="compare agency" />
      <div className="w-100 compare-agency">
        <div className="imageContanter d-flex">
          <img
            className="main-image"
            src={compareAgencyImage}
            alt="compareAgencyImage"
          />
        </div>
        {/* <div className="search-area">
          <p>
            {" "}
            <span>
              {" "}
              Compare Real Estate <br></br>Agencies in your neighbourhood.
            </span>
          </p>
          <p>
            We analyze thousands of local agents and find <br></br>the best to
            compete you!
          </p>
          <div className="search-form d-flex">
            <input type="search" placeholder="City and State or ZIP"></input>
            <Button onClick={gotoAgenciesPages}>
              Compare Agents <img src={goAhead} alt="goAhead" />
            </Button>
          </div>
        </div> */}
        <div className="search-area">
          <p>
            {" "}
            <span>
              {" "}
              Compare Real Estate <br></br>Agencies in your neighbourhood.
            </span>
          </p>
          <p>
            We analyze thousands of local agents and find <br></br>the best to
            compete you!
          </p>
          <div className="search-form d-flex">
            <div className="d-flex flex-collumn">
              <InputGroup>
                <FormControl
                  placeholder="  City and State or ZIP"
                  name="address"
                  onChange={handleAutocomplete}
                  value={value}
                  autoComplete="off"
                />
              </InputGroup>
              {dataFromMapBox.length > 0 && (
                <ListGroup
                  as="ul"
                  className="position-absolute"
                  style={{ marginTop: "45px", width: "288px" }}
                >
                  {dataFromMapBox.map((item, index) => (
                    <ListGroup.Item
                      className="text-dark"
                      as="li"
                      onClick={() => handleSelectAddress(item.id)}
                      key={index}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.fullAddress}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
            {/* <input type='search' onChange={(e) => onChange(e.target)} placeholder="City and State or ZIP" ></input> */}
            <Button onClick={gotoAgenciesPages}>
              Compare Agents <img src={goAhead} alt="goAhead" />
            </Button>
          </div>
        </div>

        <div className=" cards-container d-flex justify-content-center ">
          <div className="card text-center " style={{ border: "none" }}>
            <div className="card-body image-setting ">
              <div>
                <img src={reviewImage} alt="reviewImage" />
              </div>
              <div>
                <p>
                  {" "}
                  <span>
                    {" "}
                    Read reviews from <br></br> previous customers{" "}
                  </span>{" "}
                </p>
                <p>Lorem ipsum dolor sit amet, cons</p>
              </div>
            </div>
          </div>
          <div className="card text-center" style={{ border: "none" }}>
            <div className="card-body image-setting">
              <div>
                <img src={locationImage} alt="reviewImage" />
              </div>
              <div>
                <p>
                  {" "}
                  <span>
                    {" "}
                    View the agencies <br></br> nearest to you{" "}
                  </span>{" "}
                </p>
                <p>Lorem ipsum dolor sit amet, cons</p>
              </div>
            </div>
          </div>
          <div className="card text-center" style={{ border: "none" }}>
            <div className="card-body image-setting">
              <div>
                <img src={homeImage} alt="reviewImage" />
              </div>
              <div>
                <p>
                  {" "}
                  <span>
                    {" "}
                    Compare similar houses <br></br> that they sold{" "}
                  </span>{" "}
                </p>
                <p>Lorem ipsum dolor sit amet, cons</p>
              </div>
            </div>
          </div>
        </div>
        <div className="top-agencys d-flex">
          <div className="d-flex top-agencies-view">
            <div className="agency-card ">
              <img
                className="profile-image"
                src={homeImage}
                alt="reviewImage"
              />
              <h3>
                {" "}
                <b>Compare similar </b>{" "}
              </h3>
              <span className="agent-title">
                Real estate agency name goes here
              </span>
              <StarRatingComponent
                name="rate"
                renderStarIcon={(index, value) => (
                  <img
                    className="rating-star"
                    src={index <= value ? RatingStar : RatingStarEmpty}
                    alt={"RatingStar" + index}
                  />
                )}
                starCount={5}
                value={Number(4)}
              />
              <div className=" percentage-description-block d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <b>2.5%</b>
                  <span>Listing Agent Commission</span>
                </div>

                <img src={HomeownerIcon} alt="HomeownerIcon" />
              </div>
              <div className=" sales-description-block d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <b>€2,400</b>
                  <span>Est. Commission Savings</span>
                </div>
                <img src={HomeownerIcon} alt="HomeownerIcon" />
              </div>
            </div>

            <div className="agency-card ">
              <img
                className="profile-image"
                src={homeImage}
                alt="reviewImage"
              />
              <h3>
                {" "}
                <b>Compare similar </b>{" "}
              </h3>
              <span className="agent-title">
                Real estate agency name goes here
              </span>
              <StarRatingComponent
                name="rate"
                renderStarIcon={(index, value) => (
                  <img
                    className="rating-star"
                    src={index <= value ? RatingStar : RatingStarEmpty}
                    alt={"RatingStar" + index}
                  />
                )}
                starCount={5}
                value={Number(4)}
              />
              <div className=" percentage-description-block d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <b>2.5%</b>
                  <span>Listing Agent Commission</span>
                </div>
                <img src={HomeownerIcon} alt="HomeownerIcon" />
              </div>
              <div className=" sales-description-block d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <b>€2,400</b>
                  <span>Est. Commission Savings</span>
                </div>
                <img src={HomeownerIcon} alt="HomeownerIcon" />
              </div>
            </div>
            {/*
                        <div className="agency-card ">
                            <img className="profile-image" src={homeImage} alt="reviewImage" />
                            <h3> <b>Compare similar </b> </h3>
                            <span className="agent-title">Real estate agency name goes here</span>
                            <StarRatingComponent
                                name="rate"
                                renderStarIcon={
                                    (index, value) =>
                                        <img
                                            className='rating-star'
                                            src={index <= value ? RatingStar : RatingStarEmpty}
                                            alt={'RatingStar' + index}
                                        />
                                }
                                starCount={5}
                                value={Number(4)}
                            />
                            <div className=" percentage-description-block d-flex flex-row justify-content-between">
                                <div className="d-flex flex-column">
                                    <b>2.5%</b>
                                    <span>Listing Agent Commission</span>
                                </div>
                                <img src={HomeownerIcon} alt="HomeownerIcon" />
                            </div>
                            <div className=" sales-description-block d-flex flex-row justify-content-between">
                                <div className="d-flex flex-column">
                                    <b>€2,400</b>
                                    <span>Est. Commission Savings</span>
                                </div>
                                <img src={HomeownerIcon} alt="HomeownerIcon" />
                            </div>
                        </div> */}
          </div>
          <div className="compare-top-agency">
            <p>
              {" "}
              <span>
                {" "}
                Compare Real Estate <br></br>Agencies in your neighbourhood.
              </span>
            </p>
            <p>
              We analyze thousands of local agents and find <br></br>the best to
              compete you!
            </p>
            <div className="search-form d-flex">
              <input type="search" placeholder="City and State or ZIP"></input>
              <Button onClick={gotoAgenciesPages}>
                Compare Agents <img src={goAhead} alt="goAhead" />
              </Button>
            </div>
          </div>
        </div>

        <div className="campare-agency-footer">
          <span>Immo Belgium ©2021. All Rights Reserved.</span>
          <div>
            <Link href="#">Blog</Link>
            <Link href="#">Politique de Confidentialité.</Link>
          </div>
        </div>
      </div>
      {/* <FooterContainer/> */}
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header"])),
    },
  };
};

export default compareAgency;
