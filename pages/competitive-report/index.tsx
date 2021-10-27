import React, { useState } from "react";
import competitiveReport from "../../assets/images/competitive-report.png";
import beta from "../../assets/images/beta.png";
import BelgiumImmo from "../../assets/images/BelgiumImmo.png";
import arrow from "../../assets/images/arrow.png";
import facebok from "../../assets/images/facebok.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";

import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// const Background = styled.div`
//    background-image:url(${competitiveReport})
//    height:200px;
//    width:200px;
// `;

const CompetitiveReport = () => {
  return (
    <div className='d-flex flex-column'>
      <HeaderContainer title={""} />
      <div className="AgencySettingsPage container d-flex">
        <NavBarContainer />

        <div className="main">
          <div className="background-clr ">
            <div className=" background-gradiant  ">
              <img
                src={competitiveReport}
                className=" competive-report"
                alt="..."
              />
            </div>
          </div>

          <div className=" competitive-market  ">
            <div>
              <p className=" heading ">
                Competitive Market Report{" "}
                <img src={beta} className="d-inline beta" alt="..."></img>
              </p>

              <p className="desc">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.Amet minim
                mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation
                veniam consequat sunt nostrud amet.
              </p>
              <div className="interested-btn"> I’m interested</div>
            </div>

            {/* <div className="p-2 bd-highlight">Flex item</div>
        <div className="mt-auto p-2 bd-highlight">Flex item</div> */}
          </div>
        
        </div>
      </div>
      <FooterContainer/>
    </div>
  );
};
export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header", "common"])),
    },
  };
};

export default CompetitiveReport;
