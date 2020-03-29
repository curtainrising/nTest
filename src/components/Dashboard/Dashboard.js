import React, { useState } from 'react';
import styled from 'styled-components';
import { ApolloProvider } from "react-apollo";
import { initiate, UserWrapper} from '../../graphql/graphql';
import res from '../../res';
import Loading from '../common/Loading';
import { Authentication } from '../Authentication';
import { Search } from '../Search';

const Centered = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 15vh;
`;

const Container = styled.div`
  width: 30vw;
`;

const Title = styled.h1`
  text-align: center;
`;

const Dashboard = (props) => {
  const [ token, setToken ] = useState(props.token);
  const [ user, setUser ] = useState(props.user);

  if (token) {
    return (
      <ApolloProvider client={initiate(token)}>
        <UserWrapper>
          {({ loading, error, data }) => {
            if (loading) return (
              <Centered>
                <Loading />
              </Centered>
            )

            return (
              <Search
                data={data}
                setToken={setToken}
              />
            )
          }}
        </UserWrapper>
      </ApolloProvider>
    )
  } else {
    return (
      <Centered>
        <Authentication
          setToken={setToken}
          setUser={setUser}
        />
      </Centered>
    )
  }

}

export {Dashboard}
