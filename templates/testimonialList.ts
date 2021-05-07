import { TestimonialItem } from '../types/testimonial';

import AnneteAvatar from '../assets/images/user-avatar/annette.png';
import CourtneyAvatar from '../assets/images/user-avatar/courtney.png';
import CodyAvatar from '../assets/images/user-avatar/cody.png';
import LeslieAvatar from '../assets/images/user-avatar/leslie.png';
import RalphAvatar from '../assets/images/user-avatar/ralph.png';
import RonaldAvatar from '../assets/images/user-avatar/ronald.png';

export const testimonialList: TestimonialItem[] = [
  {
    id: 1,
    avatar: AnneteAvatar,
    slug: 'first',
    name: 'Annette',
    surname: 'Black',
    desc: 'I STRONGLY recommend it to EVERYONE interested in running a successful online business!',
    rating: 5,
  },
  {
    id: 2,
    avatar: CourtneyAvatar,
    slug: 'second',
    name: 'Courtney',
    surname: 'Henry',
    desc: 'I love it. After using It\'s my business skyrocketed! Man, this thing is getting better and better as ' +
      'I learn more about it.',
    rating: 5,
  },
  {
    id: 3,
    avatar: CodyAvatar,
    slug: 'third',
    name: 'Cody',
    surname: 'Fisher',
    desc: 'Thank you so much for your help. Without It\'s, we would have gone bankrupt by now. It\'s  both ' +
      'attractive and highly adaptable.',
    rating: 5,
  },
  {
    id: 4,
    avatar: LeslieAvatar,
    slug: 'fourth',
    name: 'Leslie',
    surname: 'Alexander',
    desc: 'You won\'t regret it. I love it. I didn\'t even need training. I will let my mum know about this, ' +
      'she could really make use of it!',
    rating: 5,
  },
  {
    id: 5,
    avatar: RalphAvatar,
    slug: 'fifth',
    name: 'Ralph',
    surname: 'Edwards',
    desc: 'Very easy to use. I made back the purchase price in just 48 hours! It\'s great. It\'s is both ' +
      'attractive and highly adaptable.',
    rating: 5,
  },
  {
    id: 6,
    avatar: RonaldAvatar,
    slug: 'sixth',
    name: 'Ronald',
    surname: 'Richards',
    desc: 'I love your system. Thank you for making it painless, pleasant and most of all hassle free! ' +
      'It\'s incredible. ',
    rating: 5,
  },
];