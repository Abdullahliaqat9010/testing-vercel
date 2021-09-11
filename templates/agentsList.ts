import { AgentsItem } from "../types/agents";

import LabelImmo from "../assets/images/agents/label-immo-logo.jpeg";
import ThierryAvatar from "../assets/images/agents/thierry-hermanne.jpeg";

import WawImmo from "../assets/images/agents/waw-immo-logo.jpeg";
import AlexandreAvatar from "../assets/images/agents/alexandre-legrand.jpeg";

import Bourse from "../assets/images/agents/bourse-logo.jpeg";
import FabienneAvatar from "../assets/images/agents/fabienne.jpeg";

import Bertholome from "../assets/images/agents/bertholome-logo.jpeg";
import BertholomeAvatar from "../assets/images/agents/bertholome.jpeg";

import EcoImmo from "../assets/images/agents/logo_eco-immo.jpeg";
import AngeloAvatar from "../assets/images/agents/angelo-ponente.jpeg";

import RenatoMammo from "../assets/images/agents/logo-renato-mammo.jpeg";
import RenatoMammoAvatar from "../assets/images/agents/renato-mammo.jpeg";

import AgencyTest from "../assets/images/agents/test-agency.png";
import AgencyTestMobile from "../assets/images/agents/test-agency.png";
import TestAvatar from "../assets/images/no-photo.png";

