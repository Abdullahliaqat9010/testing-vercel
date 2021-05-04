export interface RootState {
  userInfo: {
    auth: boolean,
    showAgentModal: boolean,
    existEmail: boolean,
    agencyContactInfo: {
      title: string,
      agentName: string,
      agentSurname: string,
      agencyId: number
    },
    properties: any, //@todo add interface
    similarProperty: any, //@todo add interface
    mainProperty: any, //@todo add interface
    currentPropertyPrice: {
      constrValue: number,
      landValue: number
    },
    userName: string,
    userSurname: string,
    userEmail: string,
  },
  stepsInfo: {
    mainBlocks: boolean,
    goToDashboard: boolean,
    propertyId?: number,
    stepBlock: {
      step: number,
      title: string,
      addressFromStepOne: string,
      additionalAddress: {
        street: string,
        number: string,
        zip: string,
        locality: string,
        country: string,
      },
      selectedProperty: string,
      propertyDetails: {
        livingArea: string,
        landSurface: string,
        numberBedrooms: number,
        facadesNumber: number,
        numberBathrooms: number,
        numberLevels: number,
        numberFloors: number,
        gardenTerrasValue: number,
        elevator: number,
      },
      details: {
        prestige: string,
        condition: string,
        constructionYear: string,
        renovationYear: string,
        renovationLevel: string,
      },
      utilities: {
        epc: string | number,
        view: 'normal' | 'enclosed' | 'good' | 'unique',
        orientation: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW',
        atticValue: string | number,
        cellarValue: string | number,
        elevator: boolean,
        swimmingPool: boolean,
        indoorGarage: number,
        indoorGarageCheck: boolean,
        outdoorGarage: number,
        outdoorGarageCheck: boolean,
        carport: number,
        carportCheck: boolean,
        parking: boolean,
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