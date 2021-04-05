import React from 'react';
import Link from 'next/link'

import navBarList from '../../config/navBarList';

const NavBarContainer = () => {
  return (
    <div className='nav-bar'>
      <ul className='p-0 mb-0'>
        {
          navBarList.map((list, index) => (
            <Link href={ list.href } key={ index }>
              <li className={list.activeTab ? 'active' : ''}>
                <img src={ list.activeTab ? list.activeImg : list.img } alt={ list.title }/>
                { list.title }
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default NavBarContainer;