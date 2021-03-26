export interface PropertiesItem {
  id: number,
  address: string,
  square: string,
  bath: string,
  beds: string,
  img: string,
}

export interface PropertyContainerProps {
  property: {
    img: string,
    address: string,
    square: string,
    bath: string,
    beds: string,
  }
}