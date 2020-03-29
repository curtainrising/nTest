import React, { useState } from 'react';
import styled from 'styled-components';
import { UserWrapper } from '../../graphql/graphql';
import res from '../../res';
import { insertInToText, arrayToObjByKey } from '../../helpers/utils';
import Form from '../common/Form';
import Table from '../common/Table';
import Repository from './Repository';

const FilterForm = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Organization = ({data, name}) => {
  const [ repo, setRepo ] = useState(null);
  const [ filteredData, setFilteredData ] = useState(arrayToObjByKey(data.nodes, 'id'));
  const filterClicked = (inputData, extraprops) => {
    let tempData = Object.values(filteredData).filter(item => item.name.includes(inputData[0].value))
    console.log(inputData[1].value);
    if (inputData[1].value === '0') {
      const tempObj = tempData.reduce((acc, item) => {
        acc[item.name] = item
        return acc;
      },{})
      const tempNames = tempData.map(item => item.name).sort();
      tempData = tempNames.map((item) => tempObj[item]);
    } else {
      tempData = tempData.sort((a,b) => {
        if (inputData[1].value === '1') {
          return b.forkCount - a.forkCount;
        } else {
          return b.ref.target.history.totalCount - a.ref.target.history.totalCount;
        }
      })
    }
    setFilteredData(arrayToObjByKey(tempData, 'id'));
  }

  const handleRowClicked = (key) => {
    setRepo(key);
  }
  const columns = [
    res.repositoryName,
    res.forkCount,
    res.commitsToMaster
  ]
  const mappedData = Object.values(filteredData).map((item, index) => {
    return {
      data: [
        {type: 'text', text: item.name},
        {type: 'text', text: item.forkCount},
        {type: 'text', text: item.ref.target.history.totalCount},
      ],
      key: item.id
    }
  })
  const options = {
    type: 'list-row-selectable'
  }
  const inputs = [
    {type: 'input', variable: 'filter', value: ''},
    (() => {
      let dropDownOptions = [
        {key:0,value: res.repositoryName},
        {key:1,value: res.forkCount},
        {key:2,value: res.commitsToMaster}
      ];
      return {
        type: 'dropdown',
        variable: `orderBy`,
        options: dropDownOptions,
        selected: '0',
        value: '0'
      }
    })(),
    {type: 'button', onClick: filterClicked, description: res.filter}
  ];
  return (
    <div>
      {repo === null ? (
          <div>
            <FilterForm>
              <Form
                inputs={inputs}
                row={true}
              />
            </FilterForm>
            <Table
              columns={columns}
              onPressed={handleRowClicked}
              dataList={mappedData}
              options={options}
            />
          </div>
        ) : (
          <Repository
            name={name}
            setRepo={setRepo}
            data={filteredData[repo]}
          />
        )
      }
    </div>
  )
}

export default Organization
