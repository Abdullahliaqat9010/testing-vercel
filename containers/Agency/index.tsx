import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobile, isMobileOnly } from "react-device-detect";
import { useRouter } from "next/router";

import StarRatingComponent from "react-star-rating-component";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";

import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import AgencyStarImage from "../../assets/images/star-blue.svg";
import noLogo from "../../assets/images/no-photo.png";
import noAgencyLogo from "../../assets/images/no-image-available.svg";
import styled from "styled-components"
import { RootState } from "../../types/state";
import { AgencyProps } from "../../types/agents";

import GoogleMap from "../../components/GoogleMap";
import ContactAgentModal from "../Modals/ContactAgentModal";
import { spawn } from "child_process";

// import { parseJwt } from '../../utils';

const AgencyInfoBlock = styled.div`
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: baseline !important;
	}
`

const AgencyLeftBlock = styled.div`
	@media (min-width: 769px) {
		width: 55%;
	}

	@media (max-width: 768px) {
		align-items: flex-start !important;
		width: 100% !importent;

	}
`

const AgencyLogoBlock = styled.div`
	border: 1px solid var(--colorLightGrey);
	@media (min-width: 769px) {
		height: 82px;
		width: 150px;
		margin: 20px 16px 20px 0px;

		
	}
	@media (max-width: 768px) {
		height: 126px;
		width: 150px;
		margin: 20px 16px 20px 0px;

	}
	@media (max-width: 500px) {
		height: 70px;
		width: 70px;
		margin: 20px 8px 20px 0px;

	}
`
const AgencyName = styled.span`
	font-family: var(--fontNunitoBold);
	font-size: 20px;
	line-height: 27px;
	margin-bottom: 10px;
`
const AgentName = styled.span`
	font-family: var(--fontNunitoBold);
	font-size: 20px;
	line-height: 27px;
`

const AgencyRightBlock = styled.div`
@media (min-width: 769px) {
	margin: 12px 0 20px 10px;
	width:45% ;

}
@media (max-width: 500px) {
	margin: 12px 0 20px 0px;
	width: 100% !importent;

}

`

const CountSoldProperties = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	// margin: 0 12px 0 20px;
	// margin-left: -2px;
	width: 42px;
	height: 42px;
	background: var(--bg-blue);
	border-radius: 8px;
	
`

const MainPropAddress = styled.span`
	width: 195px;
	margin-left: 4px;
	font-family: var(--fontNunitoBold);
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const OpenDetailBlock = styled.span`
	position: absolute;
	right: 0;
	cursor: pointer;
	background-image: url("../../assets/images/arrow.svg");
	width: 24px;
	height: 24px;
`

const NearestLabel = styled.span`
	display: block;
	width: max-content;
	margin-top: 12px;
	background: var(--bg-blue);
	border-radius: 8px;
	font-size: 10px;
	line-height: 16px;
	padding: 4px 8px;
`

const MoreInfoBlock = styled.div`
@media (min-width: 769px) {
	display-direction: row ;

}
@media (max-width: 768px) {
	display-direction: column !importent;

}
`

const MoreInfoLeftBlock = styled.div`
@media (min-width: 769px) {
	width:50%;

}
@media (max-width: 768px) {
	width:100% !importent;
}
`
const MoreInfoMapBlock = styled.div`
min-height: 400px;
@media (min-width: 769px) {
	width:50%;

}
@media (max-width: 768px) {
	width:100% !importent;
}
`

const LinksBlock = styled.div`
Button {
	font-weight: bold;
	font-size: 16px;
	line-height: 22px;
	border-radius: 10px;
}
span {
	font-size: 14px;
	line-height: 19px;
	color: var( --colorBlue);
}

@media (min-width: 769px) {
	flex-direction: column;
	Button {
		min-width:155px !importent;
		height: 50px
	}
	span {
		min-width:155px;
		height: 50px;
		margin-top:20px
	}
}


@media (max-width: 768px) {
	flex-direction: row;
	span {
		margin-left: 10px;
		margin-top: 8px;
	}
}
@media (max-width: 500px) {
	flex-direction: column;
	span {
		text-align:center;
		width:100%!importent;
		margin-top:20px
	}
	Button { 
		width:100%!importent;
	}
}
`

const AgencyInfo = styled.div`
font-size: 12px;
line-height: 16px;
@media (min-width: 501px) {
	margin-right:10px
 }
 @media (max-width: 500px) {
	margin-right:0px
 }

`

