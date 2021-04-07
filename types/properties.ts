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
    address: string,
    square: string,
    bath: string,
    beds: string,
  }
}