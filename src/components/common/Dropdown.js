import React from 'react';
import styled from 'styled-components';

const Dropdown = ({description, selected, options, onSelect}) => {
  return (
    <div>
      <div>{description}</div>
      <select onChange={onSelect}>
        {options.map((item, index) => (
          <option selected={selected === index} key={item.key} value={item.key}>{item.value}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown;