export const agentsList: AgentsItem[] = [
	{
		id: 1,
		title: "Label Immo sprl",
		tag: "Label Immo sprl",
		place_id: "ChIJ3SO8P3SpwUcRx8RPCBX4Blg",
		url: "label-immo",
		phone: "+32 4 372 07 20",
		logo: LabelImmo,
		logoMobile: LabelImmo,
		count: 17,
		schedule: "Mon-Fri: 9AM-12:30PM, 1:30PM-5:30PM Sat: 10AM-1PM",
		website: "https://www.labelimmo.be",
		agencyAddress: "Chau. de Napoléon 3, 4500 Huy, Belgium",
		location: {
			lat: 50.5166086,
			lng: 5.2350217,
		},
		email: "info@labelimmo.be",
		moreInfo: {
			agentName: "Thierry",
			agentSurname: "Hermanne",
			position: "Agency owner",
			avatar: ThierryAvatar,
			desc: `L’immobilier ne s’arrête pas à la vente ou à l’achat d’un bien, c’est avant tout une aventure humaine ! Nos agences situées à Ans et Huy vous accompagnent dans toutes les étapes de vos projets immobiliers sur toute la province de Liège.
      Notre équipe de professionnels vous conseille et accompagne, que vous souhaitiez acheter, vendre ou louer.
      Acheter un bien
      Trouvez votre bonheur parmi notre large catalogue de maisons et appartements à vendre !
      Vendre un bien
      Nous mettons toute notre expertise et connaissance de l’immobilier au service de votre bien afin de le vendre rapidement et au meilleur prix
      Louer un bien
      Louer sa maison nécessite du temps et des compétences ! En confiant cette mission à une équipe de professionnels de la location immobilière, vous éviterez les mauvaises surprises !`,
		},
	},
	{
		id: 2,
		title: `WAW c'est beau`,
		tag: `WAW c'est beau`,
		place_id: "ChIJOWI8TZX5wEcR5yhWbH0-E1k",
		url: "waw-immo",
		logo: WawImmo,
		logoMobile: WawImmo,
		count: 17,
		phone: "+32 800 50 510",
		schedule: "Mon-Fri: 9AM-5PM",
		website: "https://wawcestbeau.com",
		agencyAddress: "Rue du Vieux Mayeur 51 - 4000 LIEGE",
		location: {
			lat: 50.6292036,
			lng: 5.566588299999999,
		},
		email: "info@waw.immo",
		moreInfo: {
			agentName: "Alexandre",
			agentSurname: "Legrand",
			position: "Agency owner",
			avatar: AlexandreAvatar,
			desc: `Nos biens
      Bien plus qu'un mot, Waw c'est :
      Un concept, un objectif, un service !
      Deux cibles, une même enseigne !
      WAW C'est beau pour l'exception
      WAW C'est cool pour les opportunités`,
		},
	},
	{
		id: 3,
		title: "Bourse Immobilière Belge",
		tag: "Bourse Immobilière",
		place_id: "ChIJewhN-A_6wEcRzuk24xUXZyg",
		url: "bourse-immobilière",
		logo: Bourse,
		logoMobile: Bourse,
		count: 17,
		phone: "+32 4 221 21 21",
		schedule: "Mon-Fri: 9:30AM-12:30PM, 1:30PM-5PM",
		website: "https://www.bourse-immobiliere.be",
		agencyAddress: "Voie de l'Ardenne 179, 4053 Chaudfontaine, Belgium",
		location: {
			lat: 50.5837707,
			lng: 5.617082799999999,
		},
		email: "sales@bourse-immobiliere.be",
		moreInfo: {
			agentName: "Fabienne",
			agentSurname: "Pierrée",
			position: "Agency owner",
			avatar: FabienneAvatar,
			desc: `Forte de 35 ans d’expérience, la Bourse Immobilière s’efforce chaque jour de répondre au mieux aux besoins de ses clients à travers des transactions immobilières de qualité. Son sérieux, son professionnalisme, son respect des règles édictées par l’I.P.I lui valent la confiance de la majorité des notaires et la satisfaction de sa clientèle.`,
		},
	},
	{
		id: 4,
		title: "Immobilière Bertholomé",
		tag: "Immobilière Bertholomé",
		place_id: "ChIJw_LO-FT6wEcRS0I2y3Nt85M",
		url: "immobilière-bertholomé",
		logo: Bertholome,
		logoMobile: Bertholome,
		count: 17,
		phone: "+32 4 371 97 67",
		schedule: "Mon-Fri: 9AM-1PM, 2PM-6PM",
		website: "https://www.bertholome.be",
		agencyAddress: "Rue d'Ans 116, 4000 Liège, Belgium",
		location: {
			lat: 50.6716754,
			lng: 5.5424035,
		},
		email: "info@bertholome.be",
		moreInfo: {
			agentName: "Stéphan",
			agentSurname: "Bertholomé",
			position: "Agency owner",
			avatar: BertholomeAvatar,
			desc: `The Bertholomé real estate agency offers real estate for sale and for rent, mainly in the Liège region.
      Are you a demanding owner? do you want to sell or rent your house, villa or apartment? We offer a tailor-made service that meets your requirements. When you entrust us with your property, it becomes our priority. It truly becomes our house, our villa, our apartment.
      Contact our dynamic team, and discover the care we give to each client. Our offices, located in Rocourt, are open Monday to Friday from 9 a.m. to 1 p.m. and from 2 p.m. to 6 p.m. Saturday by appointment.`,
		},
	},
	{
		id: 5,
		title: "ECO IMMO",
		tag: "ECO DEVELOPPEMENT - ECO IMMO",
		place_id: "ChIJY_1gToz7wEcRZcMRXlUJPqo",
		url: "eco-developpement-eco-immo",
		logo: EcoImmo,
		logoMobile: EcoImmo,
		count: 17,
		phone: "+32 477 64 69 38",
		schedule: "Mon-Fri: 9:30AM-5:30PM",
		agencyAddress: "Rue de la Station 3, 4430 Ans, Belgium",
		website: "http://www.eco-immo.be/",
		location: {
			lat: 50.6635702,
			lng: 5.5113576,
		},
		email: "info@eco-immo.be",
		moreInfo: {
			agentName: "Angelo",
			agentSurname: "Ponente",
			position: "Agency owner",
			avatar: AngeloAvatar,
			desc: `Notre agence immobilière offre de nombreux services immobiliers.`,
		},
	},
	{
		id: 6,
		title: "Renato Mammo",
		tag: "Renato Mammo",
		place_id: "ChIJvX3M4uf7wEcRLK5O-JcswJQ",
		url: "renato-mammo",
		logo: RenatoMammo,
		logoMobile: RenatoMammo,
		count: 17,
		phone: " +32 4 371 59 00",
		schedule: "Mon-Fri: 9:30AM-1PM, 1PM by appointment, Sat: by appointment",
		website: "https://www.renatomammo.be",
		agencyAddress: "10 Rue Giacomo Mattéoti 4460 Grâce-Hollogne",
		location: {
			lat: 50.6427346,
			lng: 5.506668299999999,
		},
		email: "info@renato-mammo.be",
		moreInfo: {
			agentName: "Renato",
			agentSurname: "Mammo",
			position: "Agency owner",
			avatar: RenatoMammoAvatar,
			desc: `Fort de son expérience acquise ces dernières années au sein du plus grand réseau immobilier et avec plus de 15 ans d’expérience dans le métier, Renato Mammo Immobilière mettra tout en œuvre pour vendre ou louer votre bien dans les meilleures conditions.`,
		},
	},
	{
		id: 99,
		title: "Test Agency",
		tag: "Test Agency",
		url: "test-agency",
		rate: "5.0",
		reviews: "120",
		schedule: "Mon-Fri: 9:30AM-1PM, 1PM by appointment, Sat: by appointment",
		website: "https://www.renatomammo.be",
		phone: "+32 4 372 07 20",
		logo: AgencyTest,
		logoMobile: AgencyTestMobile,
		count: 17,
		agencyAddress: "Test Agency",
		location: {
			lat: 48.3794,
			lng: 31.1656,
		},
		email: "test@test.test",
		moreInfo: {
			agentName: "Test",
			agentSurname: "Agency",
			position: "Agency owner",
			avatar: TestAvatar,
			desc: "test agency",
		},
	},
];
