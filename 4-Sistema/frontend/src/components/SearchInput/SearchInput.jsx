import React from 'react';
import './SearchInput.scss';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchInput = () => {
  return (
    <label className='search'>
      <AiOutlineSearch className='search__icon' />
      <input type='text' className='search__input' placeholder='Buscar...' />
    </label>
  );
};
