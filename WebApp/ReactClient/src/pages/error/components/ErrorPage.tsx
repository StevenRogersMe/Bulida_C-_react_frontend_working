import React from 'react';
import styled from 'styled-components';

export const ErrorPage = () => (
  <PageContainer title='error.title'>
    <h1>Sorry, something went wrong</h1>
    <h2>We are sorry — something has gone wrong.</h2>
    <h2>Our team has been notified.</h2>
  </PageContainer>
);

const PageContainer = styled.div`
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: 6rem;
  background-color: #f2f5ff;
`;
