import React, { useEffect, useState } from 'react';
import './Clientes.scss';
import { Button, SearchInput, Table, Loading, Alert } from '../../../components';
import { RiAddFill } from 'react-icons/ri';
import { ModalNovoCliente } from './ModalNovoCliente';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

export const Clientes = () => {
  const [showModalNovoCliente, setShowModalNovoCliente] = useState(false);
  const { customers, getCustomers } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers();
  }, []);

  const navigateToClienteDetailed = (event) => {
    const target = event.target.closest('.table__body__row');
    if (!target) return;
    const userId = target.id;
    navigate(userId);
  };

  const tableHeaders = ['Nome', 'Email', 'Celular', 'Contratos ativos'];

  return (
    <div className='alunos'>
      <div className='alunos__menu'>
        <SearchInput />
        {/* <Button kind='header-btn' icon={<RiAddFill />} text='Novo aluno' callback={() => setShowModalNovoCliente(true)} /> */}
      </div>
      <div className='line-separator'></div>
      <h1 className='alunos__title'>Clientes cadastrados</h1>
      {!customers.length ? (
        <h4 style={{ marginTop: '4rem' }}>Ainda não há clientes cadastrados.</h4>
      ) : (
        <Table titles={tableHeaders} objectsArr={customers} properties={['name', 'email', 'phoneNumber', 'memberships']} onClickHandler={navigateToClienteDetailed} />
      )}
      <ModalNovoCliente showModal={showModalNovoCliente} closeModal={() => setShowModalNovoCliente(false)} />
      <Loading />
      <Alert />
    </div>
  );
};
