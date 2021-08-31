import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';
import { useBuilderSelection } from 'src/hooks/useBuilderSelection';
import { AdBuilderType } from 'src/utils/types';
import { useSelector } from 'react-redux';
import { getSkagCampaign } from 'src/redux/skagCompaign/selectors';

export const MainPage = () => {
  const {
    currentStep,
    progressBarSteps,
    selectedBuilderType,
    setCurrentStep,
    finishBuilderFlow,
    setSelectedBuilderType,
  } = useBuilderSelection();

  const skagCampaign = useSelector(getSkagCampaign);
  const isSKAGFlow = selectedBuilderType === AdBuilderType.SKAG;

  const campaign = isSKAGFlow && skagCampaign;

  return (
    <StepLayout
      currentStep={currentStep}
      progressBarSteps={progressBarSteps}
      campaign={campaign || undefined}
      setCurrentStep={setCurrentStep}
      finishBuilderFlow={finishBuilderFlow}
    >
      <MainPageContainer>
        <BuilderContainer
          currentStep={currentStep}
          skagCampaign={skagCampaign}
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
