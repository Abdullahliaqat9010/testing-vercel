export interface RootState {
  userInfo: {},
  stepBlock: {
    mainBlocks: boolean,
    stepBlock: {
      stepTwo: boolean,
      stepThree: boolean,
      stepFour: boolean,
      stepFive: boolean,
      title: string,
      address: string,
      location: {
        lat: number,
        lng: number,
      },
    },
    errors: string,
  }
}