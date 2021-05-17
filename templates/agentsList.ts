import { AgentsItem } from '../types/agents';

import LabelImmo from '../assets/images/agents/label-immo-logo.webp';
import ThierryAvatar from '../assets/images/agents/thierry-hermanne.webp';

import WawImmo from '../assets/images/agents/waw-immo-logo.webp';
import AlexandreAvatar from '../assets/images/agents/alexandre-legrand.webp';

import Bourse from '../assets/images/agents/bourse-logo.webp';
import FabienneAvatar from '../assets/images/agents/fabienne.webp';

import Bertholome from '../assets/images/agents/bertholome-logo.webp';
import BertholomeAvatar from '../assets/images/agents/bertholome.webp';

import EcoImmo from '../assets/images/agents/logo_eco-immo.webp';
import AngeloAvatar from '../assets/images/agents/angelo-ponente.webp';

import AgencyTest from '../assets/images/agents/test-agency.png';
import AgencyTestMobile from '../assets/images/agents/test-agency.png';
import TestAvatar from '../assets/images/no-photo.png';


export const agentsList: AgentsItem[] = [
  {
    id: 1,
    title: 'Label Immo',
    tag: 'Label Immo',
    rate: '5.0',
    reviews: '120',
    logo: LabelImmo,
    logoMobile: LabelImmo,
    count: 17,
    agencyAddress: 'Chaussée de Napoléon 3, 4500 Huy',
    location: {
      lat: 50.5166086,
      lng: 5.2350217
    },
    email: 'hermanne@labelimmo.be',
    nearest: true,
    moreInfo: {
      agentName: 'Thierry',
      agentSurname: 'Hermanne',
      position: 'Agency owner',
      avatar: ThierryAvatar,
      desc: ''
    }
  },
  {
    id: 2,
    title: 'WaW Immo',
    tag: 'WaW Immo',
    rate: '5.0',
    reviews: '120',
    logo: WawImmo,
    logoMobile: WawImmo,
    count: 17,
    agencyAddress: 'Rue des Ixellois 1, 4000 Liège',
    location: {
      lat: 50.6292036,
      lng: 5.566588299999999
    },
    email: 'laurence@waw.immo',
    nearest: true,
    moreInfo: {
      agentName: 'Alexandre',
      agentSurname: 'Legrand',
      position: 'Agency owner',
      avatar: AlexandreAvatar,
      desc: ''
    }
  },
  {
    id: 3,
    title: 'Bourse Immobilière',
    tag: 'Bourse Immobilière',
    rate: '5.0',
    reviews: '120',
    logo: Bourse,
    logoMobile: Bourse,
    count: 17,
    agencyAddress: "Voie de l'Ardenne 179, 4053 Chaudfontaine",
    location: {
      lat: 50.5837707,
      lng: 5.617082799999999
    },
    email: 'info@bourse-immobiliere.be',
    nearest: true,
    moreInfo: {
      agentName: 'Pierrée',
      agentSurname: 'Fabienne',
      position: 'Agency owner',
      avatar: FabienneAvatar,
      desc: ''
    }
  },
  {
    id: 4,
    title: 'Immobilière Bertholomé',
    tag: 'Immobilière Bertholomé',
    rate: '5.0',
    reviews: '120',
    logo: Bertholome,
    logoMobile: Bertholome,
    count: 17,
    agencyAddress: "Rue d'Ans 116, 4000 Liège",
    location: {
      lat: 50.6716754,
      lng: 5.5424035
    },
    email: 'info@bertholome.be',
    nearest: true,
    moreInfo: {
      agentName: 'Stéphan',
      agentSurname: 'Bertholomé',
      position: 'Agency owner',
      avatar: BertholomeAvatar,
      desc: ''
    }
  },
  {
    id: 5,
    title: 'Eco Immo',
    tag: 'ECO DEVELOPPEMENT - ECO IMMO',
    rate: '5.0',
    reviews: '120',
    logo: EcoImmo,
    logoMobile: EcoImmo,
    count: 17,
    agencyAddress: "Rue de la Station 3, 4430 ANS",
    location: {
      lat: 50.6635702,
      lng: 5.5113576
    },
    email: 'a.ponente@eco-immo.be',
    nearest: true,
    moreInfo: {
      agentName: 'Angelo',
      agentSurname: 'Ponente',
      position: 'Agency owner',
      avatar: AngeloAvatar,
      desc: ''
    }
  },
  {
    id: 99,
    title: 'Test Agency',
    tag: 'Test Agency',
    rate: '5.0',
    reviews: '120',
    logo: AgencyTest,
    logoMobile: AgencyTestMobile,
    count: 17,
    agencyAddress: 'Test Agency',
    location: {
      lat: 50.6292036,
      lng: 5.566588299999999
    },
    email: 'test@test.test',
    nearest: true,
    moreInfo: {
      agentName: 'Test',
      agentSurname: 'Agency',
      position: 'Agency owner',
      avatar: TestAvatar,
      desc: ''
    }
  },
];