import React, { useState } from 'react';
import styled from 'styled-components';
import res from '../../res';

const Container = styled.div`
  width: 30vw;
`;

const Title = styled.h1`
  text-align: center;
`;

const Loading = (props) => (
  <Container>
    <Title>{res.loading}</Title>
  </Container>
)


export default Loading
