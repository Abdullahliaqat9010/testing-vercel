import ContactAgentModel from "../../containers/Modals/ContactAgentModal"
import { Col, Row } from "react-bootstrap"
import HeaderContainer from "../../containers/Header"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import FooterContainer from "../../containers/Footer"
import styled from "styled-components";
import logoImage from "../../assets/images/agents/label-immo-logo.jpeg"
import Link from "next/link"
import ArrowImage from "../../assets/images/arrow-blue.svg";
import landNoActive from "../../assets/images/land-noactive.svg"
import AddressImage from "../../assets/images/agency-page/address-icon.svg";
import PhoneImage from "../../assets/images/agency-page/phone-icon.svg";
import ScheduleImage from "../../assets/images/agency-page/schedule-icon.svg";
import ContectForm from "./blocks/contect-block"
import { useEffect, useState } from "react"
import ReviewBlock from "../agency/blocks/FourthBlock"
import StarRatingComponent from "react-star-rating-component";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import { getAgencyById } from "../../network-requests";
import { useRouter } from "next/router";
const Labels = styled.span`
    font-size: 14px;
    line-height: 19px;
    color: #1D2E5B;
`;

const ProfileContainer = styled.div`
    padding: 30px 30px 22px;
    background: #FFFFFF;
    border-radius: 10px;
    
`;

const BasicInfoLabes = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: var(--mainColor);
    width:145px;
`;
const ProfileImageBlock = styled.img`
    border: 1px solid #F2F6FF;
    box-sizing: border-box;
    border-radius: 8px;
    width: 172px;
    height: 172px;
`;

const IconsImages = styled.img`
    font-size: 16px;
    line-height: 16px;
    height:16px;
    width:16px;
    padding-right: 2px;
    padding-bottom:2px;
`;
const MainDiv = styled.div`
    flex:2;
    margin-right: 20px;
    @media (min-width: 320px) and (max-width: 768px) {
        with:auto;
        flex:1;
        margin-right:0px !importent
    }
`;
const ContactFormBlock = styled.div`
    flex:1;
    @media (min-width: 320px) and (max-width: 768px) {
        with:auto;
        flex:1;
        margin: 20px 0px;

    }
`;
const AgencyInfoBlock = styled.div`
    width: 90%;
    justify-contect: center;
    @media (min-width: 320px) and (max-width: 768px) {
        width:100%;
    }
`;

const BackToDashboardDiv = styled.div`
    width:100%;
    
`;

const ReviewRow = styled.div`
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color:var(--mainColor);
`;

const ReviewContainer = styled.div`
    border-radius: 10px;
`;

const ContentBlock = styled.div`
    width:100%;
    flex-direction: row;
    @media (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
    }
`;



const agencyProtfolio = () => {

    const [agencyData, setAgencyData] = useState({
        company_name: "test"

    })
    const [showContact, setShowContect] = useState(false)
    const contactToggle = () => {
        setShowContect(!showContact)
    }
    const router = useRouter();
    const { id } = router.query;
    useEffect(()=> {
        _getAgency()
    },[])


    const [agency, setAgency] = useState(null);
    const _getAgency = async () => {
        try {
            const _agency = await getAgencyById(Number(id));
            setAgency({ ..._agency });
        } catch (error) {
            console.log(error);
        }
    };
    const date = new Date(agency?.createdAt)
    const address = `${agency?.street} ${agency?.street_number}, ${agency?.zip} ${agency?.city}`

    return (
        <div>
            <HeaderContainer title="jshakjsd" />
            <div className="d-flex justify-content-center">

                <AgencyInfoBlock className="d-flex justify-content-center p-3" >
                    <div >
                        <BackToDashboardDiv className="d-flex" >
                            <Link href={"/dashboard"}>
                                <span className="Agency__back">
                                    <img src={ArrowImage} alt="ArrowImage" /> back to dashboard
                                </span>
                            </Link>
                        </BackToDashboardDiv>
                        <ContentBlock className="d-flex  ">
                            <MainDiv >
                                <ProfileContainer>
                                    <div className=" d-flex border-bottom border-bottom-gray pb-3 ">
                                        <ProfileImageBlock src={logoImage} alt="agencyLogoImage" />
                                        <div className="d-flex flex-column justify-content-center pl-3" >
                                            <h3>{agency?.company_name}</h3>
                                            <ReviewRow className="">
                                                <span>5.0</span> <StarRatingComponent
                                                    name="rate"
                                                    renderStarIcon={(index, value) => (
                                                        <img
                                                            className="rating-star"
                                                            src={
                                                                index <= value
                                                                    ? RatingStar
                                                                    : RatingStarEmpty
                                                            }
                                                            alt={"RatingStar" + index}
                                                        />
                                                    )}
                                                    starCount={5}
                                                    value={Number(4)}
                                                />{" "} <span>from {"120"} reviews</span>
                                            </ReviewRow>
                                            <span className="my-2">{"With Immo Belgium since"} {date.getFullYear()}</span>

                                        </div>
                                    </div>
                                    <div>
                                        <h2>Contact details</h2>

                                        <div className="d-flex my-2">
                                            <BasicInfoLabes >
                                                <IconsImages src={AddressImage} alt="sajksh" />
                                                <Labels>Address</Labels>
                                            </BasicInfoLabes>
                                            <Labels>{address}</Labels>
                                        </div>
                                        <div className="d-flex my-2">
                                            <BasicInfoLabes>
                                                <IconsImages src={PhoneImage} alt="sajksh" />
                                                <Labels>Contact Phone</Labels>
                                            </BasicInfoLabes>
                                            <span className="pointer text-primary" onClick={contactToggle}> {!showContact ? "Show Phone" : "+36273892712"}</span>

                                        </div>
                                        <div className="d-flex my-2">
                                            <BasicInfoLabes>
                                                <IconsImages src={ScheduleImage} alt="sajksh" />
                                                <Labels>Schedule</Labels>
                                            </BasicInfoLabes>
                                            <Labels>{agency?.opening_time}</Labels>
                                        </div>
                                    </div>
                                </ProfileContainer>
                                <ReviewContainer>
                                    <ReviewBlock currentAgency={agency} />
                                </ReviewContainer>

                            </MainDiv>
                            <ContactFormBlock>
                                <ContectForm
                                    // properties={}
                                    agencyOwner="ajhs"
                                    agencyName={agency?.company_name}
                                    agencyId={agency?.id}
                                />
                            </ContactFormBlock>
                        </ContentBlock>
                    </div>
                </AgencyInfoBlock>
            </div>

            <FooterContainer />
        </div>
    )

}

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: "blocking", //indicates the type of fallback
    };
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            "header",
            "agency-page",
            "dashboard-page",
            "common",
        ])),
    },
});

export default agencyProtfolio