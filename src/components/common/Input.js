import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import res from '../../res';

const Container = styled.div`
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
`

export default ({labelText, linkText, link, defaultText, currText = '', type, onBlur, required, setRequired}) => {
  const [ text, setText ] = useState(currText);
  const onChange = (event) => {
    required && setRequired(false);
    setText(event.target.value);
  }
  return (
    <Container>
      {labelText && <div>{`${labelText}${linkText && ' - '}`}{linkText && <a href={link} target="_blank">{linkText}</a>}{required && res.required}</div>}
      <StyledInput onChange={onChange} onBlur={() => onBlur(text)} value={text}/>
    </Container>
  )
}
