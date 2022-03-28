import React from 'react';
import './Table.scss';
import { v4 as uuidv4 } from 'uuid';

interface ITableParams {
  titles: string[];
  objectsArr: any[];
  properties: string[];
  onClickHandler: (event: any) => void;
}

export const Table = ({ titles, objectsArr, properties, onClickHandler }: ITableParams) => {
  return (
    <table className='table' onClick={onClickHandler}>
      <thead className='table__head'>
        <tr className='table__head__row'>
          {titles.map((title) => (
            <th key={uuidv4()} className='table__head__row__th'>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='table__body'>
        {objectsArr.map((object) => (
          <tr key={uuidv4()} className='table__body__row' id={object._id}>
            {properties.map((property) => (
              <td key={uuidv4()} className='table__body__row__td'>
                {object[property]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
