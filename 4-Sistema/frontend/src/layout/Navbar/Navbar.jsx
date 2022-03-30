import React, { useState } from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context';
import { BiTimeFive, BiSupport, BiLogOut } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';
import { MdAttachMoney, MdOutlineAccountCircle, MdOutlinePayments, MdOutlineManageAccounts } from 'react-icons/md';
import { BsFillPeopleFill, BsCalendarCheck } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { FaSwimmingPool } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { EditAccModal, Alert, Loading } from '../../components';

const generateNavitem = (title, path, isHome) => {
  function genereateNavitemIcon() {
    const iconClassName = 'c-navbar__links__link__icon';

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
      <NavLink to={path.toLowerCase()} className={({ isActive }) => (isActive ? 'c-navbar__links__link c-navbar__links__link--active' : 'c-navbar__links__link')} end>
        {genereateNavitemIcon()}
        <div className='c-navbar__links__link__text'>{title}</div>
      </NavLink>
    );

  return (
    <NavLink to={path.toLowerCase()} className={({ isActive }) => (isActive ? 'c-navbar__links__link c-navbar__links__link--active' : 'c-navbar__links__link')}>
      {genereateNavitemIcon()}
      <div className='c-navbar__links__link__text'>{title}</div>
    </NavLink>
  );
};

export const Navbar = () => {
  const { userAuth, logoutUser } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  if (!userAuth) return null;

  const footerDropDown = () => (
    <Dropdown>
      <Dropdown.Toggle variant='info' style={{ backgroundColor: 'transparent', border: 'none', color: '#fff' }}>
        <MdOutlineAccountCircle className='c-navbar__footer__icon' />
      </Dropdown.Toggle>
      <Dropdown.Menu variant='dark' style={{ fontSize: '1.4rem' }}>
        <Dropdown.Item className='d-flex gap-2 align-items-center' onClick={openModal}>
          <MdOutlineManageAccounts />
          <div>Minha conta</div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='d-flex gap-2 align-items-center' onClick={logoutUser}>
          <BiLogOut />
          <div>Sair</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  //
  // Admin's navbar
  //

  if (userAuth.role === 'Admin') {
    return (
      <div className='c-navbar'>
        <div>
          <div className='c-navbar__title'>
            SGA - Admin
            <br />
            Dashboard
          </div>

          <div className='c-navbar__links'>
            {generateNavitem('Início', '/', true)}

            <div className='c-navbar__links__line-label'>Gerais</div>
            {generateNavitem('Planos', '/planos')}
            {generateNavitem('Modalidades', '/modalidades')}
            {generateNavitem('Turmas', '/turmas')}

            <div className='c-navbar__links__line-label'>Clientes</div>
            {generateNavitem('Clientes', '/clientes')}
            {generateNavitem('Contratos', '/contratos')}
          </div>
        </div>

        <div>
          <div className='c-navbar__footer'>{footerDropDown()}</div>
          <EditAccModal showModal={showModal} closeModal={closeModal} />
        </div>
      </div>
    );
  }

  //
  // Customer's c-navbar
  //

  return (
    <div className='c-navbar'>
      <div>
        <div className='c-navbar__title'>
          SGA - Aluno
          <br />
          Dashboard
        </div>

        <div className='c-navbar__links'>
          {generateNavitem('Início', '/', true)}

          <div className='c-navbar__links__line-label'>Gerais</div>
          {generateNavitem('Planos', '/aluno/planos')}
          {generateNavitem('Turmas', '/aluno/modalidades')}
        </div>
      </div>

      <div>
        <div className='c-navbar__footer'>{footerDropDown()}</div>
        <EditAccModal showModal={showModal} closeModal={closeModal} />
      </div>
    </div>
  );
};
