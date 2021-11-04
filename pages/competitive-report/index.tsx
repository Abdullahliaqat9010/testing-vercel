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
  const { t } = useTranslation("competitive-report");

  const onClick = () => {
    notification.success({
      message: "Your action is performed successefully",
      placement: "bottomRight",
    });

  }
  return (
    <div className="d-flex flex-column">
      <HeaderContainer title={""} />
      <div className="AgencySettingsPage container d-flex">
        <NavBarContainer />

        <div className="competitive-main">
          <div className="background-clr mr-2">
            <div className=" background-gradiant  ">
              <img
                src={competitiveReport}
                className=" competitive-report"
                alt="..."
              />
            </div>
          </div>

          <div className=" competitive-market mr-2">
            <div>
              <p className=" heading ">
                {t("p.competitive-report")}

                <img src={beta} className="d-inline beta" alt="..."></img>
              </p>

              <p className="competitive-desc">{t("p.competitive-desc")}</p>
              <div className="interested-btn">
                {" "}
                {t("btn.competitive-report")}
              </div>
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
      ...(await serverSideTranslations(locale, [
        "header",
        "common",
        "competitive-report",
      ])),
    },
  };
};

export default CompetitiveReport;
