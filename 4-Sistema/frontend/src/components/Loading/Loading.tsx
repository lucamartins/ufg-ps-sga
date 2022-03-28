import React from 'react';
import './Loading.scss';
import { useAppContext } from '../../context/appContext';

export const Loading = () => {
  const { isLoading } = useAppContext();

  if (!isLoading) return null;

  return (
    <div className='loading'>
      <div className='loading__spinner'></div>
    </div>
  );
};
