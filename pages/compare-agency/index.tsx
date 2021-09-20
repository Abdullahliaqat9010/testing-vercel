import React from "react"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import HeaderContainer from "../../containers/Header"
import FooterContainer from "../../containers/Footer"
import { Button } from "react-bootstrap"
import goAhead from "../../assets/images/compare-agency/go-ahead.svg"
import reviewImage from "../../assets/images/compare-agency/reviews-image.png"
import locationImage from "../../assets/images/compare-agency/location-image.png"
import homeImage from "../../assets/images/compare-agency/home-image.png"
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg"


const compareAgency = () => {
    return (
        <>
            <HeaderContainer title="compare agency" />
            <div className="w-100 compare-agency">
                <div className="imageContanter d-flex" >
                    <img className="main-image" src={compareAgencyImage} alt="compareAgencyImage" />
                </div>
                <div className="search-area">
                    <p> <span> Compare Real Estate <br></br>Agencies in your neighbourhood.</span></p>
                    <p>We analyze thousands of local agents and find <br></br>the best to compete you!</p>
                    <div className="search-form d-flex" >
                        <input type='search' placeholder="City and State or ZIP" ></input>
                        <Button>Compare Agents  <img src={goAhead} alt="goAhead" /></Button>
                    </div>
                </div>

                <div className=" cards-container d-flex justify-content-center " >
                    <div className="card text-center " style={{ border: 'none' }} >
                        <div className="card-body ">
                            <img src={reviewImage} alt="reviewImage" />
                            <p> <span> Read reviews from <br></br> previous customers </span> </p>
                            <p>Lorem ipsum dolor sit amet, cons</p>
                        </div>
                    </div>
                    <div className="card text-center" style={{ border: 'none' }} >

                        <div className="card-body">
                            <img src={locationImage} alt="reviewImage" />
                            <p> <span> View the agencies <br></br> nearest to you </span> </p>
                            <p>Lorem ipsum dolor sit amet, cons</p>
                        </div>
                    </div>
                    <div className="card text-center" style={{ border: 'none' }}>

                        <div className="card-body">
                            <img src={homeImage} alt="reviewImage" />
                            <p> <span> Compare similar houses <br></br> that they sold </span> </p>
                            <p>Lorem ipsum dolor sit amet, cons</p>
                        </div>
                    </div>
                </div>
                <div className="top-agencys d-flex" >
                    <div className="reviews-container">
                        <img src={reviewImage} alt="reviewImage" />
                    </div>
                    <div className="compare-top-agency" >
                        <p> <span> Compare Real Estate <br></br>Agencies in your neighbourhood.</span></p>
                        <p>We analyze thousands of local agents and find <br></br>the best to compete you!</p>
                        <div className="search-form d-flex" >
                            <input type='search' placeholder="City and State or ZIP" ></input>
                            <Button>Compare Agents  <img src={goAhead} alt="goAhead" /></Button>
                        </div>

                    </div>

                </div>
            </div>
            {/* <FooterContainer/> */}

        </>
    )
}

export const getServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["header"])),
        },
    };
}


export default compareAgency