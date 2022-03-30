import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Modal, Form, InputGroup, Table } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Loading } from '../../../components';
import { IPlan } from '../../../types';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const planInfoInitialState: IPlan = {
  _id: null,
  name: '',
  active: true,
  modality: '',
  numberLessonsWeek: '',
  monthPrice: '',
  monthDuration: '',
};

export const Planos = () => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [planInfo, setPlanInfo] = useState(planInfoInitialState);
  const [modalTitle, setModalTitle] = useState('Cadastrar novo plano');
  const form = useRef(null);
  const { plans, getPlans, addPlan, updatePlan, deletePlan, modalities, getModalities } = useAppContext();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    (async () => {
      await getPlans();
      await getModalities();
      setIsFetched(true);
    })();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setModalTitle('Cadastrar novo plano');
      setPlanInfo(planInfoInitialState);
      setValidated(false);
    }
  }, [showModal]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setPlanInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    const target = e.target;
    const rowEl = target.closest('tr');
    const planId = rowEl.dataset.documentId;
    const plan = plans.find((plan) => plan._id === planId);

    setModalTitle('Editar plano');
    setPlanInfo({ ...plan });
    setShowModal(true);
  };

  const handleDelete = async (e) => {
    const target = e.target;
    const rowEl = target.closest('tr');
    const planId = rowEl.dataset.documentId;

    try {
      await deletePlan(planId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    console.log(planInfo);
    if (form.current.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (planInfo._id) {
        await updatePlan(planInfo);
      } else {
        await addPlan(planInfo);
      }

      setShowModal(false);
    }

    setValidated(true);
  };

  const item = (plan: IPlan) => (
    <tr key={uuidv4()} data-document-id={plan._id} className='align-middle'>
      <td>{plan.name}</td>
      <td style={plan.active ? { color: 'green' } : { color: 'red' }}>{plan.active ? 'sim' : 'não'}</td>
      <td>{modalities.find((modality) => modality._id === plan.modality).name}</td>
      <td>{plan.numberLessonsWeek}</td>
      <td>{plan.monthPrice}</td>
      <td>{plan.monthDuration}</td>
      <td>
        <div className='d-flex align-center justify-content-center'>
          <FiSettings style={{ fontSize: '1.5rem', color: '#5e60ce', cursor: 'pointer' }} onClick={handleEdit} />
        </div>
      </td>
      <td>
        <div className='d-flex align-center justify-content-center'>
          <AiOutlineDelete style={{ fontSize: '1.5rem', color: 'red', cursor: 'pointer' }} onClick={handleDelete} />
        </div>
      </td>
    </tr>
  );

  if (!isFetched) return null;

  return (
    <Container>
      <Container className=''>
        <div className='' style={{ fontSize: '2.6rem' }}>
          Planos
        </div>
      </Container>

      <Container className='my-4'>
        {plans.length === 0 ? (
          'Não há planos cadastrados'
        ) : (
          <Table variant='dark' hover striped bordered style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ color: '#29e7cd' }}>
              <tr className='align-middle'>
                <th>Nome</th>
                <th>Ativo</th>
                <th>Modalidade</th>
                <th>Qnt. aulas por semana</th>
                <th>Mensalidade (R$)</th>
                <th>Duração (meses)</th>
                <th>-</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>{plans.map((plan) => item(plan))}</tbody>
          </Table>
        )}
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
          <Form ref={form} className='p-2 d-flex flex-column gap-4' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='formName'>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' value={planInfo.name} name='name' onChange={handleChange} required></Form.Control>
              <Form.Control.Feedback>Ótimo! :D</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Que tal um nome curto e de fácil identificação?</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formModality'>
              <Form.Label>Modalidade</Form.Label>
              {modalities && (
                <Form.Select value={planInfo.modality} onChange={handleChange} name='modality' required>
                  <option disabled value=''>
                    Definir...
                  </option>
                  {modalities.map((modality) => (
                    <option key={uuidv4()} value={modality._id}>
                      {modality.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group controlId='formLessonsWeek'>
              <Form.Label>Quantidade de aulas por semana</Form.Label>
              <Form.Select value={planInfo.numberLessonsWeek} onChange={handleChange} name='numberLessonsWeek' required>
                <option disabled value=''>
                  Definir...
                </option>
                <option value='2'>2 aulas / semana</option>
                <option value='3'>3 aulas / semana</option>
                <option value='4'>4 aulas / semana</option>
                <option value='5'>5 aulas / semana</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='formDuration'>
              <Form.Label>Duração do plano em meses</Form.Label>
              <Form.Select value={planInfo.monthDuration} onChange={handleChange} name='monthDuration' required>
                <option disabled value=''>
                  Definir...
                </option>
                <option value='1'>Mensal (1 mês)</option>
                <option value='3'>Trimestral (3 meses)</option>
                <option value='6'>Semestral (6 meses)</option>
                <option value='12'>Anual (12 meses)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Valor da mensalidade</Form.Label>
              <InputGroup>
                <InputGroup.Text>R$</InputGroup.Text>
                <Form.Control required type='number' value={planInfo.monthPrice} onChange={handleChange} name='monthPrice'></Form.Control>
                <Form.Control.Feedback>Perfeito!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>É necessário também definir o valor</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='formActive'>
              <Form.Check type='switch' label='Ativo' name='active' checked={planInfo.active} onChange={handleChange} />
              <Form.Text muted={true}>Define se o plano está atualmente sendo ofertado</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='seconday' onClick={() => setShowModal(false)} size='lg'>
            Cancelar
          </Button>
          <Button variant='primary' size='lg' onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert />
      <Loading />
    </Container>
  );
};
