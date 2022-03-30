import React from 'react';
import { useAppContext } from '../../context';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../';
import './Dashboard.scss';
import { Alert, Loading } from '../../components';

export const Dashboard = () => {
  const {} = useAppContext();

  return (
    <div className='dashboard'>
      <aside className='dashboard__nav'>
        <Navbar />
      </aside>

      <div className='dashboard__rendered'>
        <Outlet />
      </div>

      <Alert />
      <Loading />
    </div>
  );
};
