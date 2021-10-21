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
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getAutocompleteItemsAction,
  clearAutocompleteItems,
  setAdditionalAddressAction,
  openMainStepsAction
} from "../../actions";
import { RootState } from "../../types/state";

const compareAgency = () => {
  const { t, i18n } = useTranslation("compare-agency");

  const router = useRouter();

  const dispatch = useDispatch();
  const { locale } = router;
  const [value, setValue] = useState("");
  const { dataFromMapBox } = useSelector((state: RootState) => state.stepsInfo);
  console.log("dataFromMapBox", dataFromMapBox)
  

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
      dispatch(getAutocompleteItemsAction(el.target.value, "address,postcode"));
    } else {
      dispatch(clearAutocompleteItems());
    }
  };

  const handleSelectAddress = (addressId: string) => {
    const [currentAddress] = dataFromMapBox.filter(
      (list) => list.id === addressId
    );
    const isSearchByPostcode = currentAddress?.id?.split('.')[0]
    let selectedAddress = currentAddress?.locality?.lenght > 0? currentAddress?.locality : currentAddress?.place + ", " + (isSearchByPostcode === 'postcode'? currentAddress?.street : currentAddress?.postcode)  
    setValue(selectedAddress);

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
    const sendData = {
			location: { ...currentAddress.location },
			infoFromAutoComplete: currentAddress.fullAddress,
			additionalAddress: { ...dataForNextStep },
		};

		dispatch(openMainStepsAction(sendData));
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
              {t("span.real-estate")}
              <br></br>
              {t("span.nextline-real-estate")}
            </span>
          </p>
          <p>
<<<<<<< HEAD
            {t("p.real-estate")} <br></br> {t("p.nextline-real-estate")}
=======
            We analyze thousands of local agents and find the best to
            compete you!
>>>>>>> da44f18e48f7fe87223be3720d30e2d3330004a7
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
                      {item?.locality?.length > 0 ? item?.locality : item?.place + "," + item?.postcode}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
            {/* <input type='search' onChange={(e) => onChange(e.target)} placeholder="City and State or ZIP" ></input> */}
            <Button onClick={gotoAgenciesPages}>
              {t("button.compare-agents")} <img src={goAhead} alt="goAhead" />
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
                    {t("span.review")} <br></br> {t("span.previous-customer")}
                  </span>{" "}
                </p>
                {/* <p>Lorem ipsum dolor sit amet, cons</p> */}
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
                    {t("span.discover-agency")} <br></br>
                    {t("span.nearest")}
                  </span>{" "}
                </p>

                {/* <p>Lorem ipsum dolor sit amet, cons</p> */}
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
                    {t("span.similar-houses")}
                    <br></br> {t("span.sold")}
                  </span>{" "}
                </p>
                {/* <p>Lorem ipsum dolor sit amet, cons</p> */}
              </div>
            </div>
          </div>
        </div>
        {false && ( <> 
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
                Work only with top agents.
              </span>
            </p>
            <p>
            Do your homework and see which agency is the most appropriate to work with.
            </p>
            <div className="search-form d-flex">
              <input type="search" placeholder={t("placeholder.zip")}></input>
              <Button onClick={gotoAgenciesPages}>
                Compare Agents <img src={goAhead} alt="goAhead" />
              </Button>
            </div>
          </div>
        </div>
        </>)}

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
      ...(await serverSideTranslations(locale, ["header", "compare-agency"])),
    },
  };
};

export default compareAgency;
