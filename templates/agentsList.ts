import { AgentsItem } from '../types/agents';

import Agency from '../assets/images/agents/label-immo-logo.png';
import AgencyMobile from '../assets/images/agents/label-immo-logo.png';
import ThierryAvatar from '../assets/images/agents/thierry-hermanne.jpeg';
// import AgentTwo from '../assets/images/agents/agent2.png';
// import AgentTwoMobile from '../assets/images/agents/agent2-mobile.png';
// import AgentThree from '../assets/images/agents/agent3.png';
// import AgentThreeMobile from '../assets/images/agents/agent3-mobile.png';
// import AgentFour from '../assets/images/agents/agent4.png';
// import AgentFourMobile from '../assets/images/agents/agent4-mobile.png';
// import AgentFive from '../assets/images/agents/agent5.png';
// import AgentFiveMobile from '../assets/images/agents/agent5-mobile.png';
// import AgentAvatar from '../assets/images/agents/agent-avatar.png';

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
  // {
  //   id: 2,
  //   title: 'Acme Co.',
  //   rate: '5.0',
  //   reviews: '120',
  //   logo: AgentTwo,
  //   logoMobile: AgentTwoMobile,
  //   count: 17,
  //   address: 'Route des Cent Ecus, 24370 Sainte Mondane',
  //   nearest: true,
  //   moreInfo: {
  //     agentName: 'Thierry',
  //     agentSurname: 'Deviers',
  //     position: 'Agency owner',
  //     avatar: AgentAvatar,
  //     desc: ''
  //   }
  // },
  // {
  //   id: 3,
  //   title: 'Barone LLC.',
  //   rate: '5.0',
  //   reviews: '120',
  //   logo: AgentThree,
  //   logoMobile: AgentThreeMobile,
  //   count: 17,
  //   address: 'Route des Cent Ecus, 24370 Sainte Mondane',
  //   nearest: false,
  //   moreInfo: {
  //     agentName: 'Thierry',
  //     agentSurname: 'Deviers',
  //     position: 'Agency owner',
  //     avatar: AgentAvatar,
  //     desc: ''
  //   }
  // },
  // {
  //   id: 4,
  //   title: 'Big Kahuna Burger Ltd.',
  //   rate: '5.0',
  //   reviews: '120',
  //   logo: AgentFour,
  //   logoMobile: AgentFourMobile,
  //   count: 17,
  //   address: 'Route des Cent Ecus, 24370 Sainte Mondane',
  //   nearest: false,
  //   moreInfo: {
  //     agentName: 'Thierry',
  //     agentSurname: 'Deviers',
  //     position: 'Agency owner',
  //     avatar: AgentAvatar,
  //     desc: ''
  //   }
  // },
  // {
  //   id: 5,
  //   title: 'Biffco Enterprises Ltd.',
  //   rate: '5.0',
  //   reviews: '120',
  //   logo: AgentFive,
  //   logoMobile: AgentFiveMobile,
  //   count: 17,
  //   address: 'Route des Cent Ecus, 24370 Sainte Mondane',
  //   nearest: false,
  //   moreInfo: {
  //     agentName: 'Thierry',
  //     agentSurname: 'Deviers',
  //     position: 'Agency owner',
  //     avatar: AgentAvatar,
  //     desc: ''
  //   }
  // },
];