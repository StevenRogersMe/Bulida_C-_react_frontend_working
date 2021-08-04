import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';
import { useBuilderSelection } from 'src/hooks/useBuilderSelection';

export const MainPage = () => {
  const {
    currentStep,
    progressBarSteps,
    selectedBuilderType,
    setCurrentStep,
    finishBuilderFlow,
    setSelectedBuilderType,
  } = useBuilderSelection();

  return (
    <StepLayout
      currentStep={currentStep}
      progressBarSteps={progressBarSteps}
      setCurrentStep={setCurrentStep}
      finishBuilderFlow={finishBuilderFlow}
    >
      <MainPageContainer>
        <BuilderContainer
          currentStep={currentStep}
          selectedBuilderType={selectedBuilderType}
          setCurrentStep={setCurrentStep}
          setSelectedBuilderType={setSelectedBuilderType}
        />
      </MainPageContainer>
    </StepLayout>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
