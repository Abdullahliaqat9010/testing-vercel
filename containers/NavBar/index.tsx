import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import navBarList from '../../config/navBarList';

const NavBarContainer = () => {
  const {t} = useTranslation('header');
  const router = useRouter();
  const {locale} = router;

  return (
    <div className='nav-bar'>
      <ul className='p-0 mb-0'>
        {
          navBarList.map((list, index) => (
            <Link href={ list.href } key={ index } locale={ locale }>
              <li className={ router.pathname === list.href ? 'active' : '' }>
                <img src={ router.pathname === list.href ? list.activeImg : list.img } alt={ list.title }/>
                { t(`nav-li.${ list.id }`) }
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default NavBarContainer;