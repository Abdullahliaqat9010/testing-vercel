import { AgentsItem } from '../types/agents';

import Agency from '../assets/images/agents/label-immo-logo.webp';
import AgencyMobile from '../assets/images/agents/label-immo-logo.webp';
import ThierryAvatar from '../assets/images/agents/thierry-hermanne.webp';

import AgencyTwo from '../assets/images/agents/waw-immo-logo.webp';
import AgencyTwoMobile from '../assets/images/agents/waw-immo-logo.webp';
import AlexandreAvatar from '../assets/images/agents/alexandre-legrand.webp';

import AgencyThree from '../assets/images/agents/bourse-logo.webp';
import AgencyThreeMobile from '../assets/images/agents/bourse-logo.webp';
import FabienneAvatar from '../assets/images/agents/fabienne.webp';

import AgencyFour from '../assets/images/agents/bertholome-logo.webp';
import AgencyFourMobile from '../assets/images/agents/bertholome-logo.webp';
import BertholomeAvatar from '../assets/images/agents/bertholome.webp';

import AgencyTest from '../assets/images/agents/test-agency.png';
import AgencyTestMobile from '../assets/images/agents/test-agency.png';
import TestAvatar from '../assets/images/no-photo.png';


export const agentsList: AgentsItem[] = [
  {
    id: 1,
    title: 'Label Immo',
    rate: '5.0',
    reviews: '120',
    logo: Agency,
    logoMobile: AgencyMobile,
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
    rate: '5.0',
    reviews: '120',
    logo: AgencyTwo,
    logoMobile: AgencyTwoMobile,
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
    rate: '5.0',
    reviews: '120',
    logo: AgencyThree,
    logoMobile: AgencyThreeMobile,
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
    rate: '5.0',
    reviews: '120',
    logo: AgencyFour,
    logoMobile: AgencyFourMobile,
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
    id: 99,
    title: 'Test Agency',
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