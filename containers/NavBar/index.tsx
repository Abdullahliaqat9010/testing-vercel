import React from 'react';
import Link from 'next/link'
import { useTranslation } from 'next-i18next';

import navBarList from '../../config/navBarList';

const NavBarContainer = () => {
  const { t } = useTranslation('header');
  return (
    <div className='nav-bar'>
      <ul className='p-0 mb-0'>
        {
          navBarList.map((list, index) => (
            <Link href={ list.href } key={ index }>
              <li className={list.activeTab ? 'active' : ''}>
                <img src={ list.activeTab ? list.activeImg : list.img } alt={ list.title }/>
                {t(`nav-li.${list.id}`)}
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default NavBarContainer;