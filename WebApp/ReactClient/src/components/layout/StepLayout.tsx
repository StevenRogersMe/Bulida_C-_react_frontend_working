import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export const StepLayout = ({ children }: Props) => {
  return (
    <>
      <StepHeader>StepHeader</StepHeader>
      <Children>{children}</Children>
      <StepFooter>StepFooter</StepFooter>
    </>
  );
};

const Children = styled.div``;

const StepHeader = styled.div`
  margin: 4rem 0;
`;

const StepFooter = styled.div`
  position: absolute;
  bottom: 0;
  margin: 4rem 0 7rem 0;
`;
