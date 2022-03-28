import React from 'react';
import './Alert.scss';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppContext } from '../../context/appContext';

export const Alert = () => {
  const { showAlert, alertType, alertText, clearAlertNoDelay } = useAppContext();

  if (!showAlert) return null;

  return (
    <div className={`alert alert--${alertType}`}>
      <FiAlertCircle className='alert__icon'></FiAlertCircle>
      <div className='alert__text'>{alertText}</div>
      <AiOutlineClose className='alert__close-btn' onClick={() => clearAlertNoDelay()}></AiOutlineClose>
    </div>
  );

  // return ReactDOM.createPortal(
  //   <div className={`alert alert--${alertType}`}>
  //     <FiAlertCircle className='alert__icon'></FiAlertCircle>
  //     <div className='alert__text'>{alertText}</div>
  //     <AiOutlineClose className='alert__close-btn' onClick={() => clearAlertNoDelay()}></AiOutlineClose>
  //   </div>,
  //   document.querySelector('.root-modal')
  // );
};
