import React from 'react';
import './Button.scss';

type ModalTypes = 'form-btn-confirm' | 'form-btn-cancel' | 'header-btn' | 'return-btn' | 'regular-btn' | 'regular-btn-2';

interface ButtonParams {
  kind: ModalTypes;
  icon?: React.ReactElement;
  text: string;
  callback?: () => any;
}

export const Button = ({ kind, icon, text, callback }: ButtonParams): React.ReactElement => {
  let iconEl;

  if (icon) {
    iconEl = React.cloneElement(icon, {
      className: 'mybtn__icon',
    });
  }

  if (kind === 'header-btn') {
    return (
      <button className='mybtn mybtn--header' onClick={callback}>
        {iconEl} <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  if (kind === 'form-btn-confirm') {
    return (
      <button className='mybtn mybtn--confirm' onClick={callback}>
        <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  if (kind === 'form-btn-cancel') {
    return (
      <button className='mybtn mybtn--cancell' onClick={callback}>
        <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  if (kind === 'return-btn') {
    return (
      <button className='mybtn mybtn--return' onClick={callback}>
        {iconEl}
        <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  if (kind === 'regular-btn') {
    return (
      <button className='mybtn mybtn--regular' onClick={callback}>
        {iconEl}
        <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  if (kind === 'regular-btn-2') {
    return (
      <button className='mybtn mybtn--regular mybtn--regular--2' onClick={callback}>
        {iconEl}
        <div className='mybtn__text'>{text}</div>
      </button>
    );
  }

  return null;
};
