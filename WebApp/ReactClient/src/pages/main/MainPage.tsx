import styled from 'styled-components';
import { StepLayout } from 'src/components/layout/StepLayout';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';
import { useBuilderSelection } from 'src/hooks/useBuilderSelection';
import { AdBuilderType } from 'src/utils/types';
import { useSelector } from 'react-redux';
import { getSkagCampaign } from 'src/redux/skagCompaign/selectors';
import { getSkagFlowStep, getSkagSteps } from 'src/redux/skagCreationFlow/selectors';

export const MainPage = () => {
  const {
    selectedBuilderType,
    finishBuilderFlow,
    setSelectedBuilderType,
  } = useBuilderSelection();

  const skagCampaign = useSelector(getSkagCampaign);
  const skagFlow = useSelector(getSkagSteps);
  const currentStep = useSelector(getSkagFlowStep);
  const isSKAGFlow = selectedBuilderType === AdBuilderType.SKAG;
  const campaign = isSKAGFlow && skagCampaign;
  const flow = isSKAGFlow && skagFlow;

  return (
    <StepLayout
      currentStep={currentStep}
      progressBarSteps={flow || []}
      campaign={campaign || undefined}
      finishBuilderFlow={finishBuilderFlow}
    >
      <MainPageContainer>
        <BuilderContainer
          currentStep={currentStep}
          skagCampaign={skagCampaign}
          selectedBuilderType={selectedBuilderType}
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
