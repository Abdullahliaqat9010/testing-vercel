export interface PropertiesItem {
  id: number,
  address: string,
  square: string,
  bath: string,
  beds: string,
  img: string,
  imgMobile?: string,
}

export interface PropertyContainerProps {
  property: {
    images: any[], //@todo add interface
    search_address: string,
    company_name: string,
    live_area: string,
    bathrooms: string,
    bedrooms: string,
    sold_date: string,
    source: string,
  }
}