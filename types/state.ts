export interface RootState {
  userInfo: {
    auth: boolean,
  },
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
      userData: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        promotions: boolean,
        agreement: boolean,
      },
    },
    errors: string,
  }
}