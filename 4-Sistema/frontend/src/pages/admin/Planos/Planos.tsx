import React, { useState, useEffect } from 'react';
import { ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Loading } from '../../../components';
import { IPlan } from '../../../types';

const planInfoInitialState: IPlan = {
  _id: null,
  name: '',
  active: true,
  modality: '',
  numberLessonsWeek: 2,
  monthPrice: '',
  numberMonths: 1,
};

export const Planos = () => {
  const [showModal, setShowModal] = useState(false);
  const [planInfo, setPlanInfo] = useState(planInfoInitialState);
  const [modalTitle, setModalTitle] = useState('Cadastrar novo plano');

  const { plans, getPlans, addPlan, updatePlan, deletePlan } = useAppContext();

  useEffect(() => {
    (async () => {
      await getPlans();
    })();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setModalTitle('Cadastrar novo plano');
      setPlanInfo(planInfoInitialState);
    }
  }, [showModal]);

  const handleEdit = (e) => {
    const planId = e.target.dataset.planId;
    const plan = plans.find((plan) => plan._id === planId);

    setModalTitle('Editar plano');
    setPlanInfo({ ...plan });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setPlanInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (planInfo._id) {
        await updatePlan(planInfo);
      } else {
        await addPlan(planInfo);
      }
    } catch (err) {
      console.error(err);
    }

    setShowModal(false);
  };

  const handleDelete = async (e) => {
    const planId = e.target.dataset.planId;

    try {
      await deletePlan(planId);
    } catch (err) {
      console.error(err);
    }
  };

  const item = (plan: IPlan) => (
    <ListGroup.Item variant='primary' key={uuidv4()}>
      <Container>
        <Row className='p-1'>
          <Col className='d-flex align-items-center'>{plan.name}</Col>
          <Col className='d-flex align-items-center' style={plan.active ? { color: 'green' } : { color: 'red' }}>
            {plan.active ? 'Ativo' : 'Inativo'}
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='outline-danger' size='lg' data-modality-id={plan._id} onClick={handleDelete} className='me-2'>
              Excluir
            </Button>
            <Button variant='dark' size='lg' data-modality-id={plan._id} onClick={handleEdit}>
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
          Planos
        </div>
      </Container>

      <Container className='my-4'>
        <ListGroup numbered={true}>{plans.length === 0 ? 'Não há planos cadastrados.' : plans.map((plan) => item(plan))}</ListGroup>
      </Container>

      <Container className=''>
        <div className='d-flex justify-content-end'>
          <Button variant='primary' size='lg' onClick={() => setShowModal(true)}>
            Novo plano
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
              <Form.Control type='text' value={planInfo.name} name='name' onChange={handleChange}></Form.Control>
              <Form.Text muted={true}>Nome curto e de fácil identificação.</Form.Text>
            </Form.Group>

            <Form.Group controlId='formActive'>
              <Form.Check type='switch' label='Ativa' name='active' checked={planInfo.active} onChange={handleChange} />
              <Form.Text muted={true}>Define se o plano está atualmente sendo ofertado</Form.Text>
            </Form.Group>
            
            <Form.Group controlId='formLessonsWeek'>
              <Form.Label>Número de aulas por semana</Form.Label>
              
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