const RatingStarImages = styled.img`
@media (min-width: 501px) {
	height: 14px;
	width: 14px;
 }
 @media (max-width: 500px) {
	height: 14px;
	width: 14px;
 }
`
const Agency = ({ nearest, agency, mainProperty, properties }: AgencyProps) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("dashboard-page");

  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const openMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const agencyRating = (rate) => {
    if (rate) {
      return rate.toString().length > 1 ? rate : rate + ".0";
    }
    return "5.0";
  };

  const agencyTotalUserReview = (reviews) => {
    if (reviews) {
      return reviews;
    }
    return 120;
  };

  const agencyDesc = (
    countProperties: string | undefined,
    similarProperties: any[] | undefined
  ) => {
    if (locale === "en") {
      if (similarProperties) {
        return {
          //   __html: `During the last 24 months, our agency has sold
          //            <span class="bold">${
          //              agency?.properties?.length || 0
          //            } properties</span> nearby including <span class="bold">
          //            ${
          //              agency?.properties?.length
          //            } similar to yours</span>. Our team is at your disposal to manage your
          //            project`,
          __html: `In the past 24 months, our office has sold   
		  <span class="bold">  
		  ${agency?.properties?.length || 0} home${
            similarProperties.length !== 1 ? "s" : ""
          }</span> of which
<span class="bold">				   
${agency?.properties?.length || 0} home${
            similarProperties.length !== 1 ? "s" : ""
          } </span> are similar to yours. 
 Our team is available to manage your real estate project. 
`,
        };
      }

      return {
        __html: `During the last 24 months, our agency has sold 
                 <span class="bold">${
                   agency?.properties?.length || 0
                 } properties</span> nearby. Our team is at your disposal 
                 to manage your project`,
      };
    }

    if (locale === "fr") {
      if (Number(agency?.properties?.length) === 1) {
        return {
          __html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
                   agency?.properties?.length || 0
                 } bien</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
        };
      }

      if (similarProperties) {
        return {
			__html: `In de afgelopen 24 maanden heeft ons kantoor  
			<span class="bold">  
			${agency?.properties?.length || 0} woning${
	 similarProperties.length !== 1 ? "en" : ""
   }</span>  verkocht waarvan
  <span class="bold">				   
  ${agency?.properties?.length || 0} woning${
	 similarProperties.length !== 1 ? "en" : ""
   } </span> gelijkaardig aan die van u. 
			Ons team is beschikbaar om uw vastgoed project te beheren. 
`,
        };
      }

      return {
        __html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
                   countProperties || 0
                 } biens</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
      };
    }
    if (locale === "nl") {
      if (Number(agency?.properties?.length) === 1) {
        return {
          __html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
                   agency?.properties?.length || 0
                 } bien</span> om uw vastgoedproject te beheren`,
        };
      }

      if (similarProperties) {
        return {
          __html: `In de afgelopen 24 maanden heeft ons kantoor  
                   <span class="bold">  
				   ${agency?.properties?.length || 0} woning${
            similarProperties.length !== 1 ? "en" : ""
          }</span>  verkocht waarvan
		 <span class="bold">				   
		 ${agency?.properties?.length || 0} woning${
            similarProperties.length !== 1 ? "en" : ""
          } </span> gelijkaardig aan die van u. 
                   Ons team is beschikbaar om uw vastgoed project te beheren. 
`,
        };
      }

      return {
        __html: `In de afgelopen 24 maanden heeft ons kantoor  
		<span class="bold">  
		${agency?.properties?.length || 0} woning${
          similarProperties.length !== 1 ? "en" : ""
        }</span>  verkocht waarvan
<span class="bold">				   
${agency?.properties?.length || 0} woning${
          similarProperties.length !== 1 ? "en" : ""
        } </span> gelijkaardig aan die van u. 
		Ons team is beschikbaar om uw vastgoed project te beheren. 
`,
        // `In de afgelopen 24 maanden heeft ons bureau verkocht
        //          <span class="bold">${
        //            agency?.properties?.length || 0
        //          } biens</span> in de buurt. Wij staan ​​tot uw beschikking
        //          om uw vastgoedproject te beheren`,
      };
    }
    return {
      __html: "",
    };
  };

  const agenciesList = agency.properties
    ? [
        ...agency?.properties?.map((prop) => {
          return {
            type: "property",
            position: {
              lat: prop?.property?.lat,
              lng: prop?.property?.lng,
            },
            id: prop?.id,
          };
        }),
      ]
    : [];

  const mapProps = {
    markers: agency?.latlng
      ? [
          {
            type: "agency",
            position: {
              lat: agency?.latlng.split(",")[0],
              lng: agency?.latlng.split(",")[1],
            },
            id: agency.id,
          },
          {
            type: "home",
            position: {
              lat: mainProperty?.property?.lat,
              lng: mainProperty?.property?.lng,
            },
            id: "home",
          },
          ...agenciesList,
        ]
      : [
          {
            type: "home",
            position: {
              lat: mainProperty?.property?.lat,
              lng: mainProperty?.property?.lng,
            },
            id: "home",
          },
          ...agenciesList,
        ],
    zoom: 15,
  };

  return (
    <div >
			{/* className="agency-block" */}
			<ContactAgentModal
				show={showContactModal}
				onClose={() => setShowContactModal(false)}
				properties={properties}
				agencyOwner={agency?.agent?.user}
				agencyName={agency?.company_name}
				agencyId={agency?.id}
			/>
			<AgencyInfoBlock
				className="d-flex align-items-center"
				onClick={openMoreInfo}
			>
				<AgencyLeftBlock className="d-flex align-items-center">
					<AgencyLogoBlock>
						<img
							style={{ width: "100%", height: "100%", objectFit: "contain" }}
							src={agency?.logo_image ? agency?.logo_image : noAgencyLogo}
							alt={agency?.company_name}
						/>
					</AgencyLogoBlock>
					<AgencyInfo className="my-4">
						<AgencyName > {agency.company_name}</AgencyName>
						<div className=" d-flex align-items-center">
							<span style={{ fontSize: '12px', lineHeight: '16px' }} >
								{agencyRating(agency?.rating?.rating)}
							</span>
							<StarRatingComponent
								name="rate"
								className="custom-rate"
								renderStarIcon={(index, value) => (
									<RatingStarImages
										className=" ml-1" style={{ verticalAlign: "text-bottom" }}
										src={index <= value ? RatingStar : RatingStarEmpty}
										alt="RatingStar"
									/>
								)}
								starCount={5}
								value={Number(agencyRating(agency?.rating?.rating))}
							/>
							<span className="ml-1">
								{t("span.from")}{" "}
								{agencyTotalUserReview(
									agencyRating(agency?.rating?.user_ratings_total)
								)}{" "}
								{t("span.reviews")}
							</span>
						</div>
						{agency.id === nearest && (
							<NearestLabel>{t("span.nearest-agency")}</NearestLabel>
						)}
					</AgencyInfo>
				</AgencyLeftBlock>
				{/* <div className="agency-border" /> */}
				<AgencyRightBlock className=" d-flex align-items-center ">
					<CountSoldProperties className="pl-1 mr-2">
						{agency.properties?.length || 0}
					</CountSoldProperties>
					<div className="mt-2">
						<p className="m-0" >{t("p.similar-properties-sold")}</p>
						<p className="d-flex m-0">
							{t("p.to")}
							<MainPropAddress >
								{mainProperty?.search_address}
							</MainPropAddress>
						</p>
					</div>
				</AgencyRightBlock>

				<OpenDetailBlock className={showMoreInfo ? " open" : ""} />
			</AgencyInfoBlock>
			{showMoreInfo && (
				<MoreInfoBlock className=" d-flex justify-content-between">
					{/* more-info */}
					<MoreInfoLeftBlock className="d-flex flex-column">
						<div className=" d-flex">
							{/* agent-info */}
							<Image style={{ height: '60px', width: "60px" }}
								src={
									agency?.agent?.user?.avatar
										? agency?.agent?.user?.avatar
										: noLogo
								}
								roundedCircle
							/>
							<div className="d-flex flex-column justify-content-center ml-2">
								<AgentName>
									{agency?.agent?.user?.firstname}{" "}
									{agency?.agent?.user?.lastname}
								</AgentName>
								<span>{t("button.agency-owner")}</span>
							</div>
						</div>
						<div className="my-3" style={{ fontSize: "14px", lineHeight: '19px' }}
							dangerouslySetInnerHTML={agencyDesc(
								"10",
								agency?.properties?.length
							)}
						></div>
						<LinksBlock className="d-flex">
							<Button onClick={() => openContactModal()}>
								{t("button.contact")} {agency?.agent?.user?.firstname}
							</Button>
							<Link href={`/agency/${agency.id}`} locale={locale}>
								<span >
									{t("button.agency-details")}{" "}
									<img src={ArrowImage} alt="ArrowImage" />
								</span>
							</Link>
						</LinksBlock>
					</MoreInfoLeftBlock>
					{!isMobileOnly && (
						<MoreInfoMapBlock className=" d-flex flex-column">
							{/* map-block */}
							<div className="position-relative w-100">
								{/*@ts-ignore*/}
								<GoogleMap {...mapProps} />
							</div>
							<div className=" d-flex justify-content-between">
								<div className="d-flex align-items-center">
									<div className="orange-circle" />
									<span>{t("span.your-property")}</span>
								</div>
								<div className="d-flex align-items-center">
									<div className="blue-circle" />
									<span>{t("span.similar-property")}</span>
								</div>
								<div className=" d-flex align-items-center">
									<img className="mr-1" style={{ height: "12px", width: "12px" }} src={AgencyStarImage} alt="AgencyStarImage" />
									<span>{t("span.agency")}</span>
								</div>
							</div>
						</MoreInfoMapBlock>
					)}
				</MoreInfoBlock>
			)}
		</div>
  );
};

export default Agency;
