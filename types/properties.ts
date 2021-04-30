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
    img: string,
    imgMobile?: string,
    search_address: string,
    live_area: string,
    bathrooms: string,
    bedrooms: string,
    sold_date: string,
    source: string,
  }
}