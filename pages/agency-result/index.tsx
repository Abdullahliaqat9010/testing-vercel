import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import goAhead from "../../assets/images/compare-agency/go-ahead.svg";
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg";
import StarRatingComponent from "react-star-rating-component";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import openArrow from "../../assets/images/compare-agency/open-arrow.svg";
import closeArrow from "../../assets/images/compare-agency/closed-arrow.svg";
import mapImage from "../../assets/images/compare-agency/map-image.png";
import blueStar from "../../assets/images/compare-agency/blue-star.svg";
import LogoImage from "../../assets/images/default-logo-image.png";
import google from "../../assets/images/google.png";
import frame1 from "../../assets/images/frame1.png";
import frame2 from "../../assets/images/frame2.png";
import userIcon from "../../assets/images/userIcon.png";
import BlueGoAhead from "../../assets/images/blue-goAhead.svg";

import ContactAgentModal from "../../containers/Modals/ContactAgentModal";
import {
	getAgenciesByAddress,
	getLimitedAgenciesByAddress,
} from "../../network-requests";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/state";
import { openMainStepsAction } from "../../actions";
import Mapbox3dMap from "../../components/3dMap";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getLatLongFromAddress, getProperties } from "../../network-requests";
import { useTranslation } from "next-i18next";

const LimitedPartner = styled.span`
	background: #fe7f2d;
	border-radius: 8px;
	padding: 4px;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: #ffffff;
	width: 100px;
`;
const compareAgency = () => {
	const limitedAgenciesData = [
		{
			zip: "1000",
			street: "Tour & Taxis - Havenlaan 86c 106c",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1081",
			street: "105 avenue Seghers",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1200",
			street: "Avenue Georges Henri 239",
			cityen: "Woluwe Saint Lambert",
			cityfr: "Woluwe Saint Lambert",
			citynl: "Sint-Lambrechts-Woluwe",
		},
		{
			zip: "8000",
			street: "Oude Zak 14",
			cityen: "Bruges",
			cityfr: "Bruges",
			citynl: "Brugge",
		},
		{
			zip: "8900",
			street: "Mk. Haiglaan 90",
			cityen: "Ypres",
			cityfr: "Ypres",
			citynl: "Ieper",
		},
		{
			zip: "8800",
			street: "Zwingelaarsstraat 25",
			cityen: "Roeselare",
			cityfr: "Roeselare",
			citynl: "Roeselare",
		},
		{
			zip: "8790",
			street: "Westerlaan, 25",
			cityen: "Waregem",
			cityfr: "Waregem",
			citynl: "Waregem",
		},
		{
			zip: "8500",
			street: "Romeinselaan 11",
			cityen: "Kortrijk",
			cityfr: "Kortrijk",
			citynl: "Kortrijk",
		},
		{
			zip: "1050",
			street: "Av.des Saisons 118A",
			cityen: "Bruxelles-Quartier Louise",
			cityfr: "Bruxelles-Quartier Louise",
			citynl: "Bruxelles-Quartier Louise",
		},
		{
			zip: "9000",
			street: "Kortrijksesteenweg 72",
			cityen: "Gent",
			cityfr: "Gent",
			citynl: "Gent",
		},
		{
			zip: "2000",
			street: "Museumstraat 11/142",
			cityen: "Anvers",
			cityfr: "Anvers",
			citynl: "Anvers",
		},
		{
			zip: "9880",
			street: "Stationsstraat 40",
			cityen: "Aalter",
			cityfr: "Aalter",
			citynl: "Aalter",
		},
		{
			zip: "9700",
			street: "Diependale 22",
			cityen: "Oudenaarde",
			cityfr: "Oudenaarde",
			citynl: "Oudenaarde",
		},
		{
			zip: "2990",
			street: "Bredabaan 391",
			cityen: "Wuustwezel",
			cityfr: "Wuustwezel",
			citynl: "Wuustwezel",
		},
		{
			zip: "8400",
			street: "Van Iseghemlaan 59",
			cityen: "Oostende",
			cityfr: "Oostende",
			citynl: "Oostende",
		},
		{
			zip: "2100",
			street: "Bischoppenhoflaan 284",
			cityen: "Deurne",
			cityfr: "Deurne",
			citynl: "Deurne",
		},
		{
			zip: "8430",
			street: "Zeedijk 201",
			cityen: "Middelkerke",
			cityfr: "Middelkerke",
			citynl: "Middelkerke",
		},
		{
			zip: "8630",
			street: "Pauwel Heinderycxstraat 17",
			cityen: "Veurne",
			cityfr: "Veurne",
			citynl: "Veurne",
		},
		{
			zip: "8670",
			street: "C Schoolmeesterslaan 9",
			cityen: "Koksijde",
			cityfr: "Koksijde",
			citynl: "Koksijde",
		},
		{
			zip: "2610",
			street: "Kern 32",
			cityen: "Wilrijk",
			cityfr: "Wilrijk",
			citynl: "Wilrijk",
		},
		{
			zip: "2850",
			street: "Hoek 12",
			cityen: "Boom",
			cityfr: "Boom",
			citynl: "Boom",
		},
		{
			zip: "2920",
			street: "Roggebos 8",
			cityen: "Kalmthout",
			cityfr: "Kalmthout",
			citynl: "Kalmthout",
		},
		{
			zip: "9150",
			street: "Bazelstraat 32",
			cityen: "Kruibeke",
			cityfr: "Kruibeke",
			citynl: "Kruibeke",
		},
		{
			zip: "8870",
			street: "Marktstraat 4",
			cityen: "Izegem",
			cityfr: "Izegem",
			citynl: "Izegem",
		},
		{
			zip: "9051",
			street: "Luchthavenlaan 30",
			cityen: "Sint-Denijs-Westrem",
			cityfr: "Sint-Denijs-Westrem",
			citynl: "Sint-Denijs-Westrem",
		},
		{
			zip: "2660",
			street: "Zwaantjesstraat 1-3",
			cityen: "Hoboken",
			cityfr: "Hoboken",
			citynl: "Hoboken",
		},
		{
			zip: "8970",
			street: "Europalaan 1a / 11",
			cityen: "Poperinge",
			cityfr: "Poperinge",
			citynl: "Poperinge",
		},
		{
			zip: "2800",
			street: "Koningin Astridlaan 25",
			cityen: "Mechelen",
			cityfr: "Mechelen",
			citynl: "Mechelen",
		},
		{
			zip: "8300",
			street: "Kustlaan 30",
			cityen: "Knokke",
			cityfr: "Knokke",
			citynl: "Knokke",
		},
		{
			zip: "2170",
			street: "Kwadeveldenstraat 58",
			cityen: "Merksem",
			cityfr: "Merksem",
			citynl: "Merksem",
		},
		{
			zip: "8700",
			street: "Kortrijkstraat 95B",
			cityen: "Tielt",
			cityfr: "Tielt",
			citynl: "Tielt",
		},
		{
			zip: "2870",
			street: "Hoogstraat 35",
			cityen: "Puurs-Sint-Amands",
			cityfr: "Puurs-Sint-Amands",
			citynl: "Puurs-Sint-Amands",
		},
		{
			zip: "8620",
			street: "Albert I laan 202",
			cityen: "Nieuwpoort",
			cityfr: "Nieuwpoort",
			citynl: "Nieuwpoort",
		},
		{
			zip: "9900",
			street: "Blommekens 4",
			cityen: "Eeklo",
			cityfr: "Eeklo",
			citynl: "Eeklo",
		},
		{
			zip: "8370",
			street: "Zeedijk 190",
			cityen: "Blankenberge",
			cityfr: "Blankenberge",
			citynl: "Blankenberge",
		},
		{
			zip: "8560",
			street: "Bissegemstraat 13",
			cityen: "Gullegem",
			cityfr: "Gullegem",
			citynl: "Gullegem",
		},
		{
			zip: "2950",
			street: "Kapelsestraat 47/3",
			cityen: "Kapellen",
			cityfr: "Kapellen",
			citynl: "Kapellen",
		},
		{
			zip: "3001",
			street: "Tervuursevest 23/0001",
			cityen: "Heverlee",
			cityfr: "Heverlee",
			citynl: "Heverlee",
		},
		{
			zip: "1700",
			street: "Ninoofsesteenweg 62/301",
			cityen: "Dilbeek",
			cityfr: "Dilbeek",
			citynl: "Dilbeek",
		},
		{
			zip: "9400",
			street: "Abdijstraat 26",
			cityen: "Ninove",
			cityfr: "Ninove",
			citynl: "Ninove",
		},
		{
			zip: "1500",
			street: "Ninoofsesteenweg 305",
			cityen: "Halle",
			cityfr: "Halle",
			citynl: "Halle",
		},
		{
			zip: "3150",
			street: "Haardbos 6",
			cityen: "Haacht",
			cityfr: "Haacht",
			citynl: "Haacht",
		},
		{
			zip: "3300",
			street: "Nieuwstraat 6",
			cityen: "Tienen",
			cityfr: "Tienen",
			citynl: "Tienen",
		},
		{
			zip: "1930",
			street: "Parklaan 59/1",
			cityen: "Zaventem",
			cityfr: "Zaventem",
			citynl: "Zaventem",
		},
		{
			zip: "3050",
			street: "Waversebaan 248",
			cityen: "Oud-Heverlee",
			cityfr: "Oud-Heverlee",
			citynl: "Oud-Heverlee",
		},
		{
			zip: "1300",
			street: "13/31, rue Letroye",
			cityen: "Wavre",
			cityfr: "Wavre",
			citynl: "Wavre",
		},
		{
			zip: "1040",
			street: "Rue Louis Hap 171",
			cityen: "Etterbeek",
			cityfr: "Etterbeek",
			citynl: "Etterbeek",
		},
		{
			zip: "1380",
			street: "Rue d'Anogrune 140",
			cityen: "Lasne",
			cityfr: "Lasne",
			citynl: "Lasne",
		},
		{
			zip: "1180",
			street: "Rue J. Hazard, 35",
			cityen: "Uccle",
			cityfr: "Uccle",
			citynl: "Uccle",
		},
		{
			zip: "1150",
			street: "Avenue de Broqueville 12",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1780",
			street: "Koning Albert I Laan 3",
			cityen: "Wemmel",
			cityfr: "Wemmel",
			citynl: "Wemmel",
		},
		{
			zip: "1480",
			street: "Rue de la déportation 61 bte 12",
			cityen: "Tubize",
			cityfr: "Tubize",
			citynl: "Tubize",
		},
		{
			zip: "1420",
			street: "Av des Champs Clairs 24",
			cityen: "Braine-l'Alleud",
			cityfr: "Braine-l'Alleud",
			citynl: "Braine-l'Alleud",
		},
		{
			zip: "5004",
			street: "Chaussée de Louvain 367",
			cityen: "Bouge",
			cityfr: "Bouge",
			citynl: "Bouge",
		},
		{
			zip: "6042",
			street: "Rua Alfred Defuisseaux 67",
			cityen: "Charleroi",
			cityfr: "Charleroi",
			citynl: "Charleroi",
		},
		{
			zip: "5170",
			street: "rue Rochers de Fresne 6",
			cityen: "Lustin",
			cityfr: "Lustin",
			citynl: "Lustin",
		},
		{
			zip: "4280",
			street: "Rue de Cras-Avernas 12",
			cityen: "Hannut",
			cityfr: "Hannut",
			citynl: "Hannut",
		},
		{
			zip: "1400",
			street: "Avenue du Monde",
			cityen: "Nivelles",
			cityfr: "Nivelles",
			citynl: "Nivelles",
		},
		{
			zip: "1020",
			street: "Rue Felix Sterckx 71, Boite 4",
			cityen: "Laeken",
			cityfr: "Laeken",
			citynl: "Laeken",
		},
		{
			zip: "1800",
			street: "Lange Molensstraat 8",
			cityen: "Vilvoorde",
			cityfr: "Vilvoorde",
			citynl: "Vilvoorde",
		},
		{
			zip: "1030",
			street: "Chaussée de Louvain 467",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1435",
			street: "Grand' Route 3",
			cityen: "Mont Saint-Guibert",
			cityfr: "Mont Saint-Guibert",
			citynl: "Mont Saint-Guibert",
		},
		{
			zip: "5100",
			street: "Rue Mazy 125/59",
			cityen: "Jambes",
			cityfr: "Jambes",
			citynl: "Jambes",
		},
		{
			zip: "5580",
			street: "Rue de l'Aujoûle 24",
			cityen: "Eprave",
			cityfr: "Eprave",
			citynl: "Eprave",
		},
		{
			zip: "1370",
			street: "Chaussée de Wavre 78D",
			cityen: "Jodoigne",
			cityfr: "Jodoigne",
			citynl: "Jodoigne",
		},
		{
			zip: "5300",
			street: "Rue de Liège 2",
			cityen: "Thon",
			cityfr: "Thon",
			citynl: "Thon",
		},
		{
			zip: "5030",
			street: "27, Rue de la Goyette",
			cityen: "Lonzée",
			cityfr: "Lonzée",
			citynl: "Lonzée",
		},
		{
			zip: "5000",
			street: "Hotel de ville - Rue de Fer 1",
			cityen: "Namur",
			cityfr: "Namur",
			citynl: "Namur",
		},
		{
			zip: "7000",
			street: "Chaussée de Binche 177",
			cityen: "Mons",
			cityfr: "Mons",
			citynl: "Mons",
		},
		{
			zip: "7100",
			street: "Grand-Rue de Saint-Vaast 45",
			cityen: "Saint-Vaast",
			cityfr: "Saint-Vaast",
			citynl: "Saint-Vaast",
		},
		{
			zip: "1410",
			street: "Drève Richelle 161",
			cityen: "Waterloo",
			cityfr: "Waterloo",
			citynl: "Waterloo",
		},
		{
			zip: "1330",
			street: "Rue du Monastère 39",
			cityen: "Rixensart",
			cityfr: "Rixensart",
			citynl: "Rixensart",
		},
		{
			zip: "1083",
			street: "A en M Hellinckxstraat 22",
			cityen: "Ganshoren",
			cityfr: "Ganshoren",
			citynl: "Ganshoren",
		},
		{
			zip: "1090",
			street: "Avenue de l'Exposition 376/003",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1060",
			street: "Avenue de la porte de hal, 17",
			cityen: "St-Gilles",
			cityfr: "St-Gilles",
			citynl: "St-Gilles",
		},
		{
			zip: "1640",
			street: "Avenue Pré au Bois 5a",
			cityen: "Rhode-St-Genèse",
			cityfr: "Rhode-St-Genèse",
			citynl: "Rhode-St-Genèse",
		},
		{
			zip: "1390",
			street: "Allée du Bois de Bercuit 87",
			cityen: "Grez-Doiceau",
			cityfr: "Grez-Doiceau",
			citynl: "Grez-Doiceau",
		},
		{
			zip: "1070",
			street: "rue du Champion 37",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1080",
			street: "Avenue du Karreveld 2/14",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1082",
			street: "Rue Jean Baptiste Vandendriesch 12",
			cityen: "Berchem-Ste-Agathe",
			cityfr: "Berchem-Ste-Agathe",
			citynl: "Berchem-Ste-Agathe",
		},
		{
			zip: "1120",
			street: "Rue F. Vekemans 121",
			cityen: "Neder-over-Heembeek",
			cityfr: "Neder-over-Heembeek",
			citynl: "Neder-over-Heembeek",
		},
		{
			zip: "1130",
			street: "Chaussée de Haecht 1697",
			cityen: "Haren",
			cityfr: "Haren",
			citynl: "Haren",
		},
		{
			zip: "1140",
			street: "rue du Maquis 71",
			cityen: "Evere",
			cityfr: "Evere",
			citynl: "Evere",
		},
		{
			zip: "1160",
			street: "Avenue Lebon 98/9",
			cityen: "Auderghem",
			cityfr: "Auderghem",
			citynl: "Auderghem",
		},
		{
			zip: "1170",
			street: "Chaussée de la Hulpe 150",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "3000",
			street: "Naamsestraat 37",
			cityen: "Leuven",
			cityfr: "Leuven",
			citynl: "Leuven",
		},
		{
			zip: "2018",
			street: "Dendermondestraat 18",
			cityen: "Antwerpen",
			cityfr: "Antwerpen",
			citynl: "Antwerpen",
		},
		{
			zip: "3500",
			street: "Sint-Katarinalaan 7",
			cityen: "Hasselt",
			cityfr: "Hasselt",
			citynl: "Hasselt",
		},
		{
			zip: "7090",
			street: "Grand Place 16",
			cityen: "BRAINE-LE-COMTE",
			cityfr: "BRAINE-LE-COMTE",
			citynl: "BRAINE-LE-COMTE",
		},
		{
			zip: "1190",
			street: "Avenue de Roi 192",
			cityen: "Forest",
			cityfr: "Forest",
			citynl: "Forest",
		},
		{
			zip: "1950",
			street: "Avenue Reine Astrid 214",
			cityen: "Kraainem",
			cityfr: "Kraainem",
			citynl: "Kraainem",
		},
		{
			zip: "5101",
			street: "Chaussée de Marche, 511",
			cityen: "Erpent",
			cityfr: "Erpent",
			citynl: "Erpent",
		},
		{
			zip: "3700",
			street: "Vrerenstraat 94",
			cityen: "Vreren",
			cityfr: "Vreren",
			citynl: "Vreren",
		},
		{
			zip: "1210",
			street: "Avenue des Arts 18",
			cityen: "Brussels",
			cityfr: "Bruxelles",
			citynl: "Brussel",
		},
		{
			zip: "1332",
			street: "Clos Domvart, 7",
			cityen: "Genval",
			cityfr: "Genval",
			citynl: "Genval",
		},
		{
			zip: "1301",
			street: "Rue Joseph Francis 66",
			cityen: "Bierges",
			cityfr: "Bierges",
			citynl: "Bierges",
		},
		{
			zip: "1310",
			street: "Avenue reine Astrid 92",
			cityen: "La Hulpe",
			cityfr: "La Hulpe",
			citynl: "La Hulpe",
		},
		{
			zip: "1340",
			street: "Avenue du Douaire 56",
			cityen: "Ottignies",
			cityfr: "Ottignies",
			citynl: "Ottignies",
		},
		{
			zip: "1341",
			street: "Rue Nicaise 13",
			cityen: "Céroux-Mousty",
			cityfr: "Céroux-Mousty",
			citynl: "Céroux-Mousty",
		},
		{
			zip: "1342",
			street: "Av. Albert 1er 2a",
			cityen: "Ottignies (Limelette)",
			cityfr: "Ottignies (Limelette)",
			citynl: "Ottignies (Limelette)",
		},
		{
			zip: "1348",
			street: "Rue du Bosquet 3",
			cityen: "Louvain-la-Neuve",
			cityfr: "Louvain-la-Neuve",
			citynl: "Louvain-la-Neuve",
		},
		{
			zip: "1350",
			street: "Rue clouteuse Pierre, 3",
			cityen: "ORP-JAUCHE",
			cityfr: "ORP-JAUCHE",
			citynl: "ORP-JAUCHE",
		},
		{
			zip: "1360",
			street: "Place des Sauverdias 8",
			cityen: "Perwez",
			cityfr: "Perwez",
			citynl: "Perwez",
		},
		{
			zip: "1367",
			street: "Rue Petit Warichet 9",
			cityen: "Ramillies",
			cityfr: "Ramillies",
			citynl: "Ramillies",
		},
		{
			zip: "1325",
			street: "Chaussée de Huy 209",
			cityen: "Chaumont-Gistoux",
			cityfr: "Chaumont-Gistoux",
			citynl: "Chaumont-Gistoux",
		},
		{
			zip: "1470",
			street: "rue de Thy 50",
			cityen: "Baisy-Thy",
			cityfr: "Baisy-Thy",
			citynl: "Baisy-Thy",
		},
		{
			zip: "1440",
			street: "Parc Industriel 21/a",
			cityen: "Wauthier-Braine",
			cityfr: "Wauthier-Braine",
			citynl: "Wauthier-Braine",
		},
		{
			zip: "1421",
			street: "Rue de Hal 58",
			cityen: "Ophain-Bois-Seigneur-Isaac",
			cityfr: "Ophain-Bois-Seigneur-Isaac",
			citynl: "Ophain-Bois-Seigneur-Isaac",
		},
		{
			zip: "1428",
			street: "Rue Raymond Lebleux",
			cityen: "Lillois",
			cityfr: "Lillois",
			citynl: "Lillois",
		},
		{
			zip: "1430",
			street: "Chaussée de Mons 35",
			cityen: "Rebecq",
			cityfr: "Rebecq",
			citynl: "Rebecq",
		},
		{
			zip: "1450",
			street: "Rue du Bois des Pauvres 2",
			cityen: "Chastre",
			cityfr: "Chastre",
			citynl: "Chastre",
		},
		{
			zip: "1457",
			street: "Rue Abbesse 22",
			cityen: "Nil-St-Vincent",
			cityfr: "Nil-St-Vincent",
			citynl: "Nil-St-Vincent",
		},
		{
			zip: "1460",
			street: "Rue du Bois 12",
			cityen: "Ittre",
			cityfr: "Ittre",
			citynl: "Ittre",
		},
		{
			zip: "1472",
			street: "Chaussée de Bruxelles 23 (sur N5)",
			cityen: "Vieux Genappe",
			cityfr: "Vieux Genappe",
			citynl: "Vieux Genappe",
		},
		{
			zip: "1473",
			street: "Rue Reine Astrid 26",
			cityen: "Glabais",
			cityfr: "Glabais",
			citynl: "Glabais",
		},
		{
			zip: "1490",
			street: "Avenue de Wisterzée 48 b17",
			cityen: "Court-Saint-Etienne",
			cityfr: "Court-Saint-Etienne",
			citynl: "Court-Saint-Etienne",
		},
		{
			zip: "1495",
			street: "Rue Jumeree 66",
			cityen: "Villers-la-Ville",
			cityfr: "Villers-la-Ville",
			citynl: "Villers-la-Ville",
		},
		{
			zip: "1501",
			street: "Nachtegaalstraat 106",
			cityen: "Halle",
			cityfr: "Halle",
			citynl: "Halle",
		},
		{
			zip: "1502",
			street: "Claesplein 18",
			cityen: "Lembeek",
			cityfr: "Lembeek",
			citynl: "Lembeek",
		},
		{
			zip: "1790",
			street: "Brusselbaan 110",
			cityen: "Affligem",
			cityfr: "Affligem",
			citynl: "Affligem",
		},
		{
			zip: "1540",
			street: "Boesmolenstraat 16C",
			cityen: "Herne",
			cityfr: "Herne",
			citynl: "Herne",
		},
		{
			zip: "1850",
			street: "Lapmolen 5",
			cityen: "Grimbergen",
			cityfr: "Grimbergen",
			citynl: "Grimbergen",
		},
		{
			zip: "1560",
			street: "Gemeenteplein 7",
			cityen: "Hoeilaart",
			cityfr: "Hoeilaart",
			citynl: "Hoeilaart",
		},
		{
			zip: "1570",
			street: "nieuwsraat",
			cityen: "galmaarden",
			cityfr: "galmaarden",
			citynl: "galmaarden",
		},
		{
			zip: "1600",
			street: "Bergensesteenweg 423",
			cityen: "Sint-Pieters-Leeuw",
			cityfr: "Sint-Pieters-Leeuw",
			citynl: "Sint-Pieters-Leeuw",
		},
		{
			zip: "1601",
			street: "Avenue Paul Gilson 15",
			cityen: "Ruisbroek",
			cityfr: "Ruisbroek",
			citynl: "Ruisbroek",
		},
		{
			zip: "1602",
			street: "Postweg 119",
			cityen: "Vlezenbeek",
			cityfr: "Vlezenbeek",
			citynl: "Vlezenbeek",
		},
		{
			zip: "1620",
			street: "Avenue de Beersel 129",
			cityen: "Drogenbos",
			cityfr: "Drogenbos",
			citynl: "Drogenbos",
		},
		{
			zip: "1630",
			street: "Rue de L'Eglise 1",
			cityen: "Linkebeek",
			cityfr: "Linkebeek",
			citynl: "Linkebeek",
		},
		{
			zip: "1650",
			street: "Laarheidestraat 91",
			cityen: "Beersel",
			cityfr: "Beersel",
			citynl: "Beersel",
		},
		{
			zip: "1652",
			street: "Pastoor Bolsstraat 20",
			cityen: "Alsemberg",
			cityfr: "Alsemberg",
			citynl: "Alsemberg",
		},
		{
			zip: "1653",
			street: "Alsembergsesteenweg 570",
			cityen: "Dworp",
			cityfr: "Dworp",
			citynl: "Dworp",
		},
		{
			zip: "1670",
			street: "Terkammenstraat 22",
			cityen: "Pepingen",
			cityfr: "Pepingen",
			citynl: "Pepingen",
		},
		{
			zip: "1701",
			street: "Mussebeeklaan 27",
			cityen: "Dilbeek",
			cityfr: "Dilbeek",
			citynl: "Dilbeek",
		},
		{
			zip: "1702",
			street: "Noordkustlaan 16C",
			cityen: "Groot-Bijgaarden",
			cityfr: "Groot-Bijgaarden",
			citynl: "Groot-Bijgaarden",
		},
		{
			zip: "1703",
			street: "Ninoofsesteenweg 1036",
			cityen: "Schepdaal",
			cityfr: "Schepdaal",
			citynl: "Schepdaal",
		},
		{
			zip: "1730",
			street: "Waarbeek 15",
			cityen: "Asse",
			cityfr: "Asse",
			citynl: "Asse",
		},
		{
			zip: "1731",
			street: "Brusselsesteenweg 615",
			cityen: "Zellik",
			cityfr: "Zellik",
			citynl: "Zellik",
		},
		{
			zip: "1740",
			street: "Bodegemstraat 15",
			cityen: "Ternat",
			cityfr: "Ternat",
			citynl: "Ternat",
		},
		{
			zip: "1741",
			street: "Fossebaan 71",
			cityen: "Wambeek",
			cityfr: "Wambeek",
			citynl: "Wambeek",
		},
		{
			zip: "1742",
			street: "Assesteenweg 228",
			cityen: "Ternat",
			cityfr: "Ternat",
			citynl: "Ternat",
		},
		{
			zip: "1745",
			street: "Perreveld 8",
			cityen: "Opwijk",
			cityfr: "Opwijk",
			citynl: "Opwijk",
		},
		{
			zip: "1750",
			street: "Olmenlaan 37,",
			cityen: "Lennik",
			cityfr: "Lennik",
			citynl: "Lennik",
		},
		{
			zip: "1755",
			street: "Patattestraat 66",
			cityen: "Kester",
			cityfr: "Kester",
			citynl: "Kester",
		},
		{
			zip: "1760",
			street: "Pamelse Klei 7",
			cityen: "Roosdaal",
			cityfr: "Roosdaal",
			citynl: "Roosdaal",
		},
		{
			zip: "1770",
			street: "Affligemsestraat 443",
			cityen: "Liedekerke",
			cityfr: "Liedekerke",
			citynl: "Liedekerke",
		},
		{
			zip: "1785",
			street: "MIDDELSTRAAT",
			cityen: "Merchtem",
			cityfr: "Merchtem",
			citynl: "Merchtem",
		},
		{
			zip: "1853",
			street: "Tulpenlaan 7A",
			cityen: "Strombeek-Bever",
			cityfr: "Strombeek-Bever",
			citynl: "Strombeek-Bever",
		},
		{
			zip: "1860",
			street: "Krogstraat 87",
			cityen: "Meise",
			cityfr: "Meise",
			citynl: "Meise",
		},
		{
			zip: "1820",
			street: "Haachtsesteenweg 105",
			cityen: "Steenokkerzeel",
			cityfr: "Steenokkerzeel",
			citynl: "Steenokkerzeel",
		},
		{
			zip: "1840",
			street: "Mechelsestraat 20",
			cityen: "Londerzeel",
			cityfr: "Londerzeel",
			citynl: "Londerzeel",
		},
		{
			zip: "1852",
			street: "Daalstraat 100",
			cityen: "Beigem",
			cityfr: "Beigem",
			citynl: "Beigem",
		},
		{
			zip: "1861",
			street: "Valkebeekstraat 24",
			cityen: "Wolvertem",
			cityfr: "Wolvertem",
			citynl: "Wolvertem",
		},
		{
			zip: "1880",
			street: "Verbindingsweg 41",
			cityen: "Kapelle-op-den-Bos",
			cityfr: "Kapelle-op-den-Bos",
			citynl: "Kapelle-op-den-Bos",
		},
		{
			zip: "1910",
			street: "Haachtsesteenweg, 135",
			cityen: "Kampenhout",
			cityfr: "Kampenhout",
			citynl: "Kampenhout",
		},
		{
			zip: "1932",
			street: "Wannenveld 3",
			cityen: "Zaventem",
			cityfr: "Zaventem",
			citynl: "Zaventem",
		},
		{
			zip: "1933",
			street: "J. De Bruestraat 11 bus 4",
			cityen: "Sterrebeek",
			cityfr: "Sterrebeek",
			citynl: "Sterrebeek",
		},
		{
			zip: "1970",
			street: "Av. de Burbure 134A",
			cityen: "Wezembeek-Oppem",
			cityfr: "Wezembeek-Oppem",
			citynl: "Wezembeek-Oppem",
		},
		{
			zip: "1980",
			street: "Brusselsesteenweg 420",
			cityen: "Eppegem",
			cityfr: "Eppegem",
			citynl: "Eppegem",
		},
		{
			zip: "1981",
			street: "Tervuursesteenweg 257",
			cityen: "Hofstade",
			cityfr: "Hofstade",
			citynl: "Hofstade",
		},
		{
			zip: "1982",
			street: "Tervuursesteenweg 635/1",
			cityen: "Elewijt",
			cityfr: "Elewijt",
			citynl: "Elewijt",
		},
		{
			zip: "2200",
			street: "Augustijnelaan, 87 bus 104",
			cityen: "Herentals",
			cityfr: "Herentals",
			citynl: "Herentals",
		},
		{
			zip: "2300",
			street: "Campus Blairon 445",
			cityen: "Turnhout",
			cityfr: "Turnhout",
			citynl: "Turnhout",
		},
		{
			zip: "2440",
			street: "Pas 80 b7",
			cityen: "Geel",
			cityfr: "Geel",
			citynl: "Geel",
		},
		{
			zip: "2500",
			street: "Berlaarsestraat 2",
			cityen: "Lier",
			cityfr: "Lier",
			citynl: "Lier",
		},
		{
			zip: "2220",
			street: "Bergstraat 11",
			cityen: "Heist-op-den-Berg",
			cityfr: "Heist-op-den-Berg",
			citynl: "Heist-op-den-Berg",
		},
		{
			zip: "2640",
			street: "Liersesteenweg 193",
			cityen: "Mortsel",
			cityfr: "Mortsel",
			citynl: "Mortsel",
		},
		{
			zip: "2180",
			street: "Frans Standaertlei 2",
			cityen: "Ekeren",
			cityfr: "Ekeren",
			citynl: "Ekeren",
		},
		{
			zip: "2390",
			street: "Epicealaan 12",
			cityen: "Malle",
			cityfr: "Malle",
			citynl: "Malle",
		},
		{
			zip: "2930",
			street: "Bredabaan 260",
			cityen: "Brasschaat",
			cityfr: "Brasschaat",
			citynl: "Brasschaat",
		},
		{
			zip: "9100",
			street: "Bekelstraat 106",
			cityen: "Sint-Niklaas",
			cityfr: "Sint-Niklaas",
			citynl: "Sint-Niklaas",
		},
		{
			zip: "9120",
			street: "Ciamberlanidreef(BEV) 2",
			cityen: "Beveren-Waas",
			cityfr: "Beveren-Waas",
			citynl: "Beveren-Waas",
		},
		{
			zip: "9160",
			street: "Vrijheidsplein 19 b1",
			cityen: "Lokeren",
			cityfr: "Lokeren",
			citynl: "Lokeren",
		},
		{
			zip: "9200",
			street: "Sint-Gillislaan 161",
			cityen: "Dendermonte",
			cityfr: "Dendermonte",
			citynl: "Dendermonte",
		},
		{
			zip: "2540",
			street: "Kapelstraat 96",
			cityen: "Hove",
			cityfr: "Hove",
			citynl: "Hove",
		},
		{
			zip: "3140",
			street: "Gemeenteplein 13/1",
			cityen: "Keerbergen",
			cityfr: "Keerbergen",
			citynl: "Keerbergen",
		},
		{
			zip: "2940",
			street: "Kerkstraat 73",
			cityen: "Stabroek-Hoevenen",
			cityfr: "Stabroek-Hoevenen",
			citynl: "Stabroek-Hoevenen",
		},
		{
			zip: "2970",
			street: "Pater Nuyenslaan 39",
			cityen: "Schilde",
			cityfr: "Schilde",
			citynl: "Schilde",
		},
		{
			zip: "2030",
			street: "Noorderlaan 104 F",
			cityen: "Antwerpen",
			cityfr: "Antwerpen",
			citynl: "Antwerpen",
		},
		{
			zip: "2050",
			street: "Blancefloerlaan 50",
			cityen: "Antwerpen",
			cityfr: "Antwerpen",
			citynl: "Antwerpen",
		},
		{
			zip: "2060",
			street: "De Coninckplein 30",
			cityen: "Antwerpen",
			cityfr: "Antwerpen",
			citynl: "Antwerpen",
		},
		{
			zip: "2880",
			street: "Bovenstraat 162",
			cityen: "Bornem",
			cityfr: "Bornem",
			citynl: "Bornem",
		},
		{
			zip: "2070",
			street: "Dorp West 4",
			cityen: "Zwijndrecht",
			cityfr: "Zwijndrecht",
			citynl: "Zwijndrecht",
		},
		{
			zip: "2110",
			street: "Merksemsebaan 2B",
			cityen: "Wijnegem",
			cityfr: "Wijnegem",
			citynl: "Wijnegem",
		},
		{
			zip: "2140",
			street: "Lammekensstraat 26-1",
			cityen: "Borgerhout",
			cityfr: "Borgerhout",
			citynl: "Borgerhout",
		},
		{
			zip: "2150",
			street: "De Robianostraat 34",
			cityen: "BORSBEEK",
			cityfr: "BORSBEEK",
			citynl: "BORSBEEK",
		},
		{
			zip: "3970",
			street: "Stationstraat 39",
			cityen: "Leopoldsburg",
			cityfr: "Leopoldsburg",
			citynl: "Leopoldsburg",
		},
		{
			zip: "3120",
			street: "Schrieksebaan 25",
			cityen: "Tremelo",
			cityfr: "Tremelo",
			citynl: "Tremelo",
		},
		{
			zip: "9220",
			street: "Damstraat 5",
			cityen: "Hamme",
			cityfr: "Hamme",
			citynl: "Hamme",
		},
		{
			zip: "2350",
			street: "Antwerpsesteenweg 51/5",
			cityen: "Vosselaar",
			cityfr: "Vosselaar",
			citynl: "Vosselaar",
		},
		{
			zip: "3980",
			street: "Wijerstraat 2/A",
			cityen: "Tessenderlo",
			cityfr: "Tessenderlo",
			citynl: "Tessenderlo",
		},
		{
			zip: "3550",
			street: "Het Heike 20",
			cityen: "Heusden-Zolder",
			cityfr: "Heusden-Zolder",
			citynl: "Heusden-Zolder",
		},
		{
			zip: "2400",
			street: "De Rooy 136",
			cityen: "Mol",
			cityfr: "Mol",
			citynl: "Mol",
		},
		{
			zip: "2860",
			street: "Mechelsesteenweg 200",
			cityen: "Sint Katelijne Waver",
			cityfr: "Sint Katelijne Waver",
			citynl: "Sint Katelijne Waver",
		},
		{
			zip: "2820",
			street: "Bruinbeekstraat 23",
			cityen: "Bonheiden",
			cityfr: "Bonheiden",
			citynl: "Bonheiden",
		},
		{
			zip: "2550",
			street: "Antwerpsesteenweg, 88",
			cityen: "Kontich",
			cityfr: "Kontich",
			citynl: "Kontich",
		},
		{
			zip: "2650",
			street: "Sint-Goriksplein 8",
			cityen: "Edegem",
			cityfr: "Edegem",
			citynl: "Edegem",
		},
		{
			zip: "2627",
			street: "Provinciale Steenweg 354",
			cityen: "Schelle",
			cityfr: "Schelle",
			citynl: "Schelle",
		},
		{
			zip: "2320",
			street: "Gelmelstraat 19",
			cityen: "Hoogstraten",
			cityfr: "Hoogstraten",
			citynl: "Hoogstraten",
		},
		{
			zip: "2381",
			street: "weeldestraat",
			cityen: "WEELDE",
			cityfr: "WEELDE",
			citynl: "WEELDE",
		},
		{
			zip: "9800",
			street: "Leernsesteenweg 273",
			cityen: "Deinze",
			cityfr: "Deinze",
			citynl: "Deinze",
		},
		{
			zip: "2221",
			street: "Kloosterveldstraat 3",
			cityen: "Booischot",
			cityfr: "Booischot",
			citynl: "Booischot",
		},
		{
			zip: "2222",
			street: "Hallaarstraat 33",
			cityen: "Heist-op-den-Berg",
			cityfr: "Heist-op-den-Berg",
			citynl: "Heist-op-den-Berg",
		},
		{
			zip: "2230",
			street: "Aarschotsesteenweg 100B",
			cityen: "Herselt",
			cityfr: "Herselt",
			citynl: "Herselt",
		},
		{
			zip: "2240",
			street: "Kersenlaan 4",
			cityen: "Zandhoven",
			cityfr: "Zandhoven",
			citynl: "Zandhoven",
		},
		{
			zip: "2243",
			street: "Fatimalaan",
			cityen: "Pulle",
			cityfr: "Pulle",
			citynl: "Pulle",
		},
		{
			zip: "2260",
			street: "Meulemanslaan 8",
			cityen: "Westerloo",
			cityfr: "Westerloo",
			citynl: "Westerloo",
		},
		{
			zip: "2270",
			street: "Markt 7/002",
			cityen: "Herenthout",
			cityfr: "Herenthout",
			citynl: "Herenthout",
		},
		{
			zip: "2275",
			street: "Kerkstraat 25",
			cityen: "Lille",
			cityfr: "Lille",
			citynl: "Lille",
		},
		{
			zip: "2280",
			street: "Pulse Pad 71",
			cityen: "Grobbendonk",
			cityfr: "Grobbendonk",
			citynl: "Grobbendonk",
		},
		{
			zip: "2340",
			street: "Pastoriestraat 14",
			cityen: "Beerse",
			cityfr: "Beerse",
			citynl: "Beerse",
		},
		{
			zip: "2360",
			street: "Steenweg op Mol 116",
			cityen: "OUD-TURNHOUT",
			cityfr: "OUD-TURNHOUT",
			citynl: "OUD-TURNHOUT",
		},
		{
			zip: "2370",
			street: "Vrijheid 8",
			cityen: "Arendonk",
			cityfr: "Arendonk",
			citynl: "Arendonk",
		},
		{
			zip: "2380",
			street: "Kerkstraat 15",
			cityen: "Ravels",
			cityfr: "Ravels",
			citynl: "Ravels",
		},
		{
			zip: "3910",
			street: "Heerstraat 63",
			cityen: "Neerpelt",
			cityfr: "Neerpelt",
			citynl: "Neerpelt",
		},
		{
			zip: "2430",
			street: "Veldstraat 108",
			cityen: "Laakdal",
			cityfr: "Laakdal",
			citynl: "Laakdal",
		},
		{
			zip: "2431",
			street: "Veerledorp 28/4",
			cityen: "Laakdal",
			cityfr: "Laakdal",
			citynl: "Laakdal",
		},
		{
			zip: "2450",
			street: "Moenstraat 39",
			cityen: "Meerhout",
			cityfr: "Meerhout",
			citynl: "Meerhout",
		},
		{
			zip: "2460",
			street: "Broekstraat 77",
			cityen: "Tielen",
			cityfr: "Tielen",
			citynl: "Tielen",
		},
		{
			zip: "2470",
			street: "Markt 12",
			cityen: "Retie",
			cityfr: "Retie",
			citynl: "Retie",
		},
		{
			zip: "2480",
			street: "Markt 5",
			cityen: "Dessel",
			cityfr: "Dessel",
			citynl: "Dessel",
		},
		{
			zip: "2520",
			street: "Oudstrijdersstraat 2",
			cityen: "Oelegem",
			cityfr: "Oelegem",
			citynl: "Oelegem",
		},
		{
			zip: "2530",
			street: "Hugo Verrieststraat 12/5",
			cityen: "Boechout",
			cityfr: "Boechout",
			citynl: "Boechout",
		},
		{
			zip: "2560",
			street: "Landstraat 71",
			cityen: "Kessel",
			cityfr: "Kessel",
			citynl: "Kessel",
		},
		{
			zip: "2570",
			street: "Naalstraat 40 C",
			cityen: "Duffel",
			cityfr: "Duffel",
			citynl: "Duffel",
		},
		{
			zip: "2580",
			street: "Zoetewei 98",
			cityen: "Putte",
			cityfr: "Putte",
			citynl: "Putte",
		},
		{
			zip: "2590",
			street: "Ezenhoek 10",
			cityen: "Berlaar",
			cityfr: "Berlaar",
			citynl: "Berlaar",
		},
		{
			zip: "2600",
			street: "Prins Boudewijnlaan 14",
			cityen: "Antwerpen",
			cityfr: "Antwerpen",
			citynl: "Antwerpen",
		},
		{
			zip: "2630",
			street: "Kapellestraat, 47",
			cityen: "Aartselaar",
			cityfr: "Aartselaar",
			citynl: "Aartselaar",
		},
		{
			zip: "2830",
			street: "Overwinningsstraat 87",
			cityen: "Willebroek",
			cityfr: "Willebroek",
			citynl: "Willebroek",
		},
		{
			zip: "2890",
			street: "Oppuursdorp 1",
			cityen: "Puurs-Sint-Amands",
			cityfr: "Puurs-Sint-Amands",
			citynl: "Puurs-Sint-Amands",
		},
		{
			zip: "8200",
			street: "Koning Albert I-laan",
			cityen: "Bruges",
			cityfr: "Bruges",
			citynl: "Brugge",
		},
		{
			zip: "9070",
			street: "Dendermondesteenweg 674",
			cityen: "Destelbergen",
			cityfr: "Destelbergen",
			citynl: "Destelbergen",
		},
		{
			zip: "9230",
			street: "Schooldreef 47",
			cityen: "Wetteren",
			cityfr: "Wetteren",
			citynl: "Wetteren",
		},
		{
			zip: "2840",
			street: "Sint-Janstraat 14",
			cityen: "Reet",
			cityfr: "Reet",
			citynl: "Reet",
		},
		{
			zip: "2845",
			street: "Emile Vanderveldelaan 1",
			cityen: "Niel",
			cityfr: "Niel",
			citynl: "Niel",
		},
		{
			zip: "2861",
			street: "Zoetewei 14",
			cityen: "OLV Waver",
			cityfr: "OLV Waver",
			citynl: "OLV Waver",
		},
		{
			zip: "9280",
			street: "Baasrodestraat 140A",
			cityen: "Lebbeke",
			cityfr: "Lebbeke",
			citynl: "Lebbeke",
		},
		{
			zip: "2900",
			street: "Villerslei 14",
			cityen: "Schoten",
			cityfr: "Schoten",
			citynl: "Schoten",
		},
		{
			zip: "2910",
			street: "Kapelstraat 62",
			cityen: "Essen",
			cityfr: "Essen",
			citynl: "Essen",
		},
		{
			zip: "2960",
			street: "Hogeweg 34",
			cityen: "St Job In't Goor",
			cityfr: "St Job In't Goor",
			citynl: "St Job In't Goor",
		},
		{
			zip: "2980",
			street: "Halle-Dorp 66",
			cityen: "Zoersel",
			cityfr: "Zoersel",
			citynl: "Zoersel",
		},
		{
			zip: "3010",
			street: "Holsbeeksesteenweg 133",
			cityen: "Kessel-Lo",
			cityfr: "Kessel-Lo",
			citynl: "Kessel-Lo",
		},
		{
			zip: "3020",
			street: "Mechelsesteenweg 763",
			cityen: "Herent",
			cityfr: "Herent",
			citynl: "Herent",
		},
		{
			zip: "3040",
			street: "Priesterdelle 10",
			cityen: "Huldenberg",
			cityfr: "Huldenberg",
			citynl: "Huldenberg",
		},
		{
			zip: "3053",
			street: "Bergenstraat 72",
			cityen: "Haasrode",
			cityfr: "Haasrode",
			citynl: "Haasrode",
		},
		{
			zip: "3060",
			street: "Tervuursesteenweg 94A",
			cityen: "Bertem",
			cityfr: "Bertem",
			citynl: "Bertem",
		},
		{
			zip: "3070",
			street: "Vogelenzangstraat 123",
			cityen: "Kortenberg",
			cityfr: "Kortenberg",
			citynl: "Kortenberg",
		},
		{
			zip: "3071",
			street: "Leuvensesteenweg 587",
			cityen: "Erps-Kwerps",
			cityfr: "Erps-Kwerps",
			citynl: "Erps-Kwerps",
		},
		{
			zip: "3078",
			street: "Kruisstraat 168",
			cityen: "Everberg",
			cityfr: "Everberg",
			citynl: "Everberg",
		},
		{
			zip: "3080",
			street: "Sijsjeslaan 15",
			cityen: "Tervuren",
			cityfr: "Tervuren",
			citynl: "Tervuren",
		},
		{
			zip: "3090",
			street: "Permekedreef 15",
			cityen: "Overijse",
			cityfr: "Overijse",
			citynl: "Overijse",
		},
		{
			zip: "3110",
			street: "Walenstraat 22",
			cityen: "Rotselaar",
			cityfr: "Rotselaar",
			citynl: "Rotselaar",
		},
		{
			zip: "3200",
			street: "Nieuwrodese Steenweg 21",
			cityen: "Aarschot",
			cityfr: "Aarschot",
			citynl: "Aarschot",
		},
		{
			zip: "3111",
			street: "Eektstraat 1",
			cityen: "Wezemaal",
			cityfr: "Wezemaal",
			citynl: "Wezemaal",
		},
		{
			zip: "3130",
			street: "Prof. Scharpélaan 44",
			cityen: "Betekom",
			cityfr: "Betekom",
			citynl: "Betekom",
		},
		{
			zip: "3190",
			street: "Mouterij 8 bus 003",
			cityen: "Boortmeerbeek",
			cityfr: "Boortmeerbeek",
			citynl: "Boortmeerbeek",
		},
		{
			zip: "3210",
			street: "Houwaartstraat 134",
			cityen: "Linden",
			cityfr: "Linden",
			citynl: "Linden",
		},
		{
			zip: "3220",
			street: "Gebroeders Van Tiltstraat 35",
			cityen: "Holsbeek",
			cityfr: "Holsbeek",
			citynl: "Holsbeek",
		},
		{
			zip: "3221",
			street: "Dorp 64/b",
			cityen: "Nieuwrode",
			cityfr: "Nieuwrode",
			citynl: "Nieuwrode",
		},
		{
			zip: "3270",
			street: "August Nihoulstraat 78",
			cityen: "Scherpenheuvel",
			cityfr: "Scherpenheuvel",
			citynl: "Scherpenheuvel",
		},
		{
			zip: "3290",
			street: "Veemarkt 2",
			cityen: "Diest",
			cityfr: "Diest",
			citynl: "Diest",
		},
		{
			zip: "3360",
			street: "Oudebaan 131",
			cityen: "Korbeek-Lo",
			cityfr: "Korbeek-Lo",
			citynl: "Korbeek-Lo",
		},
		{
			zip: "3370",
			street: "Eksterstraat 62",
			cityen: "Boutersem",
			cityfr: "Boutersem",
			citynl: "Boutersem",
		},
		{
			zip: "3380",
			street: "Tiensesteenweg 179",
			cityen: "Glabbeek",
			cityfr: "Glabbeek",
			citynl: "Glabbeek",
		},
		{
			zip: "3390",
			street: "Leuvensesteenweg 264",
			cityen: "Tielt-Winge",
			cityfr: "Tielt-Winge",
			citynl: "Tielt-Winge",
		},
		{
			zip: "3400",
			street: "Spoorwegstraat 35",
			cityen: "Laar",
			cityfr: "Laar",
			citynl: "Laar",
		},
		{
			zip: "3440",
			street: "Grote Markt 7",
			cityen: "Zoutleeuw",
			cityfr: "Zoutleeuw",
			citynl: "Zoutleeuw",
		},
		{
			zip: "3450",
			street: "Oudestraat 1 bus7",
			cityen: "Geetbets",
			cityfr: "Geetbets",
			citynl: "Geetbets",
		},
		{
			zip: "3454",
			street: "Oppenstraat 29",
			cityen: "Rummen",
			cityfr: "Rummen",
			citynl: "Rummen",
		},
		{
			zip: "3510",
			street: "Diestersteenweg 196",
			cityen: "Hasselt-Kermt",
			cityfr: "Hasselt-Kermt",
			citynl: "Hasselt-Kermt",
		},
		{
			zip: "3511",
			street: "Stokrooieweg 32",
			cityen: "Hasselt",
			cityfr: "Hasselt",
			citynl: "Hasselt",
		},
		{
			zip: "3520",
			street: "Halveweg 76A",
			cityen: "Zonhoven",
			cityfr: "Zonhoven",
			citynl: "Zonhoven",
		},
		{
			zip: "3530",
			street: "Dorpstraat 11",
			cityen: "Houthalen",
			cityfr: "Houthalen",
			citynl: "Houthalen",
		},
		{
			zip: "3540",
			street: "Vanarenberglaan 1 bus 1",
			cityen: "Herk-De -Stad",
			cityfr: "Herk-De -Stad",
			citynl: "Herk-De -Stad",
		},
		{
			zip: "3560",
			street: "Kerkstraat 31/2",
			cityen: "Lummen",
			cityfr: "Lummen",
			citynl: "Lummen",
		},
		{
			zip: "3570",
			street: "Stationsstraat 112A",
			cityen: "Alken",
			cityfr: "Alken",
			citynl: "Alken",
		},
		{
			zip: "3580",
			street: "Koolmijnlaan 34/1",
			cityen: "Beringen",
			cityfr: "Beringen",
			citynl: "Beringen",
		},
		{
			zip: "3582",
			street: "Middenstraat 69",
			cityen: "Koersel",
			cityfr: "Koersel",
			citynl: "Koersel",
		},
		{
			zip: "3583",
			street: "Paalsesteenweg 323 bus 2",
			cityen: "Paal",
			cityfr: "Paal",
			citynl: "Paal",
		},
		{
			zip: "3590",
			street: "Kapelstraat 85",
			cityen: "Diepenbeek",
			cityfr: "Diepenbeek",
			citynl: "Diepenbeek",
		},
		{
			zip: "3600",
			street: "Vennestraat 118 bus 1",
			cityen: "Genk",
			cityfr: "Genk",
			citynl: "Genk",
		},
		{
			zip: "3620",
			street: "Bessemerstraat, 454",
			cityen: "Lanaken",
			cityfr: "Lanaken",
			citynl: "Lanaken",
		},
		{
			zip: "3630",
			street: "Rijksweg 388",
			cityen: "Maasmechelen",
			cityfr: "Maasmechelen",
			citynl: "Maasmechelen",
		},
		{
			zip: "3640",
			street: "Venlosesteenweg 56",
			cityen: "Kinrooi",
			cityfr: "Kinrooi",
			citynl: "Kinrooi",
		},
		{
			zip: "3650",
			street: "Broekhofstraat, 1",
			cityen: "Lanklaar",
			cityfr: "Lanklaar",
			citynl: "Lanklaar",
		},
		{
			zip: "3680",
			street: "Bleumerpoort 2",
			cityen: "Maaseik",
			cityfr: "Maaseik",
			citynl: "Maaseik",
		},
		{
			zip: "3690",
			street: "Daalstraat 1",
			cityen: "Zutendaal",
			cityfr: "Zutendaal",
			citynl: "Zutendaal",
		},
		{
			zip: "3730",
			street: "Tongersesteenweg 50",
			cityen: "Werm",
			cityfr: "Werm",
			citynl: "Werm",
		},
		{
			zip: "3740",
			street: "Stationlaan 8/5",
			cityen: "Bilzen",
			cityfr: "Bilzen",
			citynl: "Bilzen",
		},
		{
			zip: "3770",
			street: "Maastrichtersteenweg 7/1",
			cityen: "Riemst",
			cityfr: "Riemst",
			citynl: "Riemst",
		},
		{
			zip: "3800",
			street: "Sint Trudostraat 36",
			cityen: "Sint Truiden",
			cityfr: "Sint Truiden",
			citynl: "Sint Truiden",
		},
		{
			zip: "3830",
			street: "Dorpsstraat 28A/7",
			cityen: "Wellen",
			cityfr: "Wellen",
			citynl: "Wellen",
		},
		{
			zip: "3840",
			street: "Tongersesteenweg 5",
			cityen: "Borgloon",
			cityfr: "Borgloon",
			citynl: "Borgloon",
		},
		{
			zip: "3850",
			street: "Tegelrijstraat, 46",
			cityen: "Nieuwerkerken",
			cityfr: "Nieuwerkerken",
			citynl: "Nieuwerkerken",
		},
		{
			zip: "3890",
			street: "Hasselbroekstraat 183",
			cityen: "Gingelom",
			cityfr: "Gingelom",
			citynl: "Gingelom",
		},
		{
			zip: "3900",
			street: "Dorpsstraat 2",
			cityen: "Pelt",
			cityfr: "Pelt",
			citynl: "Pelt",
		},
		{
			zip: "3920",
			street: "Kerkstraat 1",
			cityen: "Lommel",
			cityfr: "Lommel",
			citynl: "Lommel",
		},
		{
			zip: "3930",
			street: "Kerkstraat 10",
			cityen: "Hamont",
			cityfr: "Hamont",
			citynl: "Hamont",
		},
		{
			zip: "3945",
			street: "Kapelstraat 6",
			cityen: "Ham",
			cityfr: "Ham",
			citynl: "Ham",
		},
		{
			zip: "3950",
			street: "Lillerlaan 138",
			cityen: "Kaulille",
			cityfr: "Kaulille",
			citynl: "Kaulille",
		},
		{
			zip: "3960",
			street: "Stationswal 24.3.1",
			cityen: "Bree",
			cityfr: "Bree",
			citynl: "Bree",
		},
		{
			zip: "3990",
			street: "Kerkveld 59",
			cityen: "Peer",
			cityfr: "Peer",
			citynl: "Peer",
		},
		{
			zip: "4000",
			street: "Rue de Joie 147",
			cityen: "Liège",
			cityfr: "Liège",
			citynl: "Liège",
		},
		{
			zip: "4130",
			street: "Place su Saucy 12 bte 13",
			cityen: "Tilff",
			cityfr: "Tilff",
			citynl: "Tilff",
		},
		{
			zip: "4053",
			street: "Avenue Long Pré 29",
			cityen: "Embourg",
			cityfr: "Embourg",
			citynl: "Embourg",
		},
		{
			zip: "4020",
			street: "Q. E. Van Beneden 14",
			cityen: "Liège",
			cityfr: "Liège",
			citynl: "Liège",
		},
		{
			zip: "4030",
			street: "Rue de Herve 659",
			cityen: "Grivegnée",
			cityfr: "Grivegnée",
			citynl: "Grivegnée",
		},
		{
			zip: "4031",
			street: "Rue Vaudrée 247",
			cityen: "Angleur",
			cityfr: "Angleur",
			citynl: "Angleur",
		},
		{
			zip: "4032",
			street: "Rue du Gravier 1",
			cityen: "Chênée",
			cityfr: "Chênée",
			citynl: "Chênée",
		},
		{
			zip: "4042",
			street: "Rue des Ragayets 32",
			cityen: "Liers",
			cityfr: "Liers",
			citynl: "Liers",
		},
		{
			zip: "4050",
			street: "Rue Vallée, 13",
			cityen: "Chaudfontaine",
			cityfr: "Chaudfontaine",
			citynl: "Chaudfontaine",
		},
		{
			zip: "4052",
			street: "Square Bellevue 11",
			cityen: "Beaufays",
			cityfr: "Beaufays",
			citynl: "Beaufays",
		},
		{
			zip: "4920",
			street: "Avenue de la Porallée 18/2",
			cityen: "Remouchamps",
			cityfr: "Remouchamps",
			citynl: "Remouchamps",
		},
		{
			zip: "6940",
			street: "rue des Dolmens 30",
			cityen: "Weris",
			cityfr: "Weris",
			citynl: "Weris",
		},
		{
			zip: "4100",
			street: "Rue de Fraigneux 14/2",
			cityen: "Boncelles",
			cityfr: "Boncelles",
			citynl: "Boncelles",
		},
		{
			zip: "4101",
			street: "Rue Joseph Wettinck 40",
			cityen: "Jemeppe-sur-Meuse",
			cityfr: "Jemeppe-sur-Meuse",
			citynl: "Jemeppe-sur-Meuse",
		},
		{
			zip: "4120",
			street: "Rue Duchene 53",
			cityen: "Neupre",
			cityfr: "Neupre",
			citynl: "Neupre",
		},
		{
			zip: "4121",
			street: "Avenue des Pins 40",
			cityen: "Neupré",
			cityfr: "Neupré",
			citynl: "Neupré",
		},
		{
			zip: "4140",
			street: "Hayen 23/A",
			cityen: "Dolembreux",
			cityfr: "Dolembreux",
			citynl: "Dolembreux",
		},
		{
			zip: "4141",
			street: "Rue des Fawes 81",
			cityen: "Louveigné",
			cityfr: "Louveigné",
			citynl: "Louveigné",
		},
		{
			zip: "4160",
			street: "Rue du Thier 6",
			cityen: "Anthisnes",
			cityfr: "Anthisnes",
			citynl: "Anthisnes",
		},
		{
			zip: "4170",
			street: "Place Leblanc 28",
			cityen: "Comblain-au-Pont",
			cityfr: "Comblain-au-Pont",
			citynl: "Comblain-au-Pont",
		},
		{
			zip: "4210",
			street: "Rue du Sart 7",
			cityen: "Marneffe",
			cityfr: "Marneffe",
			citynl: "Marneffe",
		},
		{
			zip: "4217",
			street: "Rue de Forseilles 12",
			cityen: "Heron",
			cityfr: "Heron",
			citynl: "Heron",
		},
		{
			zip: "4219",
			street: "Rue de Liège 24",
			cityen: "Wasseiges",
			cityfr: "Wasseiges",
			citynl: "Wasseiges",
		},
		{
			zip: "4257",
			street: "Rue du Centre 10",
			cityen: "Berloz",
			cityfr: "Berloz",
			citynl: "Berloz",
		},
		{
			zip: "4260",
			street: "Chaussée de Tirlemont 2D",
			cityen: "Braives",
			cityfr: "Braives",
			citynl: "Braives",
		},
		{
			zip: "4287",
			street: "Rue de la Station 112",
			cityen: "Lincent",
			cityfr: "Lincent",
			citynl: "Lincent",
		},
		{
			zip: "4300",
			street: "av. Edmond leburton, 96/2",
			cityen: "Waremme",
			cityfr: "Waremme",
			citynl: "Waremme",
		},
		{
			zip: "4342",
			street: "9 rue Louis Germeaux",
			cityen: "Hognoul",
			cityfr: "Hognoul",
			citynl: "Hognoul",
		},
		{
			zip: "4350",
			street: "Rue Nouvelle Percée, 10",
			cityen: "Remicourt",
			cityfr: "Remicourt",
			citynl: "Remicourt",
		},
		{
			zip: "4360",
			street: "Clos du Frenay, 15",
			cityen: "Oreye",
			cityfr: "Oreye",
			citynl: "Oreye",
		},
		{
			zip: "4367",
			street: "Grand Route 63a/006",
			cityen: "Crisnée",
			cityfr: "Crisnée",
			citynl: "Crisnée",
		},
		{
			zip: "4400",
			street: "Rue de Cowa 154",
			cityen: "Flemalle",
			cityfr: "Flemalle",
			citynl: "Flemalle",
		},
		{
			zip: "4430",
			street: "Rue des Anglais 6A",
			cityen: "Ans",
			cityfr: "Ans",
			citynl: "Ans",
		},
		{
			zip: "4500",
			street: "Rue Rioul 15/2",
			cityen: "Huy",
			cityfr: "Huy",
			citynl: "Huy",
		},
		{
			zip: "4460",
			street: "Chaussée de Liège 329",
			cityen: "Grâce-Hollogne",
			cityfr: "Grâce-Hollogne",
			citynl: "Grâce-Hollogne",
		},
		{
			zip: "4550",
			street: "Route du Condroz 105",
			cityen: "Nandrin",
			cityfr: "Nandrin",
			citynl: "Nandrin",
		},
		{
			zip: "4520",
			street: "Rue Roua 12A",
			cityen: "WANZE",
			cityfr: "WANZE",
			citynl: "WANZE",
		},
		{
			zip: "4540",
			street: "Rue Ernou 14",
			cityen: "Jehay",
			cityfr: "Jehay",
			citynl: "Jehay",
		},
		{
			zip: "4970",
			street: "Rue de Spa 140",
			cityen: "Francorchamps",
			cityfr: "Francorchamps",
			citynl: "Francorchamps",
		},
		{
			zip: "4557",
			street: "Rue du Montys 61",
			cityen: "Tinlot",
			cityfr: "Tinlot",
			citynl: "Tinlot",
		},
		{
			zip: "4600",
			street: "Rue Seronval 1",
			cityen: "Lanaye",
			cityfr: "Lanaye",
			citynl: "Lanaye",
		},
		{
			zip: "4607",
			street: "Chaussée des Wallons 5A/1",
			cityen: "Dalhem",
			cityfr: "Dalhem",
			citynl: "Dalhem",
		},
		{
			zip: "4608",
			street: "Mauhin 6D",
			cityen: "Dalhem",
			cityfr: "Dalhem",
			citynl: "Dalhem",
		},
		{
			zip: "4620",
			street: "Avenue des Martyrs 203,",
			cityen: "Fléron",
			cityfr: "Fléron",
			citynl: "Fléron",
		},
		{
			zip: "4624",
			street: "Rue Emile Vandervelde 1",
			cityen: "Fléron",
			cityfr: "Fléron",
			citynl: "Fléron",
		},
		{
			zip: "4630",
			street: "Rue Louis Pasteur 2",
			cityen: "Soumagne",
			cityfr: "Soumagne",
			citynl: "Soumagne",
		},
		{
			zip: "4800",
			street: "Avenue Edouard Cordonnier 131",
			cityen: "Verviers",
			cityfr: "Verviers",
			citynl: "Verviers",
		},
		{
			zip: "4960",
			street: "Rue J Steinbach 12",
			cityen: "Malmedy",
			cityfr: "Malmedy",
			citynl: "Malmedy",
		},
		{
			zip: "4650",
			street: "Rue Léopold 12",
			cityen: "Herve",
			cityfr: "Herve",
			citynl: "Herve",
		},
		{
			zip: "4651",
			street: "Place du Marché 34",
			cityen: "Battice",
			cityfr: "Battice",
			citynl: "Battice",
		},
		{
			zip: "4670",
			street: "Rue de l'Eglise 23",
			cityen: "Trembleur",
			cityfr: "Trembleur",
			citynl: "Trembleur",
		},
		{
			zip: "4671",
			street: "Rue de Saive 3",
			cityen: "Housse",
			cityfr: "Housse",
			citynl: "Housse",
		},
		{
			zip: "4680",
			street: "Rue de fexhe Slins 6",
			cityen: "Hermée",
			cityfr: "Hermée",
			citynl: "Hermée",
		},
		{
			zip: "4681",
			street: "Place Lucien Molitor, 1A/01",
			cityen: "Hermalle sous Argenteau",
			cityfr: "Hermalle sous Argenteau",
			citynl: "Hermalle sous Argenteau",
		},
		{
			zip: "4684",
			street: "Rue Michel 74",
			cityen: "Haccourt",
			cityfr: "Haccourt",
			citynl: "Haccourt",
		},
		{
			zip: "4700",
			street: "Klosterstrasse 28-30",
			cityen: "Eupen",
			cityfr: "Eupen",
			citynl: "Eupen",
		},
		{
			zip: "4750",
			street: "Am Struck 10",
			cityen: "Bütgenbach",
			cityfr: "Bütgenbach",
			citynl: "Bütgenbach",
		},
		{
			zip: "4780",
			street: "Hauptstraße 10",
			cityen: "St. Vith",
			cityfr: "St. Vith",
			citynl: "St. Vith",
		},
		{
			zip: "4783",
			street: "Schlierbach 28 A",
			cityen: "St-Vith",
			cityfr: "St-Vith",
			citynl: "St-Vith",
		},
		{
			zip: "4802",
			street: "Chaussée de Theux 83",
			cityen: "Heusy",
			cityfr: "Heusy",
			citynl: "Heusy",
		},
		{
			zip: "4820",
			street: "Place du Sablon 65",
			cityen: "Dison",
			cityfr: "Dison",
			citynl: "Dison",
		},
		{
			zip: "4840",
			street: "Rue Reine Astrid 52",
			cityen: "Welkenraedt",
			cityfr: "Welkenraedt",
			citynl: "Welkenraedt",
		},
		{
			zip: "4841",
			street: "Village 55",
			cityen: "Henri-Chapelle",
			cityfr: "Henri-Chapelle",
			citynl: "Henri-Chapelle",
		},
		{
			zip: "4845",
			street: "Bois de Mariomont 63",
			cityen: "Jalhay",
			cityfr: "Jalhay",
			citynl: "Jalhay",
		},
		{
			zip: "4851",
			street: "Place Colonel Peckham, 4",
			cityen: "Gemmenich",
			cityfr: "Gemmenich",
			citynl: "Gemmenich",
		},
		{
			zip: "4860",
			street: "Rue HUbert Halet 88",
			cityen: "Pepinster",
			cityfr: "Pepinster",
			citynl: "Pepinster",
		},
		{
			zip: "4870",
			street: "rue Lonhienne 3B",
			cityen: "Trooz",
			cityfr: "Trooz",
			citynl: "Trooz",
		},
		{
			zip: "4880",
			street: "Rue de Kierberg, 8",
			cityen: "Aubel",
			cityfr: "Aubel",
			citynl: "Aubel",
		},
		{
			zip: "4890",
			street: "2, Cour la Saulx",
			cityen: "Clermont",
			cityfr: "Clermont",
			citynl: "Clermont",
		},
		{
			zip: "4900",
			street: "Avenue de la Garde 16",
			cityen: "Spa",
			cityfr: "Spa",
			citynl: "Spa",
		},
		{
			zip: "4910",
			street: "Rue de la Chaussée 1",
			cityen: "Theux",
			cityfr: "Theux",
			citynl: "Theux",
		},
		{
			zip: "4980",
			street: "Fosse 6-8",
			cityen: "Trois Ponts",
			cityfr: "Trois Ponts",
			citynl: "Trois Ponts",
		},
		{
			zip: "5310",
			street: "Ch. de Louvain 61 a",
			cityen: "Eghezée",
			cityfr: "Eghezée",
			citynl: "Eghezée",
		},
		{
			zip: "5001",
			street: "Rue de la Haube 11",
			cityen: "Namur",
			cityfr: "Namur",
			citynl: "Namur",
		},
		{
			zip: "5002",
			street: "Chaussée de Waterloo 401",
			cityen: "Namur",
			cityfr: "Namur",
			citynl: "Namur",
		},
		{
			zip: "5020",
			street: "Chemin des Ranchauds 1",
			cityen: "Namur",
			cityfr: "Namur",
			citynl: "Namur",
		},
		{
			zip: "5060",
			street: "Grand-Place 6",
			cityen: "Auvelais",
			cityfr: "Auvelais",
			citynl: "Auvelais",
		},
		{
			zip: "6000",
			street: "Bouleverd Audent 45",
			cityen: "Charleroi",
			cityfr: "Charleroi",
			citynl: "Charleroi",
		},
		{
			zip: "5070",
			street: "Route de Saint Gérard, 14",
			cityen: "Bambois",
			cityfr: "Bambois",
			citynl: "Bambois",
		},
		{
			zip: "5080",
			street: "rue de Namur-Perwez numéro 19",
			cityen: "La Bruyère",
			cityfr: "La Bruyère",
			citynl: "La Bruyère",
		},
		{
			zip: "5081",
			street: "Rue du Trenoy 6A",
			cityen: "Sant Denis Bovesse",
			cityfr: "Sant Denis Bovesse",
			citynl: "Sant Denis Bovesse",
		},
		{
			zip: "5500",
			street: "Rue Leopold 32",
			cityen: "Dinant",
			cityfr: "Dinant",
			citynl: "Dinant",
		},
		{
			zip: "6900",
			street: "Chaussée de Liège 76",
			cityen: "Marche-en-Famenne",
			cityfr: "Marche-en-Famenne",
			citynl: "Marche-en-Famenne",
		},
		{
			zip: "5590",
			street: "Rue Charles Balthasar 85",
			cityen: "Ciney",
			cityfr: "Ciney",
			citynl: "Ciney",
		},
		{
			zip: "5570",
			street: "Rue de Dinant 85",
			cityen: "Beauraing",
			cityfr: "Beauraing",
			citynl: "Beauraing",
		},
		{
			zip: "6220",
			street: "Chaussée de Charleroi 519",
			cityen: "Fleurus",
			cityfr: "Fleurus",
			citynl: "Fleurus",
		},
		{
			zip: "5140",
			street: "Rue Pichelin 46",
			cityen: "Sombreffe",
			cityfr: "Sombreffe",
			citynl: "Sombreffe",
		},
		{
			zip: "5330",
			street: "Rue des Tilleuls 2 bt B",
			cityen: "Assesse",
			cityfr: "Assesse",
			citynl: "Assesse",
		},
		{
			zip: "5340",
			street: "rue Monjoie 4",
			cityen: "GESVES",
			cityfr: "GESVES",
			citynl: "GESVES",
		},
		{
			zip: "5350",
			street: "Rue de Ciney 168",
			cityen: "Ohey",
			cityfr: "Ohey",
			citynl: "Ohey",
		},
		{
			zip: "5360",
			street: "Rue de Skeuvre 3",
			cityen: "Natoye",
			cityfr: "Natoye",
			citynl: "Natoye",
		},
		{
			zip: "5377",
			street: "Trou du renard 9",
			cityen: "Somme-Leuze",
			cityfr: "Somme-Leuze",
			citynl: "Somme-Leuze",
		},
		{
			zip: "5380",
			street: "Rue Astrid 6",
			cityen: "Fernelmont",
			cityfr: "Fernelmont",
			citynl: "Fernelmont",
		},
		{
			zip: "6700",
			street: "Avenue de Mersch 67",
			cityen: "Arlon",
			cityfr: "Arlon",
			citynl: "Arlon",
		},
		{
			zip: "5503",
			street: "Rue de la Voie Cuivrée 26",
			cityen: "Sorinnes",
			cityfr: "Sorinnes",
			citynl: "Sorinnes",
		},
		{
			zip: "5530",
			street: "Rue du Clos-des-Manoyes 47",
			cityen: "Yvoir",
			cityfr: "Yvoir",
			citynl: "Yvoir",
		},
		{
			zip: "5544",
			street: "Rue Bac du Prince 66",
			cityen: "Agimont",
			cityfr: "Agimont",
			citynl: "Agimont",
		},
		{
			zip: "5575",
			street: "Rue de Malvoisin 38",
			cityen: "Gedinne",
			cityfr: "Gedinne",
			citynl: "Gedinne",
		},
		{
			zip: "6800",
			street: "Rue Courteroie 3",
			cityen: "Libramont",
			cityfr: "Libramont",
			citynl: "Libramont",
		},
		{
			zip: "6760",
			street: "Rue d'Arlon 18",
			cityen: "Virton",
			cityfr: "Virton",
			citynl: "Virton",
		},
		{
			zip: "5600",
			street: "Rue de France 37",
			cityen: "Philippeville",
			cityfr: "Philippeville",
			citynl: "Philippeville",
		},
		{
			zip: "5640",
			street: "Rue de Bossière 12",
			cityen: "Graux",
			cityfr: "Graux",
			citynl: "Graux",
		},
		{
			zip: "5650",
			street: "rue de la tannerie 15",
			cityen: "Walcourt",
			cityfr: "Walcourt",
			citynl: "Walcourt",
		},
		{
			zip: "6460",
			street: "Place du Prince 3",
			cityen: "Chimay",
			cityfr: "Chimay",
			citynl: "Chimay",
		},
		{
			zip: "5660",
			street: "Rue de la Fontaine 4",
			cityen: "Frasnes-lez-Couvin",
			cityfr: "Frasnes-lez-Couvin",
			citynl: "Frasnes-lez-Couvin",
		},
		{
			zip: "6001",
			street: "Avenue Marius Meurée 95",
			cityen: "Charleroi",
			cityfr: "Charleroi",
			citynl: "Charleroi",
		},
		{
			zip: "6010",
			street: "Route de Philippeville 154",
			cityen: "Couillet",
			cityfr: "Couillet",
			citynl: "Couillet",
		},
		{
			zip: "6030",
			street: "Rue de Beaumont 53",
			cityen: "Marchienne au Pont",
			cityfr: "Marchienne au Pont",
			citynl: "Marchienne au Pont",
		},
		{
			zip: "6031",
			street: "Rue Albert Camus 40",
			cityen: "Monceau-Sur-Sambre",
			cityfr: "Monceau-Sur-Sambre",
			citynl: "Monceau-Sur-Sambre",
		},
		{
			zip: "6032",
			street: "Chaussée De Thuin 139 B",
			cityen: "Mont-sur-Marchienne",
			cityfr: "Mont-sur-Marchienne",
			citynl: "Mont-sur-Marchienne",
		},
		{
			zip: "6040",
			street: "Place Albert Ier 6",
			cityen: "Jumet",
			cityfr: "Jumet",
			citynl: "Jumet",
		},
		{
			zip: "6041",
			street: "Faubourg de Bruxelles 314",
			cityen: "Gosselies",
			cityfr: "Gosselies",
			citynl: "Gosselies",
		},
		{
			zip: "6043",
			street: "Rue de la Station 6",
			cityen: "Ransart",
			cityfr: "Ransart",
			citynl: "Ransart",
		},
		{
			zip: "6060",
			street: "chaussée de Chatelet, 216",
			cityen: "GILLY",
			cityfr: "GILLY",
			citynl: "GILLY",
		},
		{
			zip: "6061",
			street: "Rue Leopold 251",
			cityen: "Montignies-sur-Sambre",
			cityfr: "Montignies-sur-Sambre",
			citynl: "Montignies-sur-Sambre",
		},
		{
			zip: "6110",
			street: "rue de bomerée 134",
			cityen: "Montigny-le-Tilleul",
			cityfr: "Montigny-le-Tilleul",
			citynl: "Montigny-le-Tilleul",
		},
		{
			zip: "6120",
			street: "Rue du Fayat, 4",
			cityen: "Jamioulx",
			cityfr: "Jamioulx",
			citynl: "Jamioulx",
		},
		{
			zip: "6140",
			street: "Rue L. Debattre 30",
			cityen: "Fontaine-l'Eveq",
			cityfr: "Fontaine-l'Eveq",
			citynl: "Fontaine-l'Eveq",
		},
		{
			zip: "6180",
			street: "Rue Général de Gaulle 12",
			cityen: "Courcelles",
			cityfr: "Courcelles",
			citynl: "Courcelles",
		},
		{
			zip: "6183",
			street: "90, rue Jules Destrée",
			cityen: "Trazegnies",
			cityfr: "Trazegnies",
			citynl: "Trazegnies",
		},
		{
			zip: "6200",
			street: "rue de Couillet 10",
			cityen: "Chatelet",
			cityfr: "Chatelet",
			citynl: "Chatelet",
		},
		{
			zip: "6210",
			street: "Chaussée de Bruxelles 402",
			cityen: "Les Bons Villers",
			cityfr: "Les Bons Villers",
			citynl: "Les Bons Villers",
		},
		{
			zip: "6211",
			street: "rue Ernest Solvay 76",
			cityen: "Les Bons Villers",
			cityfr: "Les Bons Villers",
			citynl: "Les Bons Villers",
		},
		{
			zip: "6224",
			street: "Route de Namur",
			cityen: "Wanfercee-Baulet",
			cityfr: "Wanfercee-Baulet",
			citynl: "Wanfercee-Baulet",
		},
		{
			zip: "6230",
			street: "Place Communale 7A",
			cityen: "Pont-à-celles",
			cityfr: "Pont-à-celles",
			citynl: "Pont-à-celles",
		},
		{
			zip: "6238",
			street: "Rue Navarre,28",
			cityen: "Luttre-Liberchies",
			cityfr: "Luttre-Liberchies",
			citynl: "Luttre-Liberchies",
		},
		{
			zip: "6280",
			street: "Rue du Bultia 85/11",
			cityen: "Gerpinnes",
			cityfr: "Gerpinnes",
			citynl: "Gerpinnes",
		},
		{
			zip: "6440",
			street: "Chaussée de Beaumont 43 boite 1",
			cityen: "Froidchapelle",
			cityfr: "Froidchapelle",
			citynl: "Froidchapelle",
		},
		{
			zip: "6500",
			street: "Chaussée Fernand Deliège 72",
			cityen: "Beaumont",
			cityfr: "Beaumont",
			citynl: "Beaumont",
		},
		{
			zip: "6511",
			street: "Chaussée de Charleroi 186",
			cityen: "Stree",
			cityfr: "Stree",
			citynl: "Stree",
		},
		{
			zip: "6530",
			street: "Rue T’Serstevens 51",
			cityen: "Thuin",
			cityfr: "Thuin",
			citynl: "Thuin",
		},
		{
			zip: "6534",
			street: "Rue de Marchienne 71C",
			cityen: "Gozée",
			cityfr: "Gozée",
			citynl: "Gozée",
		},
		{
			zip: "6540",
			street: "Rue d'Anderlues 46/1",
			cityen: "Lobbes",
			cityfr: "Lobbes",
			citynl: "Lobbes",
		},
		{
			zip: "6560",
			street: "Route de Mons 379A",
			cityen: "Erquelinnes",
			cityfr: "Erquelinnes",
			citynl: "Erquelinnes",
		},
		{
			zip: "6600",
			street: "Rue du Vivier 212",
			cityen: "Bastogne",
			cityfr: "Bastogne",
			citynl: "Bastogne",
		},
		{
			zip: "6840",
			street: "Rue Lucien Burnotte 27",
			cityen: "Neufchateau",
			cityfr: "Neufchateau",
			citynl: "Neufchateau",
		},
		{
			zip: "6630",
			street: "Rue de la Hardt 7a",
			cityen: "Martelange",
			cityfr: "Martelange",
			citynl: "Martelange",
		},
		{
			zip: "6690",
			street: "rue du Vieux Marché 7a",
			cityen: "Vielsalm",
			cityfr: "Vielsalm",
			citynl: "Vielsalm",
		},
		{
			zip: "6740",
			street: "Rue de Sivry 45",
			cityen: "Etalle",
			cityfr: "Etalle",
			citynl: "Etalle",
		},
		{
			zip: "6747",
			street: "Clos des Forgettes 6",
			cityen: "Saint-Léger",
			cityfr: "Saint-Léger",
			citynl: "Saint-Léger",
		},
		{
			zip: "6780",
			street: "Route d'Arlon 188a",
			cityen: "Messancy",
			cityfr: "Messancy",
			citynl: "Messancy",
		},
		{
			zip: "6791",
			street: "Pas de Loup 14",
			cityen: "Aubange-Guerlange",
			cityfr: "Aubange-Guerlange",
			citynl: "Aubange-Guerlange",
		},
		{
			zip: "6792",
			street: "Grand Place 5",
			cityen: "Halanzy",
			cityfr: "Halanzy",
			citynl: "Halanzy",
		},
		{
			zip: "6820",
			street: "Place Albert 1er 24",
			cityen: "Florenville",
			cityfr: "Florenville",
			citynl: "Florenville",
		},
		{
			zip: "6830",
			street: "Place Saint Arnould, 6",
			cityen: "Bouillon",
			cityfr: "Bouillon",
			citynl: "Bouillon",
		},
		{
			zip: "6860",
			street: "rue Saint Aubin 25",
			cityen: "Léglise",
			cityfr: "Léglise",
			citynl: "Léglise",
		},
		{
			zip: "6870",
			street: "Place de l’Abbaye 6",
			cityen: "Saint-hubert",
			cityfr: "Saint-hubert",
			citynl: "Saint-hubert",
		},
		{
			zip: "6880",
			street: "Rue de Burhaimont 14",
			cityen: "Bertrix",
			cityfr: "Bertrix",
			citynl: "Bertrix",
		},
		{
			zip: "6890",
			street: "Rue du Commerce 25",
			cityen: "Libin",
			cityfr: "Libin",
			citynl: "Libin",
		},
		{
			zip: "6920",
			street: "Rue de la Station 20A",
			cityen: "Wellin",
			cityfr: "Wellin",
			citynl: "Wellin",
		},
		{
			zip: "6929",
			street: "Rue de Porcheresse 27",
			cityen: "Gembes",
			cityfr: "Gembes",
			citynl: "Gembes",
		},
		{
			zip: "6950",
			street: "Rue de Lahaut 12",
			cityen: "Nassogne",
			cityfr: "Nassogne",
			citynl: "Nassogne",
		},
		{
			zip: "6960",
			street: "Route Des Carrieres 2",
			cityen: "Harre",
			cityfr: "Harre",
			citynl: "Harre",
		},
		{
			zip: "6980",
			street: "Place du marché 10",
			cityen: "La Roche-en-Ardenne",
			cityfr: "La Roche-en-Ardenne",
			citynl: "La Roche-en-Ardenne",
		},
		{
			zip: "6987",
			street: "Rue de Hotton, 22",
			cityen: "Rendeux",
			cityfr: "Rendeux",
			citynl: "Rendeux",
		},
		{
			zip: "6990",
			street: "Rue des Alouettes 25",
			cityen: "Hotton",
			cityfr: "Hotton",
			citynl: "Hotton",
		},
		{
			zip: "7370",
			street: "Place Verte 33",
			cityen: "Dour",
			cityfr: "Dour",
			citynl: "Dour",
		},
		{
			zip: "7012",
			street: "rue de l’Argilière",
			cityen: "Flénu",
			cityfr: "Flénu",
			citynl: "Flénu",
		},
		{
			zip: "7020",
			street: "Grand chemin de Masnuy Saint Jean 46",
			cityen: "Maisières",
			cityfr: "Maisières",
			citynl: "Maisières",
		},
		{
			zip: "7021",
			street: "Chaussée de Roeulx 1251/2b",
			cityen: "Havré",
			cityfr: "Havré",
			citynl: "Havré",
		},
		{
			zip: "7030",
			street: "Chaussée du Roi Baudouin 20A",
			cityen: "Saint-Symphonien",
			cityfr: "Saint-Symphonien",
			citynl: "Saint-Symphonien",
		},
		{
			zip: "7034",
			street: "Place d'Obourg 27a",
			cityen: "Obourg",
			cityfr: "Obourg",
			citynl: "Obourg",
		},
		{
			zip: "7040",
			street: "route Provinciale 38",
			cityen: "Quevy",
			cityfr: "Quevy",
			citynl: "Quevy",
		},
		{
			zip: "7041",
			street: "Rue Saint-Donat 3",
			cityen: "Givry",
			cityfr: "Givry",
			citynl: "Givry",
		},
		{
			zip: "7050",
			street: "Route d'Ath 458",
			cityen: "Jurbise",
			cityfr: "Jurbise",
			citynl: "Jurbise",
		},
		{
			zip: "7060",
			street: "Rue Martyrs de Soltau 27",
			cityen: "Soignies",
			cityfr: "Soignies",
			citynl: "Soignies",
		},
		{
			zip: "7850",
			street: "Rue Noir Mouchon 21 a",
			cityen: "Enghien",
			cityfr: "Enghien",
			citynl: "Enghien",
		},
		{
			zip: "7061",
			street: "Chaussee de Bruxelles 100",
			cityen: "Casteau",
			cityfr: "Casteau",
			citynl: "Casteau",
		},
		{
			zip: "7062",
			street: "Rue de la Place 5",
			cityen: "Naast",
			cityfr: "Naast",
			citynl: "Naast",
		},
		{
			zip: "7070",
			street: "rue de la Victoire 30",
			cityen: "Le Roeulx",
			cityfr: "Le Roeulx",
			citynl: "Le Roeulx",
		},
		{
			zip: "7080",
			street: "Rue Du Parc",
			cityen: "Frameries",
			cityfr: "Frameries",
			citynl: "Frameries",
		},
		{
			zip: "7181",
			street: "Chée de Nivelles 167",
			cityen: "Arquennes (Nivelles)",
			cityfr: "Arquennes (Nivelles)",
			citynl: "Arquennes (Nivelles)",
		},
		{
			zip: "7110",
			street: "Rue Balasse 138/2",
			cityen: "La Louvière",
			cityfr: "La Louvière",
			citynl: "La Louvière",
		},
		{
			zip: "7120",
			street: "Chaussée Brunehault 220",
			cityen: "Estinne - au - Mont",
			cityfr: "Estinne - au - Mont",
			citynl: "Estinne - au - Mont",
		},
		{
			zip: "7130",
			street: "Route de Mons 21",
			cityen: "Binche",
			cityfr: "Binche",
			citynl: "Binche",
		},
		{
			zip: "7134",
			street: "Rue Albert 1er 46",
			cityen: "leval-trahegnies",
			cityfr: "leval-trahegnies",
			citynl: "leval-trahegnies",
		},
		{
			zip: "7140",
			street: "Place du Marché 11",
			cityen: "Morlanwelz",
			cityfr: "Morlanwelz",
			citynl: "Morlanwelz",
		},
		{
			zip: "7160",
			street: "22, Place de l'hotel de Ville",
			cityen: "Chapelle-Lez-Herlaimont",
			cityfr: "Chapelle-Lez-Herlaimont",
			citynl: "Chapelle-Lez-Herlaimont",
		},
		{
			zip: "7170",
			street: "Rue de Gaulle 10",
			cityen: "Manage",
			cityfr: "Manage",
			citynl: "Manage",
		},
		{
			zip: "7180",
			street: "Avenue Reine Astrid 252",
			cityen: "Seneffe",
			cityfr: "Seneffe",
			citynl: "Seneffe",
		},
		{
			zip: "7190",
			street: "Rue de Restaumont 53A",
			cityen: "Ecaussinnes",
			cityfr: "Ecaussinnes",
			citynl: "Ecaussinnes",
		},
		{
			zip: "7300",
			street: "Rue de l'Eglise, 1",
			cityen: "Boussu",
			cityfr: "Boussu",
			citynl: "Boussu",
		},
		{
			zip: "7301",
			street: "Grand Rue 22",
			cityen: "Hornu",
			cityfr: "Hornu",
			citynl: "Hornu",
		},
		{
			zip: "7321",
			street: "Rue de la barque 62",
			cityen: "Blaton",
			cityfr: "Blaton",
			citynl: "Blaton",
		},
		{
			zip: "7330",
			street: "Grand rue 92",
			cityen: "St-Ghislain",
			cityfr: "St-Ghislain",
			citynl: "St-Ghislain",
		},
		{
			zip: "7331",
			street: "Av Louis Goblet 227",
			cityen: "Baudour",
			cityfr: "Baudour",
			citynl: "Baudour",
		},
		{
			zip: "7333",
			street: "Emile Mathieu 23",
			cityen: "Tertre",
			cityfr: "Tertre",
			citynl: "Tertre",
		},
		{
			zip: "7340",
			street: "Rue Clemenceau 201",
			cityen: "Colfontaine",
			cityfr: "Colfontaine",
			citynl: "Colfontaine",
		},
		{
			zip: "7380",
			street: "Rue Debast 21",
			cityen: "Quievrain",
			cityfr: "Quievrain",
			citynl: "Quievrain",
		},
		{
			zip: "7387",
			street: "Rue Maréchal Joffre, 26",
			cityen: "Fayt-le-franc",
			cityfr: "Fayt-le-franc",
			citynl: "Fayt-le-franc",
		},
		{
			zip: "7390",
			street: "Rue Jules Destrée 363",
			cityen: "Quaregnon",
			cityfr: "Quaregnon",
			citynl: "Quaregnon",
		},
		{
			zip: "7500",
			street: "Rue de la Lys 85 D",
			cityen: "Tournai",
			cityfr: "Tournai",
			citynl: "Tournai",
		},
		{
			zip: "7700",
			street: "Rue Père Damien 3",
			cityen: "Mouscron",
			cityfr: "Mouscron",
			citynl: "Mouscron",
		},
		{
			zip: "7780",
			street: "Place Sainte-Anne 14",
			cityen: "Comines",
			cityfr: "Comines",
			citynl: "Comines",
		},
		{
			zip: "7600",
			street: "rue Pont à la Faulx 87",
			cityen: "Péruwelz",
			cityfr: "Péruwelz",
			citynl: "Péruwelz",
		},
		{
			zip: "7503",
			street: "Rue des Roselières 8",
			cityen: "Froyennes",
			cityfr: "Froyennes",
			citynl: "Froyennes",
		},
		{
			zip: "7521",
			street: "Rue du coulant d'eau 16",
			cityen: "Chercq",
			cityfr: "Chercq",
			citynl: "Chercq",
		},
		{
			zip: "7604",
			street: "Rue du Pilori 8",
			cityen: "Brasmenil",
			cityfr: "Brasmenil",
			citynl: "Brasmenil",
		},
		{
			zip: "7611",
			street: "Rue du Bas Préau 22",
			cityen: "La Glanerie",
			cityfr: "La Glanerie",
			citynl: "La Glanerie",
		},
		{
			zip: "7640",
			street: "Rue du Curé",
			cityen: "Antoing",
			cityfr: "Antoing",
			citynl: "Antoing",
		},
		{
			zip: "7712",
			street: "rue des Cheminots, 18",
			cityen: "Herseaux",
			cityfr: "Herseaux",
			citynl: "Herseaux",
		},
		{
			zip: "7730",
			street: "Rue du château 19A",
			cityen: "Estaimpuis",
			cityfr: "Estaimpuis",
			citynl: "Estaimpuis",
		},
		{
			zip: "7800",
			street: "Rue du Puits Caffin 5",
			cityen: "Ath",
			cityfr: "Ath",
			citynl: "Ath",
		},
		{
			zip: "7823",
			street: "Chemin du Bonla 6",
			cityen: "Ath",
			cityfr: "Ath",
			citynl: "Ath",
		},
		{
			zip: "7830",
			street: "Rue de la Procession 20",
			cityen: "Bassilly",
			cityfr: "Bassilly",
			citynl: "Bassilly",
		},
		{
			zip: "7860",
			street: "Rue Général Freyberg 11b",
			cityen: "Lessines",
			cityfr: "Lessines",
			citynl: "Lessines",
		},
		{
			zip: "7870",
			street: "Rue du quesniau 14",
			cityen: "Montignies Lez Lens",
			cityfr: "Montignies Lez Lens",
			citynl: "Montignies Lez Lens",
		},
		{
			zip: "7880",
			street: "Rue Lieutenant Cotton 18 bte 1",
			cityen: "Flobecq",
			cityfr: "Flobecq",
			citynl: "Flobecq",
		},
		{
			zip: "7890",
			street: "Dans votre région",
			cityen: "Ellezelles",
			cityfr: "Ellezelles",
			citynl: "Ellezelles",
		},
		{
			zip: "7900",
			street: "Grand rue 21",
			cityen: "Leuze-En-Hainaut",
			cityfr: "Leuze-En-Hainaut",
			citynl: "Leuze-En-Hainaut",
		},
		{
			zip: "7911",
			street: "Rue Haute 3",
			cityen: "Frasnes-lez-Buissenal",
			cityfr: "Frasnes-lez-Buissenal",
			citynl: "Frasnes-lez-Buissenal",
		},
		{
			zip: "8600",
			street: "IJzerlaan 45",
			cityen: "Diksmuide",
			cityfr: "Diksmuide",
			citynl: "Diksmuide",
		},
		{
			zip: "9620",
			street: "De Pauwstraat 2",
			cityen: "Zottegem",
			cityfr: "Zottegem",
			citynl: "Zottegem",
		},
		{
			zip: "8210",
			street: "Clabouterie 2",
			cityen: "Zedelgem",
			cityfr: "Zedelgem",
			citynl: "Zedelgem",
		},
		{
			zip: "8420",
			street: "Stationsstraat 22",
			cityen: "De Haan",
			cityfr: "De Haan",
			citynl: "De Haan",
		},
		{
			zip: "8020",
			street: "Sportstraat 27",
			cityen: "Ruddervoorde",
			cityfr: "Ruddervoorde",
			citynl: "Ruddervoorde",
		},
		{
			zip: "8490",
			street: "Bitterstraat 30",
			cityen: "Jabbeke",
			cityfr: "Jabbeke",
			citynl: "Jabbeke",
		},
		{
			zip: "9830",
			street: "Paddenhoek 27",
			cityen: "St-Martens-Latem",
			cityfr: "St-Martens-Latem",
			citynl: "St-Martens-Latem",
		},
		{
			zip: "8480",
			street: "Oostendesteenweg 185",
			cityen: "Eernegem",
			cityfr: "Eernegem",
			citynl: "Eernegem",
		},
		{
			zip: "8660",
			street: "Dynastielaan 10",
			cityen: "De Panne",
			cityfr: "De Panne",
			citynl: "De Panne",
		},
		{
			zip: "8434",
			street: "Koning Ridderdijk, 43",
			cityen: "Westende",
			cityfr: "Westende",
			citynl: "Westende",
		},
		{
			zip: "8310",
			street: "Moerkerkse Steenweg 149",
			cityen: "St-Kruis Brugge",
			cityfr: "St-Kruis Brugge",
			citynl: "St-Kruis Brugge",
		},
		{
			zip: "8301",
			street: "Zandstrook 11",
			cityen: "Knokke-Heist",
			cityfr: "Knokke-Heist",
			citynl: "Knokke-Heist",
		},
		{
			zip: "8340",
			street: "OUDE SABTSWEG 7",
			cityen: "DAMME",
			cityfr: "DAMME",
			citynl: "DAMME",
		},
		{
			zip: "8377",
			street: "Groenestraat 13a",
			cityen: "Zuienkerke",
			cityfr: "Zuienkerke",
			citynl: "Zuienkerke",
		},
		{
			zip: "8380",
			street: "Zeebruggelaan 44",
			cityen: "Lissewege",
			cityfr: "Lissewege",
			citynl: "Lissewege",
		},
		{
			zip: "8760",
			street: "Marialoopsteenweg 32",
			cityen: "Meulebeke",
			cityfr: "Meulebeke",
			citynl: "Meulebeke",
		},
		{
			zip: "8450",
			street: "Zuidstraat 2",
			cityen: "Bredene",
			cityfr: "Bredene",
			citynl: "Bredene",
		},
		{
			zip: "8460",
			street: "Marktstraat 20 b1",
			cityen: "Oudenburg",
			cityfr: "Oudenburg",
			citynl: "Oudenburg",
		},
		{
			zip: "8470",
			street: "Dorpsstraat 157",
			cityen: "Gistel",
			cityfr: "Gistel",
			citynl: "Gistel",
		},
		{
			zip: "8501",
			street: "Waterven 8",
			cityen: "Kortrijk",
			cityfr: "Kortrijk",
			citynl: "Kortrijk",
		},
		{
			zip: "8510",
			street: "Markeplaats 9",
			cityen: "Marke",
			cityfr: "Marke",
			citynl: "Marke",
		},
		{
			zip: "8520",
			street: "Zweepstraat 53",
			cityen: "Kuurne",
			cityfr: "Kuurne",
			citynl: "Kuurne",
		},
		{
			zip: "8530",
			street: "Boerderijstraat 5",
			cityen: "Harelbeke",
			cityfr: "Harelbeke",
			citynl: "Harelbeke",
		},
		{
			zip: "8531",
			street: "Hulstedorp 18",
			cityen: "Hulste",
			cityfr: "Hulste",
			citynl: "Hulste",
		},
		{
			zip: "8540",
			street: "Sint-Rochusweg 8",
			cityen: "Deerlijk",
			cityfr: "Deerlijk",
			citynl: "Deerlijk",
		},
		{
			zip: "8550",
			street: "Avelgemstraat 37",
			cityen: "Zwevegem",
			cityfr: "Zwevegem",
			citynl: "Zwevegem",
		},
		{
			zip: "8551",
			street: "Vierkeerstraat 2 bus 2",
			cityen: "Zwevegem",
			cityfr: "Zwevegem",
			citynl: "Zwevegem",
		},
		{
			zip: "8553",
			street: "Ruiffeleindestraat 13",
			cityen: "Otegem",
			cityfr: "Otegem",
			citynl: "Otegem",
		},
		{
			zip: "8570",
			street: "Vichtsesteenweg 145",
			cityen: "Anzegem",
			cityfr: "Anzegem",
			citynl: "Anzegem",
		},
		{
			zip: "8573",
			street: "Schernaai 25",
			cityen: "Tiegem",
			cityfr: "Tiegem",
			citynl: "Tiegem",
		},
		{
			zip: "8580",
			street: "Leopoldstraat 62",
			cityen: "Avelgem",
			cityfr: "Avelgem",
			citynl: "Avelgem",
		},
		{
			zip: "8610",
			street: "Stationsstraat 62",
			cityen: "Kortemark",
			cityfr: "Kortemark",
			citynl: "Kortemark",
		},
		{
			zip: "8640",
			street: "Zwijnlandstraat 6",
			cityen: "West-Vleteren",
			cityfr: "West-Vleteren",
			citynl: "West-Vleteren",
		},
		{
			zip: "8647",
			street: "Burgemeester Pietersstraat 5",
			cityen: "Reininge",
			cityfr: "Reininge",
			citynl: "Reininge",
		},
		{
			zip: "8650",
			street: "Eug. de Grootelaan 24",
			cityen: "Houthulst",
			cityfr: "Houthulst",
			citynl: "Houthulst",
		},
		{
			zip: "8680",
			street: "Moerestraat 11 bus 1",
			cityen: "Koekelare",
			cityfr: "Koekelare",
			citynl: "Koekelare",
		},
		{
			zip: "8710",
			street: "Wakkensteenweg 67",
			cityen: "Wielsbeke",
			cityfr: "Wielsbeke",
			citynl: "Wielsbeke",
		},
		{
			zip: "8720",
			street: "Tieltstraat 50",
			cityen: "Dentergem",
			cityfr: "Dentergem",
			citynl: "Dentergem",
		},
		{
			zip: "8730",
			street: "Lijsterhoek 2",
			cityen: "Beernem",
			cityfr: "Beernem",
			citynl: "Beernem",
		},
		{
			zip: "8740",
			street: "Tieltstraat 174",
			cityen: "Pittem",
			cityfr: "Pittem",
			citynl: "Pittem",
		},
		{
			zip: "8750",
			street: "Beernemsteenweg 78",
			cityen: "Wingene",
			cityfr: "Wingene",
			citynl: "Wingene",
		},
		{
			zip: "8820",
			street: "Roeselaarseweg 12",
			cityen: "Torhout",
			cityfr: "Torhout",
			citynl: "Torhout",
		},
		{
			zip: "8755",
			street: "Kasteelstraat 10",
			cityen: "Ruiselede",
			cityfr: "Ruiselede",
			citynl: "Ruiselede",
		},
		{
			zip: "8770",
			street: "Stationsstraat 22 / 001",
			cityen: "Ingelmunster",
			cityfr: "Ingelmunster",
			citynl: "Ingelmunster",
		},
		{
			zip: "8791",
			street: "Kerkdreef 1",
			cityen: "Beveren-Leie",
			cityfr: "Beveren-Leie",
			citynl: "Beveren-Leie",
		},
		{
			zip: "8792",
			street: "Gentsewaeg 39",
			cityen: "Desselgem",
			cityfr: "Desselgem",
			citynl: "Desselgem",
		},
		{
			zip: "9600",
			street: "Abeelstraat 26A",
			cityen: "Ronse",
			cityfr: "Ronse",
			citynl: "Ronse",
		},
		{
			zip: "8793",
			street: "Posterijstraat 12",
			cityen: "Waregem",
			cityfr: "Waregem",
			citynl: "Waregem",
		},
		{
			zip: "9820",
			street: "Guldensporenpark 117A",
			cityen: "Merelbeke",
			cityfr: "Merelbeke",
			citynl: "Merelbeke",
		},
		{
			zip: "8810",
			street: "Burgemeester Callewaertlaan 134",
			cityen: "Lichtervelde",
			cityfr: "Lichtervelde",
			citynl: "Lichtervelde",
		},
		{
			zip: "8830",
			street: "Kleine Stadenstraat 120",
			cityen: "Hooglede",
			cityfr: "Hooglede",
			citynl: "Hooglede",
		},
		{
			zip: "8840",
			street: "Sint-Jansstraat 33 bus 0.2",
			cityen: "Staden",
			cityfr: "Staden",
			citynl: "Staden",
		},
		{
			zip: "8850",
			street: "Marktplein 14",
			cityen: "Aardooie",
			cityfr: "Aardooie",
			citynl: "Aardooie",
		},
		{
			zip: "8860",
			street: "Kortrijksestraat 106",
			cityen: "Lendelede",
			cityfr: "Lendelede",
			citynl: "Lendelede",
		},
		{
			zip: "8880",
			street: "Gullegemsestraat 79 busB",
			cityen: "Ledegem",
			cityfr: "Ledegem",
			citynl: "Ledegem",
		},
		{
			zip: "8890",
			street: "Kerkstraat 2/c",
			cityen: "Moorslede",
			cityfr: "Moorslede",
			citynl: "Moorslede",
		},
		{
			zip: "8930",
			street: "Ieperstraat 434/201",
			cityen: "Menen",
			cityfr: "Menen",
			citynl: "Menen",
		},
		{
			zip: "8940",
			street: "Sint Denijsplaats 3",
			cityen: "Geluwe",
			cityfr: "Geluwe",
			citynl: "Geluwe",
		},
		{
			zip: "8980",
			street: "Beselarestraat 187",
			cityen: "Beselare",
			cityfr: "Beselare",
			citynl: "Beselare",
		},
		{
			zip: "9840",
			street: "Moerkensheide 14",
			cityen: "Zevergem",
			cityfr: "Zevergem",
			citynl: "Zevergem",
		},
		{
			zip: "9250",
			street: "Grote Baan 137",
			cityen: "Waasmunster",
			cityfr: "Waasmunster",
			citynl: "Waasmunster",
		},
		{
			zip: "9030",
			street: "Kerselaarstraat 11",
			cityen: "Mariakerke",
			cityfr: "Mariakerke",
			citynl: "Mariakerke",
		},
		{
			zip: "9031",
			street: "Drieleienstraat 5",
			cityen: "Gent",
			cityfr: "Gent",
			citynl: "Gent",
		},
		{
			zip: "9032",
			street: "Evergemsesteenweg 44A",
			cityen: "Wondelgem",
			cityfr: "Wondelgem",
			citynl: "Wondelgem",
		},
		{
			zip: "9040",
			street: "Antwerpsesteenweg 253B",
			cityen: "Sint-Amandsberg",
			cityfr: "Sint-Amandsberg",
			citynl: "Sint-Amandsberg",
		},
		{
			zip: "9041",
			street: "Bredestraat, 200",
			cityen: "Oostakker",
			cityfr: "Oostakker",
			citynl: "Oostakker",
		},
		{
			zip: "9050",
			street: "Brusselsesteenweg 39",
			cityen: "Gent",
			cityfr: "Gent",
			citynl: "Gent",
		},
		{
			zip: "9052",
			street: "Heerweg - Noord 60",
			cityen: "Zwijnaarde",
			cityfr: "Zwijnaarde",
			citynl: "Zwijnaarde",
		},
		{
			zip: "9060",
			street: "Oostkade 42",
			cityen: "Zelzate",
			cityfr: "Zelzate",
			citynl: "Zelzate",
		},
		{
			zip: "9080",
			street: "Slagmanstraat 58",
			cityen: "Lochristi",
			cityfr: "Lochristi",
			citynl: "Lochristi",
		},
		{
			zip: "9090",
			street: "Hovenierstraat 36",
			cityen: "Melle",
			cityfr: "Melle",
			citynl: "Melle",
		},
		{
			zip: "9111",
			street: "Gouden Leeuwstraat 92",
			cityen: "Belsele",
			cityfr: "Belsele",
			citynl: "Belsele",
		},
		{
			zip: "9112",
			street: "Wijnveld 280 A",
			cityen: "Sinaai",
			cityfr: "Sinaai",
			citynl: "Sinaai",
		},
		{
			zip: "9130",
			street: "Walestraat",
			cityen: "Verrebroek",
			cityfr: "Verrebroek",
			citynl: "Verrebroek",
		},
		{
			zip: "9140",
			street: "Karel Nissensstraat 3",
			cityen: "Temse",
			cityfr: "Temse",
			citynl: "Temse",
		},
		{
			zip: "9170",
			street: "Kluizenhof 27",
			cityen: "Sint-Gillis-Waas",
			cityfr: "Sint-Gillis-Waas",
			citynl: "Sint-Gillis-Waas",
		},
		{
			zip: "9180",
			street: "Opperstraat 54",
			cityen: "Moerbeke",
			cityfr: "Moerbeke",
			citynl: "Moerbeke",
		},
		{
			zip: "9185",
			street: "Dahlialaan 5",
			cityen: "Wachtebeke",
			cityfr: "Wachtebeke",
			citynl: "Wachtebeke",
		},
		{
			zip: "9190",
			street: "Dorpsstraat, 21",
			cityen: "Stekene",
			cityfr: "Stekene",
			citynl: "Stekene",
		},
		{
			zip: "9240",
			street: "Kouterstraat 26",
			cityen: "Zele",
			cityfr: "Zele",
			citynl: "Zele",
		},
		{
			zip: "9255",
			street: "Kasteelstraat 177",
			cityen: "Buggenhout",
			cityfr: "Buggenhout",
			citynl: "Buggenhout",
		},
		{
			zip: "9270",
			street: "Dorpsstraat 25",
			cityen: "Laarne",
			cityfr: "Laarne",
			citynl: "Laarne",
		},
		{
			zip: "9290",
			street: "Sint-Annaplein 1",
			cityen: "Berlare",
			cityfr: "Berlare",
			citynl: "Berlare",
		},
		{
			zip: "9300",
			street: "Albert Liénartstraat 28",
			cityen: "Aalst",
			cityfr: "Aalst",
			citynl: "Aalst",
		},
		{
			zip: "9310",
			street: "Pachting 79",
			cityen: "Moorsel-Aalst",
			cityfr: "Moorsel-Aalst",
			citynl: "Moorsel-Aalst",
		},
		{
			zip: "9320",
			street: "Industrielaan 4",
			cityen: "Erembodegem",
			cityfr: "Erembodegem",
			citynl: "Erembodegem",
		},
		{
			zip: "9340",
			street: "Langenakker 24",
			cityen: "Lede",
			cityfr: "Lede",
			citynl: "Lede",
		},
		{
			zip: "9402",
			street: "Sint-Pietersstraat 5",
			cityen: "Ninove",
			cityfr: "Ninove",
			citynl: "Ninove",
		},
		{
			zip: "9420",
			street: "Oudendijk 75",
			cityen: "Burst",
			cityfr: "Burst",
			citynl: "Burst",
		},
		{
			zip: "9450",
			street: "Molenstraat 52/2",
			cityen: "Denderhoutem",
			cityfr: "Denderhoutem",
			citynl: "Denderhoutem",
		},
		{
			zip: "9470",
			street: "Populierenlaan 70",
			cityen: "Denderleeuw",
			cityfr: "Denderleeuw",
			citynl: "Denderleeuw",
		},
		{
			zip: "9500",
			street: "Heuvelstraat 100",
			cityen: "Geraardsbergen",
			cityfr: "Geraardsbergen",
			citynl: "Geraardsbergen",
		},
		{
			zip: "9506",
			street: "Neerstraat 18",
			cityen: "Geraardsbergen",
			cityfr: "Geraardsbergen",
			citynl: "Geraardsbergen",
		},
		{
			zip: "9520",
			street: "Mgr. Meulemanstraat 58",
			cityen: "Sint-Lievens-Houtem",
			cityfr: "Sint-Lievens-Houtem",
			citynl: "Sint-Lievens-Houtem",
		},
		{
			zip: "9570",
			street: "Geraardsbergenstraat 13A",
			cityen: "Lierde",
			cityfr: "Lierde",
			citynl: "Lierde",
		},
		{
			zip: "9630",
			street: "Beerlegemsebaan 26",
			cityen: "Zwalm",
			cityfr: "Zwalm",
			citynl: "Zwalm",
		},
		{
			zip: "9660",
			street: "Kruisstraat 66",
			cityen: "Brakel",
			cityfr: "Brakel",
			citynl: "Brakel",
		},
		{
			zip: "9690",
			street: "Grote Herreweg 141",
			cityen: "Kluisbergen",
			cityfr: "Kluisbergen",
			citynl: "Kluisbergen",
		},
		{
			zip: "9750",
			street: "Nederzwalmsesteenweg 40b",
			cityen: "Zingem",
			cityfr: "Zingem",
			citynl: "Zingem",
		},
		{
			zip: "9770",
			street: "Brouwerijstraat 12",
			cityen: "Kruisem",
			cityfr: "Kruisem",
			citynl: "Kruisem",
		},
		{
			zip: "9790",
			street: "Waregemseweg 113",
			cityen: "Wortegem-Petegem",
			cityfr: "Wortegem-Petegem",
			citynl: "Wortegem-Petegem",
		},
		{
			zip: "9810",
			street: "Deinzestraat 3",
			cityen: "Nazareth",
			cityfr: "Nazareth",
			citynl: "Nazareth",
		},
		{
			zip: "9831",
			street: "Wijngaard 65",
			cityen: "Sint-Martens-Latem",
			cityfr: "Sint-Martens-Latem",
			citynl: "Sint-Martens-Latem",
		},
		{
			zip: "9850",
			street: "Cyriel Buyssestraat 32",
			cityen: "Nevele",
			cityfr: "Nevele",
			citynl: "Nevele",
		},
		{
			zip: "9860",
			street: "Rollebaan 101 B",
			cityen: "Oosterzele",
			cityfr: "Oosterzele",
			citynl: "Oosterzele",
		},
		{
			zip: "9870",
			street: "Petegemstraat 69",
			cityen: "Zulte",
			cityfr: "Zulte",
			citynl: "Zulte",
		},
		{
			zip: "9990",
			street: "Koning Leopoldlaan 75",
			cityen: "Maldegem",
			cityfr: "Maldegem",
			citynl: "Maldegem",
		},
		{
			zip: "9890",
			street: "Grenadierslaan 47",
			cityen: "Gavere",
			cityfr: "Gavere",
			citynl: "Gavere",
		},
		{
			zip: "9910",
			street: "Geuzestraat 32",
			cityen: "Knesselare",
			cityfr: "Knesselare",
			citynl: "Knesselare",
		},
		{
			zip: "9920",
			street: "Sparrestraat",
			cityen: "Lovendegem",
			cityfr: "Lovendegem",
			citynl: "Lovendegem",
		},
		{
			zip: "9921",
			street: "Rozenhoed 9",
			cityen: "Vinderhoute",
			cityfr: "Vinderhoute",
			citynl: "Vinderhoute",
		},
		{
			zip: "9930",
			street: "Kleitstraat 62",
			cityen: "Zomergem",
			cityfr: "Zomergem",
			citynl: "Zomergem",
		},
		{
			zip: "9940",
			street: "Velodroomstraat 17",
			cityen: "Evergem",
			cityfr: "Evergem",
			citynl: "Evergem",
		},
		{
			zip: "9968",
			street: "Eikelstraat 6",
			cityen: "Assenede",
			cityfr: "Assenede",
			citynl: "Assenede",
		},
		{
			zip: "9970",
			street: "Moerstraat 37",
			cityen: "Kaprijke",
			cityfr: "Kaprijke",
			citynl: "Kaprijke",
		},
		{
			zip: "9971",
			street: "Gravin Mad. D'Alcantaralaan 55",
			cityen: "Lembeke",
			cityfr: "Lembeke",
			citynl: "Lembeke",
		},
		{
			zip: "9980",
			street: "Dorpsstraat 169/0001",
			cityen: "St-Laureins",
			cityfr: "St-Laureins",
			citynl: "St-Laureins",
		},
		{
			zip: "9982",
			street: "Warande 35",
			cityen: "Sint-Laureins",
			cityfr: "Sint-Laureins",
			citynl: "Sint-Laureins",
		},
		{
			zip: "9991",
			street: "Staatsbaan 2B",
			cityen: "Adegem",
			cityfr: "Adegem",
			citynl: "Adegem",
		},
	];
	const router = useRouter();
	const { t } = useTranslation("agency-result");

	const { locale } = router;
	const { auth, id: userId } = useSelector(
		(state: RootState) => state.userInfo
	);
	const { city, zip } = useSelector(
		(state: RootState) => state.stepsInfo.stepBlock.additionalAddress
	);
	const [isLoading, setIsLoading] = useState(true);
	const [open, setOpen] = useState<boolean>(false);
	const [openContactForm, setOpenContactForm] = useState<boolean>(false);
	const [selctedIdex, setSelctedIdex] = useState(-1);
	const [filteredAgencies, setFiltereAgencies] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [markersPerAgency, setMarkersPerAgency] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [properties, setProperties] = useState([]);
	const [agencyReviews, setAgencyReviews] = useState([]);
	let [reviewNumber, setReviewNumber] = useState(0);
	console.log("review number in state", reviewNumber);
	let [address, setAddress] = useState({
		city,
		zip,
	});
	const [markers, setMarkers] = useState([
		{
			type: "home",
			position: {
				lat: 4.402771,
				lng: 51.260197,
			},
			id: "home",
		},
	]);
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

	const dispatch = useDispatch();
	const [value, setValue] = useState(`${city}, ${zip}`);

	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const _getProperties = async () => {
		try {
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchAll();
	}, [address]);

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [getAgencies(), _getProperties()];
			await Promise.all(promises);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getAgencies = async () => {
		try {
			const agencies = await getAgenciesByAddress(address);
			const limitedAgecies = await getLimitedAgenciesByAddress(address, locale);
			console.log("agencyyyyy", limitedAgecies);
			const allAgency = [...agencies, ...limitedAgecies];
			const totalPages =
				allAgency.length > 0
					? allAgency.length > pageSize
						? Math.ceil(allAgency.length / pageSize)
						: 1
					: 0;
			setTotalPages(totalPages);
			setFiltereAgencies(allAgency);
			const agenciesMarkes = allAgency.map((agency) => {
				if (agency?.isLimited) {
				} else {
					const agnecyMarker = {
						type: "property",
						position: {
							lat: agency?.lat ?? 4.402771,
							lng: agency?.lng ?? 51.260197,
						},
						id: agency?.id,
					};
					const agencyProperties = agency?.properties ?? [];
					const markersOfAgency =
						agencyProperties.length > 0 &&
						agencyProperties?.map((property) => {
							let marker = {
								type: "property",
								position: {
									lat: property?.lat,
									lng: property?.lng,
								},
								id: property?.id,
							};
							return marker;
						});

					return {
						agencyId: agency?.id,
						markers:
							markersOfAgency?.length > 0
								? markersOfAgency.unshift(agnecyMarker)
								: [agnecyMarker],
					};
				}
			});

			setMarkersPerAgency(agenciesMarkes);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = (e, index) => {
		e.preventDefault();
		setCurrentPage(index);
	};

	const nextReviewMethod = () => {
		console.log("console inside next review method ", reviewNumber);
		if (reviewNumber < agencyReviews.length - 1) {
			let inc = reviewNumber + 1;
			setReviewNumber(inc);
			console.log("review number", reviewNumber);
			console.log("agency review length console", agencyReviews);
		}
	};
	const previousReviewMethod = () => {
		if (reviewNumber > 0) {
			let dec = reviewNumber - 1;
			setReviewNumber(dec);
			console.log("after set previous review", reviewNumber);
		}
	};

	const pagination = totalPages ? (
		<Pagination className="pagination">
			<PaginationLink
				onClick={(e) => handleClick(e, currentPage - 1)}
				previous
				href="#"
			/>
			{[...Array(totalPages)].map((page, i) => (
				<PaginationItem active={i === currentPage} key={i}>
					<PaginationLink onClick={(e) => handleClick(e, i)} href="#">
						{i + 1}
					</PaginationLink>
				</PaginationItem>
			))}

			<PaginationItem disabled={currentPage >= totalPages - 1}>
				<PaginationLink
					onClick={(e) => handleClick(e, currentPage + 1)}
					next
					href="#"
				/>
			</PaginationItem>
		</Pagination>
	) : (
		""
	);

	const mapProps = {
		markers: [...markers],
		is3d: false,
		onActiveMarker: (id) => onClickProperty(id),
	};

	const onClickProperty = (propertyId) => {
		setMarkers([]);
	};

	const handleAutocomplete = (el: React.ChangeEvent<HTMLInputElement>) => {
		const citydata = limitedAgenciesData;
		const inputValue = el.target.value.trim().toLowerCase();
		const inputLength = inputValue.length;
		const fitertUser =
			inputLength === 0
				? []
				: citydata.filter((agency) => {
						let city = agency?.cityfr;
						if (locale === "en") {
							city = agency?.cityen;
						} else if (locale === "nl") {
							city = agency?.citynl;
						} else {
							city = agency?.cityfr;
						}

						if (
							city.toLowerCase().slice(0, inputLength) === inputValue ||
							agency?.zip.toLowerCase().slice(0, inputLength) === inputValue
						) {
							return agency;
						}
				  });
		setSearchSuggestions(fitertUser);
		setValue(el.target.value);
	};

	const handleSelectAddress = (index: number) => {
		const currentAgencyAddress = searchSuggestions[index];
		let city =
			locale === "en"
				? currentAgencyAddress?.cityen
				: locale === "nl"
				? currentAgencyAddress?.citynl
				: currentAgencyAddress?.cityfr;
		const addressDeStructure = city + "," + currentAgencyAddress?.zip;
		setValue(addressDeStructure);

		const dataForNextStep = {
			city,
			zip: currentAgencyAddress?.zip,
		};
		const sendData = {
			location: {},
			infoFromAutoComplete: `${currentAgencyAddress?.street}, ${currentAgencyAddress?.zip}, ${city}`,
			additionalAddress: dataForNextStep,
		};
		setSearchSuggestions([]);
		dispatch(openMainStepsAction(sendData));
	};

	const onClickSearchButton = () => {
		setAddress({ city, zip });
	};

	const openDetail = async (index) => {
		if (selctedIdex !== index || !open) {
			const expandedAgency = filteredAgencies[index];
			console.log("expended agenices", expandedAgency.rating);

			setAgencyReviews(expandedAgency.rating.reviews);
			if (expandedAgency?.isLimited) {
				const address = `${expandedAgency?.street} ${expandedAgency?.street_number}, ${expandedAgency?.zip} ${expandedAgency?.city}`;
				const suuggestions = await getLatLongFromAddress({
					searchValue: address,
					type: "address,postcode",
				});

				const latLongs = suuggestions[0]?.location;
				const marker = {
					type: "property",
					position: {
						lat: latLongs?.lat ?? 51.260197,
						lng: latLongs?.lng ?? 4.402771,
					},
					id: expandedAgency?.id,
				};
				setMarkers([marker]);
			} else {
				const markersOfAgency = markersPerAgency?.find(
					(agency) => agency?.agencyId === expandedAgency?.id
				);
				setMarkers(markersOfAgency?.markers ?? []);
			}
			setOpen(true);
			setSelctedIdex(index);
		} else {
			setOpen(false);
		}
	};

	const goToDetailPage = (index) => {
		const agency = filteredAgencies[index];
		router.push(
			(agency?.isLimited ? "limited-agency/" : "registered-agency/") +
				agency?.id
		);
	};

	const closeContactForm = () => {
		setOpenContactForm(!openContactForm);
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<HeaderContainer title="compare agency result" />
			<div className=" w-100 compare-agency-result">
				<div className="imageContanter d-flex">
					<img
						className="main-image"
						src={compareAgencyImage}
						alt="compareAgencyImage"
					/>
				</div>
				<div className="agency-result-container justify-content-center">
					<div className="result-agency">
						<p>
							{/* We analyze thousands of local agents and find the best to compete
							you! */}
							{t("p.result-agency")}
						</p>
						<div className="search-form d-flex">
							<div className=" search-input-sugguession d-flex flex-collumn">
								{/* <InputGroup> */}
								<FormControl
									placeholder="  City and State or ZIP"
									name="address"
									onChange={handleAutocomplete}
									value={value}
									autoComplete="off"
								/>
								{/* </InputGroup> */}
								{searchSuggestions.length > 0 && (
									<ListGroup
										as="ul"
										className="position-absolute"
										style={{ marginTop: "50px" }}
									>
										{searchSuggestions.map((item, index) => (
											<ListGroup.Item
												className="text-dark"
												as="li"
												onClick={() => handleSelectAddress(index)}
												key={index}
												style={{
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
													overflow: "hidden",
												}}
											>
												{(locale === "en"
													? item.cityen
													: locale === "nl"
													? item.citynl
													: item.cityfr) +
													"," +
													item.zip}
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</div>
							{/* <input type="search" onChange={(e) => fiterAgencies(e.target.value)} placeholder="Search by name"></input> */}
							<Button onClick={onClickSearchButton}>
								Search <img src={goAhead} alt="goAhead" />
							</Button>
						</div>
					</div>
					<div className="agency-container">
						{filteredAgencies?.length > 0 ? (
							filteredAgencies
								.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
								.map((agency, index, limitedAgecies) => {
									if (open) {
										const text = agencyReviews[reviewNumber]?.text;
										var review = text;
										const relative_time_description =
											agencyReviews[reviewNumber]?.relative_time_description;
										var time = relative_time_description;
										const author_name =
											agencyReviews[reviewNumber].author_name.split(" ");
										var result =
											author_name[0].charAt(0) + author_name[1].charAt(0);
									}

									return (
										<div key={index}>
											<div
												onClick={() => openDetail(index)}
												className="agency d-flex"
											>
												<div className="image-bassicInfo ">
													<img
														src={
															agency?.isLimited ? LogoImage : agency?.logo_image
														}
														alt="profile"
													/>
													<div className="agency-basicInfo">
														<span className="agency-name">
															{agency?.company_name.substring(0, 30)}
														</span>
														{!agency?.isLimited && (
															<p className="rating-row">
																{" "}
																<span className="rating"> 5.6 </span>
																<StarRatingComponent
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
																/>{" "}
																<span className="from-totla-reviews ">
																	{" "}
																	from 120 reviews{" "}
																</span>
															</p>
														)}
														{agency?.isLimited &&
															open &&
															selctedIdex === index && (
																<LimitedPartner>Limited Partner</LimitedPartner>
															)}
													</div>
												</div>
												<div className="  sold-by-agency justify-content-between">
													{agency.properties > 0 ? (
														<p>
															<span className="noof-sold">
																{" "}
																{agency?.isLimited
																	? agency?.properties_sale
																	: agency.properties.length}{" "}
															</span>{" "}
															<span className="sold-title">
																Recent sales nearby
															</span>
														</p>
													) : agency?.isLimited ? (
														<p className="no-sold-properties">
															Click here to see agency on map
														</p>
													) : (
														<p className="no-sold-properties">
															No information available
														</p>
													)}
													<img
														src={
															open && selctedIdex === index
																? closeArrow
																: openArrow
														}
														alt="arrows"
													/>
												</div>
											</div>

											{open && selctedIdex === index && (
												<div key={index} className="aency-detail-container">
													<div className="agency-detail-container-left">
														{!agency?.isLimited && (
															<div className="agency-owner-box">
																<img src={mapImage} alt="mapImage" />
																<div className="ml-2">
																	<p className="agent-name">
																		{agency.owner?.firstname}
																	</p>
																	<p className="agent-title">agency owner</p>
																</div>
															</div>
														)}
														<p className="agency-description">
															{t("p.agency-desc")}
															{/* {t("p.before-description")} {properties.length}{" "}
                              {properties.length > 1
                                ? t("p.agency-plural")
                                : t("p.agency-singular") + t("p.center")}
                              {properties.length}{" "}
                              {properties.length > 1
                                ? t("p.agency-plural")
                                : t("p.agency-singular") + t("p.after-description")} */}
														</p>
														<p>
															<div className="agency-result-rating d-flex align-items-center">
																<StarRatingComponent
																	name="rate"
																	className="custom-rate"
																	renderStarIcon={(index, value) => (
																		<img
																			className="rating-star"
																			src={
																				index <= value
																					? RatingStar
																					: RatingStarEmpty
																			}
																			alt="RatingStar"
																		/>
																	)}
																	starCount={1}
																	value={Number(
																		agencyRating(agency?.rating?.rating)
																	)}
																/>
																<span className="rating">
																	{agencyRating(agency?.rating?.rating)}
																</span>
																<img
																	className="google-img"
																	alt="google"
																	src={google}
																	style={{ objectFit: "cover" }}
																/>
																<span>
																	from {agency?.rating?.user_ratings_total}{" "}
																	reviews{" "}
																</span>

																<img
																	className="frame1"
																	alt="frame1"
																	src={frame1}
																	onClick={previousReviewMethod}
																/>
																<img
																	className="frame2"
																	alt="frame2"
																	src={frame2}
																	onClick={nextReviewMethod}
																/>
															</div>

															<div className="background-color">
																<div className="agency-result-rating d-flex align-items-center">
																	<StarRatingComponent
																		name="rate"
																		className="custom-rate"
																		renderStarIcon={(index, value) => (
																			<img
																				className="rating-star"
																				src={
																					index <= value
																						? RatingStar
																						: RatingStarEmpty
																				}
																				alt="RatingStar"
																			/>
																		)}
																		starCount={5}
																		value={Number(
																			agencyRating(agency?.rating?.rating)
																		)}
																	/>
																	<span className="experience">
																		{agency?.rating?.rating == "5"
																			? "very nice experience"
																			: agency?.rating?.rating >= "4" &&
																			  agency?.rating?.rating < 5
																			? "nice experience"
																			: agency?.rating?.rating >= "3" &&
																			  agency?.rating?.rating < 4
																			? "good"
																			: agency?.rating?.rating >= "2" &&
																			  agency?.rating?.rating < 3
																			? "satisfactory"
																			: agency?.rating?.rating >= "1" &&
																			  agency?.rating?.rating < 2
																			? "unsarifoctory"
																			: ""}
																	</span>
																</div>
																<div>
																	<p className="google-paraghaf ">{review}</p>
																</div>
																<div className="user-details">
																	<img
																		className="userIcon"
																		alt="userIcon"
																		src={userIcon}
																	/>
																	<span className="user-name">{result}</span>
																	<span className="commented-on">
																		commented on
																	</span>
																	<span>{time}</span>
																</div>
																{/* {`${t("span.sold-on")} ${
								property?.sold_rent_date
								
							}`}{" "} */}
															</div>
														</p>

														<div className="agency-links d-flex">
															<Button
																onClick={() =>
																	agency?.isLimited
																		? goToDetailPage(index)
																		: closeContactForm()
																}
															>
																{agency?.isLimited
																	? "Agency details"
																	: "Contact Thierry"}
															</Button>
															{!agency?.isLimited && (
																<Button
																	className=" detail-page-link bg-white border-0 text-primary"
																	onClick={() => goToDetailPage(index)}
																>
																	Agency details
																	<img
																		className=""
																		src={BlueGoAhead}
																		alt="BlueGoAhead"
																	/>
																</Button>
															)}
														</div>
													</div>
													<div className="agency-map-container">
														<Mapbox3dMap {...mapProps} />
														<div className="map-description">
															<p>
																{" "}
																<span></span> Properties sold by the agency{" "}
															</p>
															<p>
																{" "}
																<img
																	className="blue-star"
																	src={blueStar}
																	alt="blueStar"
																/>{" "}
																agency{" "}
															</p>
														</div>
													</div>
												</div>
											)}
										</div>
									);
								})
						) : (
							<p>
								No agencies in your area yet, They are coming to Belgiumimmo
								soon!
							</p>
						)}

						<div className="w-100 d-flex justify-content-center alighn-items-center text-center">
							{pagination}
							{/* <Pagination
								current={currentPage}
								total={totalPages}
								pageSize={pageSize}
								onChange={(page, _pageSize) => {
									setCurrentPage(page);
									setPageSize(_pageSize);
								}}
								pageSizeOptions={["5", "10", "20", "50"]}
							/> */}
							{/* <Button   className="load-more">
								<img src={loadMore} alt="loadMore" /> load more{" "}
							</Button> */}
						</div>
					</div>
				</div>
			</div>
			{openContactForm && (
				<ContactAgentModal
					show={true}
					onClose={() => setOpenContactForm(false)}
					properties={properties}
					agencyOwner={filteredAgencies[selctedIdex]?.owner?.name}
					agencyName={filteredAgencies[selctedIdex]?.company_name}
					agencyId={filteredAgencies[selctedIdex]?.id}
				/>
			)}
			{/* <FooterContainer/> */}
		</>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"dashboard-page",
				"agency-result",
				"header",
				"footer",
			])),
		},
	};
};

export default compareAgency;
