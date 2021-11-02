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
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { notification } from "antd";

// const Background = styled.div`
//    background-image:url(${competitiveReport})
//    height:200px;
//    width:200px;
// `;

const CompetitiveReport = () => {
  const onClick = () => {
    notification.success({
      message: "Your action is performed successefully",
      placement: "bottomRight",
    });

  }
  return (
    <div className='d-flex flex-column'>
      <HeaderContainer title={""} />
      <div className="AgencySettingsPage container d-flex">
        <NavBarContainer />

        <div className="competitive-main">
          <div className="background-clr ">
            <div className=" background-gradiant  ">
              <img
                src={competitiveReport}
                className=" competitive-report"
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

              <p className="competitive-desc">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.Amet minim
                mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation
                veniam consequat sunt nostrud amet.
              </p>
              <Button onClick={onClick} > I’m interested</Button>
            </div>

            {/* <div className="p-2 bd-highlight">Flex item</div>
        <div className="mt-auto p-2 bd-highlight">Flex item</div> */}
          </div>
        
        </div>
      </div>
      {/* <FooterContainer/> */}
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
