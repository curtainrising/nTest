import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import {
  query,
  getUserFunc,
  searchFunc,
  verifyTokenFunc,
  organizationPayload,
  userPayload,
  verifyTokenPayload,
} from './queries';
import { Query } from "react-apollo";

const token  = '562c76aea64417f7ee728d476cfab49eb7610918';
let client;

export const initiate = (authToken) => {
  client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: 'bearer ' + authToken
    }
  });
  return client;
}


const doGraphql = (graphqlQuery, mutate) => {
  return client[mutate ? 'mutate': 'query']({
    [mutate ? 'mutation': 'query']: gql`${graphqlQuery}`
  })
  .then(result => {
    console.log('finished', result);
    return result;
  })
  .catch(e => {
    console.log('e',e);
    return e;
  })
}
export const UserWrapper = ({data, children}) => {
  return (
    <Query query={gql`${query(verifyTokenFunc(), verifyTokenPayload())}`}>
      {children}
    </Query>
  );
}

export const search = (data) => {
  const graphqlQuery = `${query(searchFunc(data), organizationPayload())}`;
  return doGraphql(graphqlQuery, false);
}
export const verifyAuthentication = () => {
  const graphqlQuery = `${query(verifyTokenFunc(), verifyTokenPayload())}`;
  return doGraphql(graphqlQuery, false);
}
