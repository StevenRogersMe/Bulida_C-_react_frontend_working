import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';

export const MainPage = () => {
  return (
    <StepLayout>
      <MainPageContainer>
        <BuilderContainer />
      </MainPageContainer>
    </StepLayout>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3.2rem;
`;
