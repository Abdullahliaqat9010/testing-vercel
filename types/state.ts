export interface RootState {
  userInfo: {
    auth: boolean,
    showAgentModal: boolean,
  },
  stepsInfo: {
    mainBlocks: boolean,
    goToDashboard: boolean,
    stepBlock: {
      step: number,
      title: string,
      addressFromStepOne: string,
      additionalAddress: {
        street: string,
        number: string,
        boxNumber: string,
        zip: string,
        locality: string,
      },
      selectedProperty: string,
      propertyDetails: {
        livingArea: string,
        landSurface: string,
        numberBedrooms: number,
        facadesNumber: number,
        numberBathrooms: number,
        numberLevels: number,
      },
      details: {
        prestige: string,
        condition: string,
        constructionYear: string,
        renovated: number,
        renovationYear: string,
        renovationLevel: string,
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