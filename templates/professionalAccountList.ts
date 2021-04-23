import { ProfessionalAccountItem } from '../types/steps';

import RealEstate from '../assets/images/steps/professional-account/real-estate-agent-inactive.svg';
import RealEstateActive from '../assets/images/steps/professional-account/real-estate-agent-active.svg';
import Notary from '../assets/images/steps/professional-account/notary-inactive.svg';
import NotaryActive from '../assets/images/steps/professional-account/notary-active.svg';
import Banquer from '../assets/images/steps/professional-account/banquer-inactive.svg';
import BanquerActive from '../assets/images/steps/professional-account/banquer-active.svg';
import LandSurveyor from '../assets/images/steps/professional-account/land-surveyor-inactive.svg';
import LandSurveyorActive from '../assets/images/steps/professional-account/land-surveyor-active.svg';
import Syndic from '../assets/images/steps/professional-account/syndic-inactive.svg';
import SyndicActive from '../assets/images/steps/professional-account/syndic-active.svg';
import Promoteur from '../assets/images/steps/professional-account/promoter-inactive.svg';
import PromoteurActive from '../assets/images/steps/professional-account/promoter-active.svg';


export const professionalAccountList: ProfessionalAccountItem[] = [
  {
    id: 1,
    tag: 'estate-agent',
    img: RealEstate,
    activeImg: RealEstateActive,
    name: 'Real estate agent'
  },
  {
    id: 2,
    tag: 'notary',
    img: Notary,
    activeImg: NotaryActive,
    name: 'Notary'
  },
  {
    id: 3,
    tag: 'banquer',
    img: Banquer,
    activeImg: BanquerActive,
    name: 'Banquer'
  },
  {
    id: 4,
    tag: 'land-surveyor',
    img: LandSurveyor,
    activeImg: LandSurveyorActive,
    name: 'Land surveyor'
  },
  {
    id: 5,
    tag: 'syndic',
    img: Syndic,
    activeImg: SyndicActive,
    name: 'Syndic'
  },
  {
    id: 6,
    tag: 'promoteur',
    img: Promoteur,
    activeImg: PromoteurActive,
    name: 'Promoteur'
  },
];