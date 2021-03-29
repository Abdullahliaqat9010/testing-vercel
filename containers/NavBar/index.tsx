import React from 'react';

import navBarList from '../../config/navBarList';

const NavBarContainer = () => {
  return (
    <div className='nav-bar'>
      <ul className='p-0 mb-0'>
        {
          navBarList.map((list, index) => (
            <li className={list.activeTab ? 'active' : ''} key={ index }>
              <img src={ list.activeTab ? list.activeImg : list.img } alt={ list.title }/>
              { list.title }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default NavBarContainer;