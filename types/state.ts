export interface RootState {
  userInfo: {
    auth: boolean,
    showAgentModal: boolean,
    agencyContactInfo: {
      title: string,
      agentName: string,
      agentSurname: string,
      agencyId: number
    },
    properties: any, //@todo add interface
    userName: string,
    userSurname: string,
    userEmail: string,
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
        gardenTerras: number,
        gardenTerrasValue: number,
        elevator: number,
      },
      details: {
        prestige: string,
        condition: string,
        constructionYear: string,
        renovated: number,
        renovationYear: string,
        renovationLevel: string,
        numberFloors: number,
      },
      utilities: {
        epc: string | number,
        view: 'normal' | 'enclosed' | 'good' | 'unique',
        orientation: string,
        attic: boolean,
        atticValue: string | number,
        cellar: boolean,
        cellarValue: string | number,
        elevator: boolean,
        swimmingPool: boolean,
        indoorGarage: number,
        indoorGarageCheck: boolean,
        outdoorGarage: number,
        outdoorGarageCheck: boolean,
        carport: number,
        carportCheck: boolean,
        solarPanels: number,
      },
      personalAccount: {
        accountType: string,
        selectedItem: string,
        selectedResidence: string,
        sellProperty: string,
        howSell: string,
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