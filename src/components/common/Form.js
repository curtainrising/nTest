import React, { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import styled from 'styled-components';
import res from '../../res';
import { BUTTON_SIZES } from '../../helpers/constants';

const Container = styled.div`
  width: 100%;
  ${(props) => props.row ? 'display: flex; flex-direction: row' : ''}
`

const Button = styled.button`
  ${(props) => {
    if (props.size === BUTTON_SIZES.MEDIUM) {
      return 'padding: 5px;'
    }
    return '';
  }}
`

const Form = ({inputs = [], ...props}) => {
  const [ inputData, setInputData ] = useState(inputs);
  const [ loading, setLoading ] = useState(false);

  const onBlur = (variable, index) => (val) => {
    let temp = [...inputData];
    temp[index] = {...temp[index], variable, value: val}
    setInputData(temp)
  }
  const onSelect = (index) => (val) => {
    let temp = [...inputData];
    temp[index].value = val.target.value;
    setInputData(temp);
  }
  const requirementSolved = (index) => () => {
    console.log('here');
    let temp = [...inputData];
    temp[index].required = false;
    setInputData(temp);
  }
  return (
    <Container row={props.row}>
      {inputData.map((item, index) => {
        if (item.type === 'input') {
          return (
            <Input
              labelText={res[item.variable]}
              currText={item.value}
              onBlur={onBlur(item.variable, index)}
              type={item.variable}
              required={item.required}
              setRequired={requirementSolved(index)}
              linkText={item.linkText}
              link={item.link}
            />
          )
        }
        if (item.type === 'dropdown') {
          return (
            <Dropdown
              description={res[item.variable]}
              options={item.options}
              selected={item.selected}
              onSelect={onSelect(index)}
            />
          )
        }
        if (item.type === 'button') {
          let onClick = () => {
            let required = (item.required && item.required.filter(req => !inputData[0].value)) || [];
            if(required.length) {
              setInputData(required.reduce((acc, req) => {
                acc[req].required = true;
                return acc;
              }, [...inputData]));
              return;
            }

            if (item.canLoad) {
              setLoading(true);
            }

            item.onClick(inputData, props, setLoading);
          }
          return (
            <Button
              size={item.size || BUTTON_SIZES.SMALL}
              disabled={(item.canLoad && loading)}
              onClick={() => onClick()}
            >{item.description}</Button>
          )
        }
      })}
    </Container>
  )
}

export default Form;
