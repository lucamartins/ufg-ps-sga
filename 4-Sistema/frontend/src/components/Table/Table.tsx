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
    <table className='c-table' onClick={onClickHandler}>
      <thead className='c-table__head'>
        <tr className='c-table__head__row'>
          {titles.map((title) => (
            <th key={uuidv4()} className='c-table__head__row__th'>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='c-table__body'>
        {objectsArr.map((object) => (
          <tr key={uuidv4()} className='c-table__body__row' id={object._id}>
            {properties.map((property) => (
              <td key={uuidv4()} className='c-table__body__row__td'>
                {object[property]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
