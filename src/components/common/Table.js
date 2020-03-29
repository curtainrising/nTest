import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import Input from './Input';

const TableMain = styled.div`
  width: 100vw;
  left: 0;
  /* display: grid; */
  /* grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start]) */
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const TableHeaderRow = styled.div`
  position: sticky;
  top: 0;
  justify-self: stretch;
  grid-column: 1 / end;
  display: grid;
  grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start])
`;

const TableRow = styled.div`
  justify-self: stretch;
  grid-column: 1 / end;
  display: grid;
  grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start]);
  padding-top: 8px;
  padding-bottom: 8px;
  outline: 1px solid black;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const overflowText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CheckboxStyle = styled.input`
  box-shadow: inset 0 1px 3px rgba(0,0,0,.5);
`

const Table = ({columns = [], dataList = [], options, onPressed}) => {
  return (
    <TableMain
      columns={columns.length}
    >
      <TableHeaderRow
        columns={columns.length}
      >
        {columns.map((c, ind) => <Header>{c}</Header>)}
      </TableHeaderRow>
      {dataList.map((row, ind1) => {
        return (
        <TableRow
          className={options.type}
          onClick={()=>onPressed && onPressed(row.key)}
          columns={columns.length}
        >
          {row.data.map((item, ind) => {
            if (item.type === 'text') {
              return (<overflowText>{item.text}</overflowText>);
            }
            return '';
          })}
        </TableRow>
      )})}
    </TableMain>
  )
}


export default Table;
