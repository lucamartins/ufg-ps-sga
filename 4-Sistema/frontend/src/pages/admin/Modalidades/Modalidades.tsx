import React, { useState } from 'react';
import { ListGroup, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './Modalidades.scss';

export const Modalidades = () => {
  const [showModal, setShowModal] = useState(false);

  const item = (title: string) => (
    <ListGroup.Item variant='primary'>
      <Container>
        <Row className='p-1'>
          <Col className='d-flex align-items-center'>{title}</Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='outline-primary' size='lg'>
              Editar
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );

  return (
    <Container>
      <Container className=''>
        <div className='' style={{ fontSize: '2.6rem' }}>
          Modalidades
        </div>
      </Container>

      <Container className='my-4'>
        <ListGroup numbered={true}>
          {item('Natação')}
          {item('Musculação')}
          {item('Hidroginástica')}
        </ListGroup>
      </Container>

      <Container className=''>
        <div className='d-flex justify-content-end'>
          <Button variant='primary' size='lg' onClick={() => setShowModal(true)}>
            Nova modalidade
          </Button>
        </div>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Cadastrar nova modalidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>Aqui vai ser um form...</Modal.Body>
        <Modal.Footer>
          <Button variant='seconday' onClick={() => setShowModal(false)} size='lg'>
            Cancelar
          </Button>
          <Button variant='primary' onClick={() => setShowModal(false)} size='lg'>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
