import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';
import { useBuilderSelection } from 'src/hooks/useBuilderSelection';

export const MainPage = () => {
  const { progressBarSteps, setSelectedBuilderType } = useBuilderSelection();

  return (
    <StepLayout progressBarSteps={progressBarSteps}>
      <MainPageContainer>
        <BuilderContainer setSelectedBuilderType={setSelectedBuilderType} />
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
