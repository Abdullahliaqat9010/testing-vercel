import React, { useState } from "react"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import HeaderContainer from "../../containers/Header"
import FooterContainer from "../../containers/Footer"
import { Button } from "react-bootstrap"
import goAhead from "../../assets/images/compare-agency/go-ahead.svg"
import reviewImage from "../../assets/images/compare-agency/reviews-image.png"
import locationImage from "../../assets/images/compare-agency/location-image.png"
import homeImage from "../../assets/images/compare-agency/home-image.png"
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg"
import StarRatingComponent from 'react-star-rating-component'
import RatingStar from '../../assets/images/rating/full-star.svg';
import RatingStarEmpty from '../../assets/images/rating/star.svg';
import openArrow from "../../assets/images/compare-agency/open-arrow.svg"
import closeArrow from "../../assets/images/compare-agency/closed-arrow.svg"
import mapImage from "../../assets/images/compare-agency/map-image.png"
import blueStar from "../../assets/images/compare-agency/blue-star.svg"
import loadMore from "../../assets/images/load-more.svg"
import Link from "next/link"
import closePage from '../../assets/images/burger-menu-close.svg'
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

// import FooterContainer from "../../containers/Footer"
const compareAgency = ({ onSubmit }) => {

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        description: Yup.string().required("Required"),
        projet: Yup.string().required("Required"),
        evaluate: Yup.boolean().required("Required"),
    });


    const [open, setOpen] = useState<boolean>(false);
    const [openContactForm, setOpenContactForm] = useState<boolean>(false);

    const agencyData = [
        {
            profile_image: reviewImage,
            name: "aa bb cc",
            rating: 3,
            totalRevies: 12,
            soldProperties: 23,
            agency_agent: {
                name: "abcd abcd",
                role: "agency owner",
            },
            description: "asjd amsdajs asdasjd asdjkashdj asjkdhasjda  sdajkhd",
            profile_link: "google.com",

        },
        {
            profile_image: locationImage,
            name: "aa bb cc",
            rating: 3,
            totalRevies: 12,
            soldProperties: 23,
            agency_agent: {
                name: "abcd abcd",
                role: "agency owner",
            },
            description: "asjd amsdajs asdasjd asdjkashdj asjkdhasjda  sdajkhd",
            profile_link: "google.com",

        }
    ]


    const openDetail = () => {
        setOpen(!open)
    }
    const closeContactForm = () => {
        setOpenContactForm(!openContactForm)
    }

    return (
        <>
            <HeaderContainer title="compare agency result" />
            <div className=  " w-100 compare-agency-result" >
                <div className="imageContanter d-flex" >
                    <img className="main-image" src={compareAgencyImage} alt="compareAgencyImage" />
                </div>
                <div className="agency-result-container justify-content-center">
                    <div className="result-agency" >
                        <p>We analyze thousands of local agents and find the best to compete you!</p>
                        <div className="search-form d-flex" >
                            <input type='search' placeholder="City and State or ZIP" ></input>
                            <Button>Compare Agents  <img src={goAhead} alt="goAhead" /></Button>
                        </div>
                    </div>
                    <div className="agency-container" >
                        {/* {agencyData?.length && agencyData.map((agency, index) => { */}
                        <div className="agency d-flex"  >
                            <div className="image-bassicInfo ">
                                <img src={reviewImage} alt="reviewImage" />
                                <div className="agency-basicInfo" >
                                    <span className="agency-name">name</span>
                                    <p className="rating-row" > <span className="rating"  > 5.6 </span>
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
                                        /> <span className="from-totla-reviews"> from 120 reviews </span></p>
                                </div>
                            </div>
                            <div className="  sold-by-agency justify-content-between">
                                <p>
                                    <span className="noof-sold"> 67 </span> <span className="sold-title">Recent sales nearby</span>
                                </p>
                                <img onClick={openDetail} src={open ? closeArrow : openArrow} alt="arrows" />

                            </div>
                        </div>

                        {
                            open && (
                                <div className="aency-detail-container" >
                                    <div className="agency-detail-container-left" >
                                        <div className="agency-owner-box">
                                            <img src={reviewImage} alt="agentImage" />
                                            <div>
                                                <p className="agent-name">name</p>
                                                <p className="agent-title">agency owner</p>
                                            </div>
                                        </div>
                                        <p className="agency-description">During the last 24 months, our agency has sold 39 properties nearby including 18 similar to yours. Our team is at your disposal to manage your project</p>
                                        <Button onClick={closeContactForm} >Contact Thierry</Button>

                                        <Link href="#">Agency details </Link> <img className="go-forword" src={goAhead} alt="goAhead" />

                                    </div>
                                    <div className="agency-map-container" >
                                        <img src={mapImage} alt="map" />
                                        <div className="map-description">
                                            <p> <span></span> Properties sold by the agency </p>
                                            <p> <img className="blue-star" src={blueStar} alt="blueStar" />  agency </p>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        {/* })} */}

                        <div className="w-100 justify-content-center text-center">

                        <Button className="load-more"><img src={loadMore} alt="loadMore" /> load more  </Button>
                        </div>
                    </div>

                </div>


            </div>
            {openContactForm && (
                <div className="contact-form" >
                    <div className="page-title">
                        <p className="content-agency-name">Contact Thierry Deviers </p>
                        <img onClick={closeContactForm} src={closePage} alt="close" />
                    </div>
                    <p> Century 21 - PATRIMOINE 24 </p>

                    <div>
                        <Formik
                            initialValues={{
                                full_name: "",
                                phone_number: "",
                                email: "",
                                description: "",
                                projet: "",
                                evaluate: false
                            }}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {() => (
                                <Form>
                                    <div className="d-flex flex-column form-input-block">
                                        <label className="form-label" htmlFor="full_name">
                                            First and Last name
                                        </label>
                                        <Field className="form-input" name="full_name" type="text" />
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="full_name"
                                        />
                                    </div>
                                    <div className="d-flex flex-column form-input-block">
                                        <label className="form-label" htmlFor="phone_number">
                                            Phone Number
                                        </label>
                                        <Field className="form-input" name="phone_number" type="text" />
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="phone_number"
                                        />
                                    </div>
                                    <div className="d-flex flex-column form-input-block">
                                        <label className="form-label" htmlFor="email">
                                            Email Address
                                        </label>
                                        <Field className="form-input" name="email" type="text" />
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="email"
                                        />
                                    </div>
                                    {/* <div className="d-flex flex-column form-input-block"> */}
                                    <div
                                        className="d-flex flex-column form-input-block"
                                    >
                                        <label className="form-label" htmlFor="description">
                                            description
                                        </label>
                                        <Field
                                            className="form-input description-field form-input-error"
                                            name="description"
                                            as="textarea"
                                        />
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="description"
                                        />
                                    </div>
                                    <div
                                        className="d-flex flex-column form-input-block"
                                    >
                                        <label className="form-label" htmlFor="projet">
                                            Your real estate project
                                        </label>
                                        <Field
                                            className="form-input"
                                            name="projet"
                                            component="select"
                                        >
                                            <option value="red">I want to sell</option>
                                            <option value="green">I want to buy</option>
                                            <option value="blue">I want to sell & buy</option>
                                            <option value="blue">I want to rent</option>
                                            <option value="blue">Other</option>
                                        </Field>
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="projet"
                                        />
                                    </div>
                                    <div
                                        className="d-flex flex-column form-input-block"
                                    >
                                        <label >
                                            <Field

                                                className="form-input checkmark"
                                                name="evaluate"
                                                type="checkbox"
                                            />I would like to have my property evaluated free of charge</label>
                                        <ErrorMessage
                                            className="form-error"
                                            component="div"
                                            name="evaluate"
                                        />
                                    </div>
                                    {/* </div> */}
                                    <div className=" contact-form-buttons d-flex form-input-block">
                                        <Button style={{ width: '49%' }} className="form-button" block type="submit">
                                            Confirm
                                        </Button>
                                        <Button onClick={closeContactForm} className="form-button cancel-button" style={{ width: '49%' }} type="cancel" > Cancel </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>

            )}
            {/* <FooterContainer/> */}
        </>
    )
}

export const getServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["header", "footer"])),
        },
    };
}


export default compareAgency