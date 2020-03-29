import React, { useState } from 'react';
import styled from 'styled-components';
import res from '../../res';
import { GITHUB_AUTH_URL } from '../../helpers/constants';
import Form from '../common/Form';
import { initiate, verifyAuthentication } from '../../graphql/graphql';

const Container = styled.div`
  width: 30vw;
`;

const Title = styled.h1`
  text-align: center;
`

const Authentication = ({setToken, setUser}) => {
  const [ error, setError] = useState('');
  const onClick = (inputData, extraprops, setLoading) => {
    initiate(inputData[0].value);
    verifyAuthentication()
    .then(res => {
      if (res.message) {
        setLoading(false);
        setError(res.message);
      } else {
        localStorage.setItem('githubToken', inputData[0].value);
        setToken(inputData[0].value)
      }
    })
    .catch(e => {
      setError(e.message);
    })
  }
  const inputs = [
    {type: 'input', variable: 'authToken', value: '', linkText: res.authTokenLink, link: GITHUB_AUTH_URL},
    {type: 'button', onClick: onClick, description: res.authButton, canLoad: true, required: [0]}
  ];
  return (
    <Container>
      <Title>{res.notAuthenticated}</Title>
      <Form
        inputs={inputs}
      />
      <div>
        {error}
      </div>
    </Container>
  )
}

export {Authentication}
