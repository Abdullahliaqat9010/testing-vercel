export interface AgentsItem {
  id: number,
  title: string,
  agencyAddress: string,
  location: {
    lat: number,
    lng: number
  },
  rate: string,
  reviews: string,
  logo: string,
  logoMobile: string,
  email: string,
  count: number,
  nearest: boolean,
  moreInfo: {
    agentName: string,
    agentSurname: string,
    position: string,
    avatar: string,
    desc: string
  }
}

export interface AgencyProps {
  agency: {
    id: number,
    title: string,
    agencyAddress: string,
    location: {
      lat: number,
      lng: number
    },
    rate: string,
    reviews: string,
    logo: string,
    logoMobile: string,
    count: number,
    nearest: boolean,
    email: string,
    moreInfo: {
      agentName: string,
      agentSurname: string,
      position: string,
      avatar: string,
      desc: string
    }
  }
}