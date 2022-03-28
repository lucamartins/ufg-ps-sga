import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import { Button } from '../../components';

interface IModalParams {
  children: any;
  showModal: boolean;
  title: string;
  confirmActionText: string;
  abortFn: () => void;
  confirmFn: () => void;
}

export const Modal = ({ children, showModal, title, confirmActionText, abortFn, confirmFn }: IModalParams) => {
  const modalEl = (
    <div className='overlay'>
      <div className='mymodal'>
        <div className='mymodal__title'>{title}</div>
        <div className='mymodal__line-separator'></div>
        <div className='mymodal__form'>{children}</div>
        <div className='mymodal__line-separator'></div>
        <div className='mymodal__action'>
          <Button kind='form-btn-cancel' text='Cancelar' callback={abortFn} />
          <Button kind='form-btn-confirm' text={confirmActionText} callback={confirmFn} />
        </div>
      </div>
    </div>
  );

  if (!showModal) return null;

  const rootModalEl = document.querySelector('.root-modal') as Element;

  return ReactDOM.createPortal(modalEl, rootModalEl);
};
