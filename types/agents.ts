export interface AgentsItem {
  id: number,
  title: string,
  address: string,
  rate: string,
  reviews: string,
  logo: string,
  logoMobile: string,
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
    title: string,
    address: string,
    rate: string,
    reviews: string,
    logo: string,
    logoMobile: string,
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
}