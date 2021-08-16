import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';
import { useBuilderSelection } from 'src/hooks/useBuilderSelection';
import { useSkagCampaignBuilder } from 'src/hooks/useSkagCampaignBuilder';
import { AdBuilderType } from 'src/utils/types';

export const MainPage = () => {
  const {
    currentStep,
    progressBarSteps,
    selectedBuilderType,
    setCurrentStep,
    finishBuilderFlow,
    setSelectedBuilderType,
  } = useBuilderSelection();

  const { skagCampaign, setSkagKeywords, createAds } =
    useSkagCampaignBuilder();

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
          setSkagKeywords={setSkagKeywords}
          createAds={createAds}
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
