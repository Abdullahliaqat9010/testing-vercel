export interface RootState {
  userInfo: {},
  stepsInfo: {
    mainBlocks: boolean,
    stepBlock: {
      step: number,
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