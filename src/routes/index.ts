import { RouteProps } from 'react-router';

import MainPage from '../pages/Main';
import AgencyPage from '../pages/Agency';
import PropertyPage from '../pages/Property';
import AccountSettingsPage from '../pages/AccountSettings';

export const home = {
  path: '/',
  exact: true,
  component: MainPage,
} as RouteProps;

export const agency = {
  path: '/agency',
  component: AgencyPage,
} as RouteProps;

export const property = {
  path: '/property',
  component: PropertyPage,
} as RouteProps;

export const settings = {
  path: '/settings',
  component: AccountSettingsPage,
} as RouteProps;

export default [
  home,
  agency,
  property,
  settings,
] as const;
