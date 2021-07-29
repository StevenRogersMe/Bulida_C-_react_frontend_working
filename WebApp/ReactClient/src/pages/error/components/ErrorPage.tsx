import React from 'react';
import styled from 'styled-components';

export const ErrorPage = () => (
  <PageContainer title='error.title'>
    <h2>Sorry, something went wrong</h2>
    <p>We are sorry — something has gone wrong.</p>
    <p>Our team has been notified.</p>
  </PageContainer>
);

const PageContainer = styled.div`
  width: calc(100% - 9rem);
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: 6rem;
`;
