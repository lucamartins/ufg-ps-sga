import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClienteDetailed.scss';
import { ReturnPage, Button } from '../../../components';
import { useAppContext } from '../../../context';
import { ICustomer } from '../../../types';

export const ClienteDetailed = () => {
  const { userId } = useParams();
  const { customers } = useAppContext();
  const [customerTarget, setCustomerTarget] = useState<ICustomer>(null);

  useEffect(() => {
    const target = customers.find((customer) => customer._id === userId);
    setCustomerTarget(target);
    console.log(target);
  }, [customers, userId]);

  if (!customerTarget) return null;

  return (
    <div className='client-detailed'>
      <ReturnPage />
      <div className='line-separator'></div>

      <div className='client'>
        <div className='client__info'>
          <div className='client__info__header'>
            <div className='client__info__header__title'>{customerTarget.name}</div>
          </div>

          <div className='client__info__content'>
            <div className='u-padding--1'>
              <div className='client__info__content__box-1'>
                <div className='client__info__content__box-1__value'>
                  <span className='client__info__content__box-1__label'>ID:&nbsp;</span>
                  {customerTarget._id}
                </div>
                <div className='client__info__content__box-1__value'>
                  <span className='client__info__content__box-1__label'>Email:&nbsp;</span> {customerTarget.email}
                </div>
                <div className='client__info__content__box-1__value'>
                  <span className='client__info__content__box-1__label'>Celular:&nbsp;</span> {customerTarget.phoneNumber}
                </div>
              </div>
            </div>

            <div className='client__info__content__line-separator'></div>

            <div className='u-padding--1'>
              <div className='client__info__content__actions'>
                <Button kind='regular-btn' text='Editar' />
                <Button kind='regular-btn-2' text='Resetar senha' />
              </div>
            </div>
          </div>
        </div>
        <div className='client__contracts'>
          <div className='client__contracts__header'>
            <div className='client__contracts__header__title'>Contratos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
