import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppContext } from '../../context';

export const EditAccModal = ({ showModal, closeModal }) => {
  //
  // initializers
  //

  const form = useRef(null);
  const [input, setInput] = useState(null);
  const { userAuth, user, getUser, updateUser } = useAppContext();
  const [formValidated, setFormValidated] = useState(false);

  useEffect(() => {
    if (showModal) {
      setFormValidated(false);
      getUser(userAuth.id);
    }
  }, [showModal]);

  useEffect(() => {
    setInput(null);
  }, [showModal]);

  useEffect(() => {
    if (user) {
      setInput({
        _id: userAuth.id,
        name: user.name,
        email: user.email,
        changePassword: false,
        newPassword: '',
        curPassword: '',
      });
    }
  }, [user]);

  //
  // logic handlers
  //

  const handleChange = (e) => {
    console.log(e);
    const target = e.target;
    const propertyName = target.id;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setInput((old) => ({
      ...old,
      [propertyName]: value,
    }));

    console.log(value);
  };

  const handleSubmit = async (event) => {
    if (form.current.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log(input);
      await updateUser(input);
      closeModal();
    }

    setFormValidated(true);
  };

  //
  // render
  //

  if (!input) return null;

  return (
    <div className='div'>
      <Modal show={showModal} onHide={closeModal} style={{ color: '#000' }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar minha conta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={form} className='d-flex gap-4 p-2 flex-column' onSubmit={handleSubmit} noValidate validated={formValidated} onKeyDown={(e) => console.log(e)}>
            <Form.Group controlId='name'>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' value={input.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' value={input.email} onChange={handleChange} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='newPassword'>
              <Form.Check type='checkbox' id='changePassword' label='Criar nova senha' className='mb-2' checked={input.changePassword} onChange={handleChange} />
              <Form.Control
                type='password'
                disabled={!input.changePassword}
                placeholder={input.changePassword ? 'Insira sua nova senha' : 'Sua senha continuará a mesma'}
                value={input.newPassword}
                onChange={handleChange}
                required={input.changePassword}
              ></Form.Control>
            </Form.Group>

            <hr />

            <Form.Group controlId='curPassword' className='mb-4'>
              <Form.Label>Senha atual</Form.Label>
              <Form.Control type='password' value={input.curPassword} onChange={handleChange} required></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button size='lg' variant='outline-danger' onClick={closeModal}>
            Cancelar
          </Button>
          <Button type='submit' size='lg' onClick={handleSubmit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
