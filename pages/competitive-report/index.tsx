import React, { useState } from "react";
import competitiveReport from "../../assets/images/competitive-report.png";
import beta from "../../assets/images/beta.png";
import BelgiumImmo from "../../assets/images/BelgiumImmo.png";
import arrow from "../../assets/images/arrow.png";
import facebok from "../../assets/images/facebok.png"
import linkedin from "../../assets/images/linkedin.png"
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png"
// const Background = styled.div`
//    background-image:url(${competitiveReport})
//    height:200px;
//    width:200px;
// `;

const CompetiveReport = () => {
  return (
    // <div>
    //   <div className='bg-primary'>
    //   <Background></Background>
    //   <img src={competitiveReport} />
    // </div>

    // </div>
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
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <div className="interested-btn"> I’m interested</div>
        </div>

        {/* <div className="p-2 bd-highlight">Flex item</div>
        <div className="mt-auto p-2 bd-highlight">Flex item</div> */}
      </div>
      <div className="competitive-report-footer ">
        <div className="d-flex">
          <div>
            {" "}
            <img className="footer-logo  " src={BelgiumImmo} alt="..." />
            <p className="footer-paraghaf">
              Amet minim mollit non deserunt ullamco est sit <br />
              aliqua dolor do amet sint. Velit officia consequat <br /> duis
              enim velit mollit. Exercitation veniam consequat
              <br />
              sunt nostrud amet.
            </p>
            <p className='right-reserved'>All rights reserved © Immo Belgium 2021</p>
          </div>
          <div>
            <p className="footer-links">Navigation</p>
            <div className="d-inline menu ">Dashboard</div>
            <div className="d-inline  arrow"><img src={arrow}/></div>
            <br/>
            <div className="d-inline menu ">My properties</div>
            <div className="d-inline  arrow"><img src={arrow}/></div>
            <br/>
            <div className="d-inline menu ">Account settings</div>
            <div className="d-inline  arrow"><img src={arrow}/></div>
          </div>
          <div>
            <p className="footer-links">Resources</p>
            <div className="d-inline menu ">Blog</div>
            <div className="d-inline  arrow"><img src={arrow}/></div>
            <br/>
            <div className="d-inline menu ">Use cases</div>
            <div className="d-inline  arrow"><img src={arrow}/></div>
          
          </div>
          <div>
            <p className="footer-links">Social</p>
            <div className="d-inline  facebok"><img src={facebok}/></div>
            <div className="d-inline  linkedin"><img src={linkedin}/></div>
            <div className="d-inline  twitter"><img src={twitter}/></div>
            <div className="d-inline  instagram"><img src={instagram}/></div>
            


          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetiveReport;
