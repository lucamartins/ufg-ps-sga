import React from 'react';
import './PageNav.scss';
import { NavLink } from 'react-router-dom';

export const PageNav = ({ links }) => {
  return (
    <>
      <div className='pagenav'>
        <div className='pagenav__links'>
          {links.map((linkInfo) => (
            <NavLink key={linkInfo.path} to={linkInfo.path} className={({ isActive }) => (isActive ? 'pagenav__links__link--active' : '')}>
              {linkInfo.title}
            </NavLink>
          ))}
        </div>
        <div className='pagenav__line-separator'></div>
      </div>
    </>
  );
};
