import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Modal, Form, InputGroup, Table } from 'react-bootstrap';
import { useAppContext } from '../../context';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Loading } from '../../components';
import { IPlan, IClassGroup } from '../../types';

const classGroupInitialState: IClassGroup = {
  minAge: '',
  maxAge: '',
  maxCapacity: '',
  schedule: '',
  weekDays: [],
  customers: [],
  modalityId: '',
  active: true,
};

export const Turmas = () => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [classGroupInfo, setClassGroupInfo] = useState(classGroupInitialState);
  const [modalTitle, setModalTitle] = useState('Cadastrar nova turma');
  const form = useRef(null);
  const { plans, getPlans, addPlan, updatePlan, deletePlan, modalities, getModalities, classGroups, getClassGroups, createClassGroup } = useAppContext();
  const [isFetched, setIsFetched] = useState(false);

  // Fetch data
  useEffect(() => {
    (async () => {
      await Promise.all([getPlans(), getModalities(), getClassGroups()]);
      setIsFetched(true);
    })();
  }, []);

  // Handle modal state
  useEffect(() => {
    if (!showModal) {
      setModalTitle('Cadastrar nova turma');
      setClassGroupInfo(classGroupInitialState);
      setValidated(false);
    }
  }, [showModal]);

  // useEffect(() => {
  //   console.log('class groups:', classGroups);
  // }, [classGroups]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name: string = target.name;

    if (['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(name)) {
      if (!classGroupInfo.weekDays.includes(name.toUpperCase())) {
        setClassGroupInfo((old) => ({
          ...old,
          weekDays: [...classGroupInfo.weekDays, name.toUpperCase()],
        }));
        return;
      }
    }

    setClassGroupInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    const target = e.target;
    const rowEl = target.closest('tr');
    const classGroupId = rowEl.dataset.documentId;
    const classGroup = classGroups.find((classGroup) => classGroup._id === classGroupId);

    setClassGroupInfo({ ...classGroup });
    setModalTitle('Editar turma');
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
    if (form.current.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (classGroupInfo._id) {
        // await updatePlan(classGroupInfo);
      } else {
        await createClassGroup(classGroupInfo);
      }

      setShowModal(false);
    }

    setValidated(true);
  };

  const modalityClassGroups = (modalityId: string) => {
    console.log(classGroups);
    const classGroupsFiltered = classGroups.filter((classGroup) => classGroup.modalityId === modalityId);

    return classGroupsFiltered.map((classGroup) => <div style={{ fontSize: '1.5rem', color: '#29e7cd' }}>{classGroup.schedule}</div>);
  };

  if (!isFetched) return null;

  return (
    <Container>
      <Container className=''>
        <div className='' style={{ fontSize: '2.6rem' }}>
          Turmas
        </div>
      </Container>

      <Container className='my-4'>
        {classGroups.length === 0
          ? 'Não há turmas cadastradas'
          : modalities.map((modality) => (
              <div className='mb-4' key={uuidv4()}>
                <h3>{modality.name}</h3>
                {modalityClassGroups(modality._id)}
              </div>
            ))}
      </Container>

      <Container className=''>
        <div className='d-flex justify-content-end'>
          <Button variant='primary' size='lg' onClick={() => setShowModal(true)}>
            Nova turma
          </Button>
        </div>
      </Container>

      <Modal variant='secondary' show={showModal} onHide={() => setShowModal(false)} style={{ color: '#000' }}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={form} className='p-2 d-flex flex-column gap-4' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='schedule'>
              <Form.Label>Horário</Form.Label>
              <Form.Control type='text' value={classGroupInfo.schedule} name='schedule' onChange={handleChange} required></Form.Control>
              <Form.Control.Feedback>Ótimo! :D</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='modality'>
              <Form.Label>Modalidade</Form.Label>
              {modalities && (
                <Form.Select value={classGroupInfo.modalityId} onChange={handleChange} name='modalityId' required>
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

            <Form.Group controlId='weekDays' onChange={handleChange}>
              <Form.Check inline label='Segunda' name='monday' type='checkbox' />
              <Form.Check inline label='Terça' name='tuesday' type='checkbox' />
              <Form.Check inline label='Quarta' name='wednesday' type='checkbox' />
              <Form.Check inline label='Quinta' name='thursday' type='checkbox' />
              <Form.Check inline label='Sexta' name='friday' type='checkbox' />
            </Form.Group>

            <Form.Group controlId='maxCapacity'>
              <Form.Label>Capacidade máxima</Form.Label>
              <InputGroup>
                <Form.Control required type='number' value={classGroupInfo.maxCapacity} onChange={handleChange} name='maxCapacity'></Form.Control>
                <InputGroup.Text>alunos</InputGroup.Text>
                <Form.Control.Feedback>Perfeito!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='minAge'>
              <Form.Label>Idade mínima (opcional)</Form.Label>
              <InputGroup>
                <Form.Control type='number' value={classGroupInfo.minAge} onChange={handleChange} name='minAge'></Form.Control>
                <InputGroup.Text>anos</InputGroup.Text>
                <Form.Control.Feedback>Perfeito!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='maxAge'>
              <Form.Label>Idade máxima (opcional)</Form.Label>
              <InputGroup>
                <Form.Control type='number' value={classGroupInfo.maxAge} onChange={handleChange} name='maxAge'></Form.Control>
                <InputGroup.Text>anos</InputGroup.Text>
                <Form.Control.Feedback>Perfeito!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='active'>
              <Form.Check type='switch' label='Ativo' name='active' checked={classGroupInfo.active} onChange={handleChange} />
              <Form.Text muted={true}>Define se a turma está atualmente sendo ofertada</Form.Text>
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
    </Container>
  );
};
