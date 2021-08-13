import styled from 'styled-components';
import { config } from 'src/config/default';
import { AdBuilderType } from 'src/utils/types';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';
import { StagBuilder } from 'src/components/stag/StagBuilder';
import { StagAdCreator } from 'src/components/stag/StagAdCreator';
import { StagSettings } from 'src/components/stag/StagSettings';
import { StagReviewEditor } from 'src/components/stag/StagReviewEditor';
import { SkagBuilder } from 'src/components/skag/SkagBuilder';
import { SkagAdCreator } from 'src/components/skag/AdCreator/SkagAdCreator';
import { SkagSettings } from 'src/components/skag/SkagSettings';
import { SkagReviewEditor } from 'src/components/skag/SkagReviewEditor';
import { useSkagCampaignBuilder } from 'src/hooks/useSkagCampaignBuilder';

type Props = {
  currentStep: number;
  selectedBuilderType: AdBuilderType;
  setCurrentStep: (step: number) => void;
  setSelectedBuilderType: (type: AdBuilderType) => void;
};

export const BuilderContainer = ({
  currentStep,
  selectedBuilderType,
  setCurrentStep,
  setSelectedBuilderType,
}: Props) => {
  const isSKAGFlow = selectedBuilderType === AdBuilderType.SKAG;
  const isSTAGFlow = selectedBuilderType === AdBuilderType.STAG;

  const { skagCampaign, setSkagKeywords, createExpTextAdExt } =
    useSkagCampaignBuilder();

  const startSKAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AdBuilderType.SKAG);
  };

  const startSTAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AdBuilderType.STAG);
  };

  const startADFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AdBuilderType.AD);
  };

  const SKAGFlowPages = {
    1: <SkagBuilder campaign={skagCampaign} setKeywords={setSkagKeywords} />,
    2: (
      <SkagAdCreator
        campaign={skagCampaign}
        createExpTextAdExt={createExpTextAdExt}
      />
    ),
    3: <SkagSettings />,
    4: <SkagReviewEditor />,
  };

  const STAGFlowPages = {
    1: <StagBuilder />,
    2: <StagAdCreator />,
    3: <StagSettings />,
    4: <StagReviewEditor />,
  };

  const renderBuilderStep = () => {
    if (isSKAGFlow) {
      return SKAGFlowPages[currentStep] || <div>Not Found</div>;
    }

    if (isSTAGFlow) {
      return STAGFlowPages[currentStep] || <div>Not Found</div>;
    }

    return (
      <Container>
        <BuilderItem type={AdBuilderType.SKAG} onClick={startSKAGFlow} />
        {config.featureFlags.stag && (
          <BuilderItem type={AdBuilderType.STAG} onClick={startSTAGFlow} />
        )}
        {config.featureFlags.ad && (
          <BuilderItem type={AdBuilderType.AD} onClick={startADFlow} />
        )}
      </Container>
    );
  };

  return renderBuilderStep();
};

const Container = styled.div`
  width: 100%;
  margin: 0 13rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > div:nth-child(2) {
    margin: 0 3.5rem;
  }
`;
