import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../context';
import { Alert, Loading } from '../../../components';
import { SiOpenaigym } from 'react-icons/si';

export const Login = () => {
  const { userAuth, loginUser } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || '/';
  const from = '/';

  const [input, setInput] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    const target = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [target.id]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginUser({ email: input.email, password: input.password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userAuth) {
      navigate(from, { replace: true });
    }
  }, [userAuth, from, navigate]);

  return (
    <div className='login'>
      <div className='login__box'>
        <div className='login__box__header'>
          <SiOpenaigym alt='Logo Mergulho Sports' className='login__box__header__logo' />
          {/* <img src={Logo2} alt='Logo Mergulho Sports' className='login__box__header__logo' /> */}
          <h1 className='login__box__header__title'>Realizar Login</h1>
          <h1 className='login__box__header__about'>Acesse sua conta através do email e senha cadastrados.</h1>
        </div>

        <div className='login__box__form-container'>
          {/* <h1 className="login__box__form-container__title">Já possui cadastro?</h1> */}
          <form action='submit' className='login__box__form-container__form'>
            <label htmlFor='email' className='login__box__form-container__form__label'>
              Email
            </label>
            <input type='text' placeholder='exemplo@email.com' className='login__box__form-container__form__input' id='email' value={input.email} onChange={handleInputChange} />

            <label htmlFor='password' className='login__box__form-container__form__label'>
              Senha
            </label>
            <input
              type='password'
              placeholder='••••••••••••'
              className='login__box__form-container__form__input'
              id='password'
              value={input.password}
              onChange={handleInputChange}
            />
            <button className='login__box__form-container__form__submit-btn' onClick={handleSubmit}>
              Entrar
            </button>
          </form>
        </div>

        <div className='login__box__footer'>
          <div className='login__box__footer__line'>
            <div className='login__box__footer__line__title'>Ainda não possui uma conta? &nbsp;</div>
            <button className='login__box__footer__line__btn' onClick={() => navigate('/signup')}>
              Realizar cadastro
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
