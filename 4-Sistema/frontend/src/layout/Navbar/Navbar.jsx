import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context';

import { BiTimeFive, BiSupport, BiLogOut } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';
import { MdAttachMoney, MdOutlineAccountCircle, MdOutlinePayments } from 'react-icons/md';
import { BsFillPeopleFill, BsCalendarCheck } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSwimmingPool } from 'react-icons/fa';

const generateNavitem = (title, path, isHome) => {
  function genereateNavitemIcon() {
    const iconClassName = 'navbar__links__link__icon';

    switch (title.toLowerCase()) {
      case 'planos':
        return <MdAttachMoney className={iconClassName} />;
      case 'modalidades':
        return <CgGym className={iconClassName} />;
      case 'funcionamento':
        return <BiTimeFive className={iconClassName} />;
      case 'clientes':
        return <BsFillPeopleFill className={iconClassName} />;
      case 'agendamentos':
        return <BsCalendarCheck className={iconClassName} />;
      case 'início':
        return <AiOutlineHome className={iconClassName} />;
      case 'contratos':
        return <MdOutlinePayments className={iconClassName} />;
      case 'turmas':
        return <FaSwimmingPool className={iconClassName} />;

      case 'chamados':
        return <BiSupport className={iconClassName} />;

      default:
        return null;
    }
  }

  if (isHome)
    return (
      <NavLink
        to={path.toLowerCase()}
        className={({ isActive }) => (isActive ? 'navbar__links__link navbar__links__link--active' : 'navbar__links__link')}
        end
      >
        {genereateNavitemIcon()}
        <div className='navbar__links__link__text'>{title}</div>
      </NavLink>
    );

  return (
    <NavLink
      to={path.toLowerCase()}
      className={({ isActive }) => (isActive ? 'navbar__links__link navbar__links__link--active' : 'navbar__links__link')}
    >
      {genereateNavitemIcon()}
      <div className='navbar__links__link__text'>{title}</div>
    </NavLink>
  );
};

export const Navbar = () => {
  const { user, logoutUser } = useAppContext();
  if (!user) return null;

  if (user.userRole !== 'Customer') {
    return (
      <div className='navbar'>
        <div>
          <div className='navbar__title'>
            Academia
            <br />
            Dashboard - Admin
          </div>

          <div className='navbar__links'>
            {generateNavitem('Início', '/', true)}

            <div className='navbar__links__line-label'>Gerais</div>
            {generateNavitem('Planos', '/planos')}
            {generateNavitem('Modalidades', '/modalidades')}
            {generateNavitem('Turmas', '/turmas')}

            <div className='navbar__links__line-label'>Clientes</div>
            {generateNavitem('Clientes', '/clientes')}
            {generateNavitem('Contratos', '/contratos')}
            {/* {generateNavitem('Agendamentos', '/agendamentos')}

            <div className='navbar__links__line-label'>Suporte</div>
            {generateNavitem('Chamados', '/chamados')} */}
          </div>
        </div>

        <div>
          <div className='navbar__footer'>
            <BiLogOut className='navbar__footer__icon' title='Sair' onClick={() => logoutUser()} />
            <MdOutlineAccountCircle className='navbar__footer__icon' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div>
        <div className='navbar__title'>
          Academia
          <br />
          Dashboard - Aluno
        </div>

        <div className='navbar__links'>
          {generateNavitem('Início', '/', true)}

          <div className='navbar__links__line-label'>Gerais</div>
          {generateNavitem('Planos', '/aluno/planos')}
          {generateNavitem('Turmas', '/aluno/modalidades')}
        </div>
      </div>

      <div>
        <div className='navbar__footer'>
          <BiLogOut className='navbar__footer__icon' title='Sair' onClick={() => logoutUser()} />
          <MdOutlineAccountCircle className='navbar__footer__icon' />
        </div>
      </div>
    </div>
  );
};
