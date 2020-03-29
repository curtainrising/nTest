import React, { useState } from 'react';
import styled from 'styled-components';
import { search } from '../../graphql/graphql';
import res from '../../res';
import { insertInToText } from '../../helpers/utils';
import Form from '../common/Form';
import Table from '../common/Table';


const Centered = styled.div`
  display: grid;
  justify-content: center;
`;

const Container = styled.div`
  width: 30vw;
`;

const Title = styled.h1`
  text-align: center;
`;

const Path = styled.div`
  display: flex;
`;

const Back = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const Repository = ({setRepo, data, name}) => {
  console.log('data',data);
  const handleRowClicked = (key) => {
    window.open(data.ref.target.history.nodes[key].commitUrl, "_blank")
  }
  const columns = [
    res.author,
    res.date,
    res.commitId
  ]
  const mappedData = data.ref.target.history.nodes.map((item, index) => {
    return {
      data: [
        {type: 'text', text: item.author.name},
        {type: 'text', text: item.message},
        {type: 'text', text: item.abbreviatedOid},
      ],
      key: index
    }
  })
  const options = {
    type: 'list-row-selectable'
  }
  return (
    <div>
      <Centered>
        <Path>
          <Back onClick={() => setRepo(null)}>{name}</Back>{`/${data.name}`}
        </Path>
      </Centered>
      <Table
        columns={columns}
        onPressed={handleRowClicked}
        dataList={mappedData}
        options={options}
      />
    </div>
  )
}

export default Repository;
