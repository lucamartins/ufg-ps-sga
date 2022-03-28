import React, { useState, useRef, useEffect } from 'react';
import validator from 'validator';
import './ModalNovoCliente.scss';
import { Modal, Alert } from '../../../../components';
import { useAppContext } from '../../../../context/appContext';

interface IUserInput {
  nome: string;
  email: string;
  whatsapp: string;
}

// Initialize data
const initialState: IUserInput = { nome: '', email: '', whatsapp: '' };

// Prevent invalid characters from being inserted into phone number input
const handleInvalidPhoneCharacter = (event) => {
  const { key } = event;

  if (['Backspace', '+', '-'].includes(key)) return;

  if (validator.isAlpha(key, 'pt-BR') || key === ' ') {
    event.preventDefault();
  }
};

export const ModalNovoCliente = ({ showModal, closeModal }) => {
  const [input, setInput] = useState<IUserInput>(initialState);
  const nameInputEl = useRef(null);
  const emailInputEl = useRef(null);
  const whatsappInputEl = useRef(null);
  const { registerUser, displayAlert } = useAppContext();

  // Clear input after closing modal
  useEffect(() => {
    if (showModal === false) setInput(initialState);
  }, [showModal]);

  // Validate all input fields at once
  const validateFields = (): boolean => {
    if (!validator.isEmpty(input.nome) && validator.isEmail(input.email) && validator.isMobilePhone(input.whatsapp, 'pt-BR')) return true;
    return false;
  };

  // Update input values (form controlled component)
  const handleInputChange = (event) => {
    const target = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [target.id]: target.value,
    }));
  };

  // Handle form subit action
  const handleSubmit = async () => {
    if (!validateFields()) {
      return displayAlert('Preencha os campos corretamente!', 'error');
    }

    try {
      await registerUser({ name: input.nome, email: input.email, phoneNumber: input.whatsapp });
      closeModal();
      displayAlert('Cliente criado com sucesso!', 'success');
      return;
    } catch (err) {
      displayAlert(err.message, 'error');
    }
  };

  return (
    <Modal showModal={showModal} title='Cadastrar novo cliente' confirmActionText='Cadastrar' abortFn={closeModal} confirmFn={handleSubmit}>
      <form className='novo-aluno'>
        <div className='novo-aluno__header'>Preencha os dados</div>
        <div className='novo-aluno__field'>
          <label htmlFor='nome' className='novo-aluno__field__label'>
            Nome
          </label>
          <input
            type='text'
            id='nome'
            value={input.nome}
            className='novo-aluno__field__input'
            ref={nameInputEl}
            onChange={handleInputChange}
            autoFocus
          />
        </div>

        <div className='novo-aluno__field'>
          <label htmlFor='email' className='novo-aluno__field__label'>
            Email
          </label>
          <input type='email' id='email' value={input.email} className='novo-aluno__field__input' ref={emailInputEl} onChange={handleInputChange} />
        </div>

        <div className='novo-aluno__field'>
          <label htmlFor='whatsapp' className='novo-aluno__field__label'>
            Celular (WhatsApp)
          </label>
          <input
            type='tel'
            id='whatsapp'
            value={input.whatsapp}
            className='novo-aluno__field__input'
            ref={whatsappInputEl}
            onChange={handleInputChange}
            onKeyDown={handleInvalidPhoneCharacter}
            placeholder='(11) 92345 6789'
          />
        </div>
      </form>
      <Alert />
    </Modal>
  );
};
