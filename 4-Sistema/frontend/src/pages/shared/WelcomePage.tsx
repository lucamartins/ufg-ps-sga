import React, { useEffect } from 'react';
import { useAppContext } from '../../context';
import { ReactComponent as WelcomeImg } from '../../assets/undraw_working_out_-6-psf.svg';
import { Container, Row } from 'react-bootstrap';

export const WelcomePage = () => {
  const { getUser, user, userAuth } = useAppContext();

  useEffect(() => {
    if (userAuth) {
      getUser(userAuth.id);
    }
  }, [userAuth]);

  if (!user) return null;

  return (
    <Container className='d-flex flex-column align-items-center justify-content-around' style={{ height: '80vh' }}>
      <Row>
        <h1>
          Bem vindo, <span style={{ color: '#29e7cd' }}>{user && user.name}</span> :)
        </h1>
      </Row>
      <Row>
        <WelcomeImg style={{ height: '300px' }} />
      </Row>
      <Row>
        <h1 className='d-flex justify-content-center' style={{ color: '#29e7cd' }}>
          SGA - Sistema de Gerenciamento de Academia
        </h1>
        <h2 className='d-flex justify-content-center' style={{ color: '#29e7cd' }}>
          Luca S. Martins, Amadeu Lee, Jose Carlos Lee
        </h2>
      </Row>
    </Container>
  );
};
