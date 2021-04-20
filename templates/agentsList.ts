import { AgentsItem } from '../types/agents';

import Agency from '../assets/images/agents/label-immo-logo.png';
import AgencyMobile from '../assets/images/agents/label-immo-logo.png';
import ThierryAvatar from '../assets/images/agents/thierry-hermanne.jpeg';
import AgencyTwo from '../assets/images/agents/waw-immo-logo.png';
import AgencyTwoMobile from '../assets/images/agents/waw-immo-logo.png';
import AlexandreAvatar from '../assets/images/agents/alexandre-legrand.jpeg';


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
];