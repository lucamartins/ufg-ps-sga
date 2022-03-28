import React, { useState } from 'react';
import './Signup.scss';
import validator from 'validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Loading } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { ALERT_TYPE_ERROR } from '../../../components/Alert/alertTypes';
import { SiOpenaigym } from 'react-icons/si';
import { Container, Row, Col } from 'react-bootstrap';

const initialState = {
  name: { value: '', touched: false },
  email: { value: '', touched: false },
  password: { value: '', touched: false },
  passwordConfirmation: { value: '', touched: false },
};

export const Signup = ({ toggleToLogin }) => {
  const { displayAlert, registerUser } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  //
  // validateInput: (option?: { type: String }) => Boolean
  //

  const validateInput = (option) => {
    if (option) {
      if (option.type === 'name' && !validator.isEmpty(formData.name.value)) return true;
      if (option.type === 'email' && validator.isEmail(formData.email.value)) return true;
      if (option.type === 'password' && validator.isLength(formData.password.value, { min: 8 })) return true;
      if (option.type === 'passwordConfirmation' && validator.equals(formData.passwordConfirmation.value, formData.password.value)) return true;
    } else {
      if (
        !validator.isEmpty(formData.name.value) &&
        validator.isEmail(formData.email.value) &&
        validator.isLength(formData.password.value, { min: 8 }) &&
        validator.equals(formData.passwordConfirmation.value, formData.password.value)
      )
        return true;
    }

    return false;
  };

  const returnFormInputAlertClass = ({ obj, type }) => {
    if (!obj.touched) return '';

    if (type === 'email' && validateInput({ type })) return '';
    if (type === 'password' && validateInput({ type })) return '';
    if (type === 'passwordConfirmation' && validateInput({ type })) return '';

    return 'incorrect-form-input';
  };

  const handleChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    setFormData({ ...formData, [targetName]: { value: targetValue, touched: true } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      displayAlert('Preencha todos os campos corretamente antes de prosseguir', ALERT_TYPE_ERROR);
      return;
    }

    const userData = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, value.value]));
    delete userData.passwordConfirmation;

    console.log(userData);

    try {
      await registerUser(userData);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Falha na solicitação de cadastro:', err);
    }
  };

  return (
    <div className='signup'>
      <Alert />
      {/* <img src={Logo} alt='Logo Mergulho Sports' className='signup__logo' /> */}

      <div className='signup__box'>
        <div className='signup__box__header'>
          <Container>
            <Row className='gx-5'>
              <Col className='d-flex flex-column align-items-center'>
                <h1 className='signup__box__header__title'>Cadastrar</h1>
                <h1 className='signup__box__header__about'>Criar uma conta.</h1>
              </Col>
              <Col className='d-flex justify-content-center'>
                <div className='vr'></div>
              </Col>
              <Col className='d-flex align-items-center justify-content-end'>
                <SiOpenaigym style={{ fontSize: '4.5rem' }} />
              </Col>
            </Row>
          </Container>
        </div>

        <div className='signup__box__form-container'>
          <form action='submit' className='signup__box__form-container__form' onSubmit={handleSubmit}>
            {/* Nome */}
            <label htmlFor='name-input' className='signup__box__form-container__form__label'>
              Nome
            </label>
            <input
              type='text'
              placeholder='Julia Silva'
              className='signup__box__form-container__form__input'
              id='name-input'
              value={formData.name.value}
              onChange={handleChange}
              name='name'
            />

            {/* <label htmlFor='convenio-input' className='signup__box__form-container__form__label'>
              É aluno de empresa conveniada?
            </label>
            <select
              id='convenio-input'
              className='signup__box__form-container__form__input signup__box__form-container__form__input__select'
              value={formData.partnership.value}
              onChange={handleChange}
              name='partnership'
            >
              <option value='convenio-null'>Não possuo convênio</option>
              <option value='convenio-pacto'>Pacto Soluções</option>
              <option value='convenio-trt'>TRT</option>
            </select> */}

            {/* Email */}
            <label htmlFor='email-input' className='signup__box__form-container__form__label'>
              Email
            </label>
            <input
              type='text'
              placeholder='exemplo@email.com'
              className={`signup__box__form-container__form__input ${returnFormInputAlertClass({
                obj: formData.email,
                type: 'email',
              })}`}
              id='email-input'
              value={formData.email.value}
              onChange={handleChange}
              name='email'
            />

            {/* Senha */}
            <label htmlFor='password-input' className='signup__box__form-container__form__label'>
              Crie uma senha
            </label>
            <input
              type='password'
              placeholder={formData.password.touched || formData.passwordConfirmation.touched ? '' : '••••••••••••'}
              className={`signup__box__form-container__form__input ${returnFormInputAlertClass({
                obj: formData.password,
                type: 'password',
              })}`}
              id='password-input'
              value={formData.password.value}
              onChange={handleChange}
              name='password'
            />
            <div className='signup__box__form-container__form__password-advice'>Use 8 caracteres ou mais, incluindo letras, números e símbolos.</div>

            {/* Confirmacao senha */}
            <label htmlFor='password-confirm-input' className='signup__box__form-container__form__label'>
              Confirme sua senha
            </label>
            <input
              type='password'
              placeholder={formData.password.touched || formData.passwordConfirmation.touched ? '' : '••••••••••••'}
              className={`signup__box__form-container__form__input ${returnFormInputAlertClass({
                obj: formData.passwordConfirmation,
                type: 'passwordConfirmation',
              })}`}
              id='password-confirm-input'
              value={formData.passwordConfirmation.value}
              onChange={handleChange}
              name='passwordConfirmation'
            />

            <button className='signup__box__form-container__form__submit-btn'>Cadastrar</button>
          </form>
        </div>

        <div className='signup__box__footer'>
          <div className='signup__box__footer__line'>
            <div className='signup__box__footer__line__title'>Já possui uma conta? &nbsp;</div>
            <button className='signup__box__footer__line__btn' onClick={() => navigate('/login')}>
              Realizar login
            </button>
          </div>

          <div className='login__box__footer__line'>
            <div className='login__box__footer__line__title'>Esqueceu sua senha? &nbsp;</div>
            <button className='login__box__footer__line__btn'>Recuperar senha</button>
          </div>
        </div>
      </div>
      <Alert />
      <Loading />
    </div>
  );
};
