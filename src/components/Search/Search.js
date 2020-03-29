import React, { useState } from 'react';
import styled from 'styled-components';
import { search } from '../../graphql/graphql';
import res from '../../res';
import { insertInToText } from '../../helpers/utils';
import { BUTTON_SIZES } from '../../helpers/constants';
import Form from '../common/Form';
import Loading from '../common/Loading';
import Organization from './Organization';


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

const TitleContainer = styled.div`
  display: flex;
`;

const Search = ({data, setToken}) => {
  const resetToken = () => {
    setToken('');
    localStorage.setItem('githubToken', '');
  }
  if (!data || !data.viewer || !data.viewer.login) {
    resetToken();
    return <Loading />;
  }
  const [ organizationRepositories, setOrganizationRepositories ] = useState('')
  const [ orgName, setOrgName ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading] = useState(false);
  const onClick = (inputData, extraprops, disable) => {
    setLoading(true);
    setOrganizationRepositories('')
    search({organization: inputData[0].value})
    .then(res => {
      if (res.message) {
        disable(false);
        setLoading(false);
        setError(res.message);
      } else {
        disable(false);
        setLoading(false);
        setOrganizationRepositories(res.data.search)
        setOrgName(inputData[0].value);
      }
    })
    .catch(e => {
      setError(e.message);
    })
  }
  const inputs = [
    {type: 'input', variable: 'organization', value: ''},
    {type: 'button', onClick: onClick, description: res.find, canLoad: true, size: BUTTON_SIZES.MEDIUM, required: [0]},
    {type: 'button', onClick: resetToken, description: res.unAuth, size: BUTTON_SIZES.MEDIUM},
  ];
  return (
    <div>
      <Centered>
        <Container>
          <TitleContainer>
            <Title>{insertInToText(res.welcomTitle, data.viewer.login)}</Title>
          </TitleContainer>
          <Form
            inputs={inputs}
          />
          {loading && <Loading />}
        </Container>
      </Centered>
      {organizationRepositories && (
        <Organization
          name={orgName}
          data={organizationRepositories}
        />
      )}
    </div>
  )
}

export {Search}
