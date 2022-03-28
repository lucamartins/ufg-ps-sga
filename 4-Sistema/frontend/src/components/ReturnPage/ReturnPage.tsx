import React from 'react';
import './ReturnPage.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

export const ReturnPage = () => {
  const navigate = useNavigate();

  return (
    <div className='return-page'>
      <Button kind='return-btn' icon={<AiOutlineArrowLeft />} text='Voltar' callback={() => navigate(-1)} />

      {/* <div className='return-page__btn'>

        <AiOutlineArrowLeft className='return-page__btn__icon' onClick={() => navigate(-1)} />
        <div className='return-page__btn__text'>Voltar</div>
      </div> */}
    </div>
  );
};
