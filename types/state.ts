export interface RootState {
  userInfo: {},
  stepsInfo: {
    mainBlocks: boolean,
    stepBlock: {
      step: number,
      title: string,
      addressFromStepOne: string,
      additionalAddress: {
        street: string,
        number: string,
        zip: string,
        locality: string,
      },
      selectedProperty: string,
      propertyDetails: {
        livableArea: string,
        totalArea: string,
        numberBedrooms: number,
        numberBathrooms: number,
        numberLevels: number,
      },
      location: {
        lat: number,
        lng: number,
      },
    },
    errors: string,
  }
}