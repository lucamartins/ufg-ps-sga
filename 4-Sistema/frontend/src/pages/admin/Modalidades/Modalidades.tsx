import React, { useState, useEffect } from 'react';
import { ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './Modalidades.scss';
import { useAppContext } from '../../../context';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Loading } from '../../../components';

export const Modalidades = () => {
  const [showModal, setShowModal] = useState(false);
  const [newModalityInfo, setNewModalityInfo] = useState({ name: '', active: true });
  const [modalTitle, setModalTitle] = useState('Cadastrar nova modalidade');
  const [triggerUpdate, setTriggerUpdate] = useState({ active: false, id: '' });
  const { modalities, getModalities, addModality, updateModality, deleteModality } = useAppContext();

  useEffect(() => {
    (async () => {
      await getModalities();
    })();
  }, []);

  useEffect(() => {
    if (triggerUpdate.active) {
      setModalTitle('Editar modalidade');
    } else {
      setModalTitle('Cadastrar nova modalidade');
    }
  }, [triggerUpdate]);

  useEffect(() => {
    if (!showModal) {
      setTriggerUpdate({ active: false, id: '' });
      setNewModalityInfo({ name: '', active: true });
    }
  }, [showModal]);

  const handleEdit = (e) => {
    const modalityId = e.target.dataset.modalityId;
    const modality = modalities.find((modality) => modality._id === modalityId);

    setTriggerUpdate({ active: true, id: modalityId });
    setNewModalityInfo({ name: modality.name, active: modality.active });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setNewModalityInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (triggerUpdate.active) {
        await updateModality(newModalityInfo, triggerUpdate.id);
      } else {
        await addModality(newModalityInfo);
      }
    } catch (err) {
      console.error(err);
    }

    setShowModal(false);
  };

  const handleDelete = async (e) => {
    const modalityId = e.target.dataset.modalityId;

    try {
      await deleteModality(modalityId);
    } catch (err) {
      console.error(err);
    }
  };

  const item = (modality: { name: string; active: boolean; _id: string }) => (
    <ListGroup.Item variant='primary' key={uuidv4()}>
      <Container>
        <Row className='p-1'>
          <Col className='d-flex align-items-center'>{modality.name}</Col>
          <Col className='d-flex align-items-center' style={modality.active ? { color: 'green' } : { color: 'red' }}>
            {modality.active ? 'Ativa' : 'Inativa'}
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='outline-danger' size='lg' data-modality-id={modality._id} onClick={handleDelete} className='me-2'>
              Excluir
            </Button>
            <Button variant='dark' size='lg' data-modality-id={modality._id} onClick={handleEdit}>
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
          {modalities.length === 0 ? 'Não há modalidades cadastradas.' : modalities.map((modality) => item(modality))}
        </ListGroup>
      </Container>

      <Container className=''>
        <div className='d-flex justify-content-end'>
          <Button variant='primary' size='lg' onClick={() => setShowModal(true)}>
            Nova modalidade
          </Button>
        </div>
      </Container>

      <Modal variant='secondary' show={showModal} onHide={() => setShowModal(false)} style={{ color: '#000' }}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-2' onSubmit={(e) => e.preventDefault()}>
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' value={newModalityInfo.name} name='name' onChange={handleChange}></Form.Control>
              <Form.Text muted={true}>Nome curto e de fácil identificação.</Form.Text>
            </Form.Group>
            <Form.Group controlId='formActive'>
              <Form.Check type='switch' label='Ativa' name='active' checked={newModalityInfo.active} onChange={handleChange} />
              <Form.Text muted={true}>Define se a modalidade pode ser associada a planos da academia.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='seconday' onClick={() => setShowModal(false)} size='lg'>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleSave} size='lg'>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert />
      <Loading />
    </Container>
  );
};
