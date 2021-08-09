import styled from 'styled-components';
import { config } from 'src/config/default';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';
import { StagBuilder } from 'src/components/stag/StagBuilder';
import { StagAdCreator } from 'src/components/stag/StagAdCreator';
import { StagConfigurator } from 'src/components/stag/StagConfigurator';
import { StagReviewer } from 'src/components/stag/StagReviewer';
import { SkagBuilder } from 'src/components/skag/SkagBuilder';
import { SkagAdCreator } from 'src/components/skag/SkagAdCreator';
import { SkagConfigurator } from 'src/components/skag/SkagConfigurator';
import { SkagReviewer } from 'src/components/skag/SkagReviewer';
import { useSkagCampaignBuilder } from 'src/hooks/useSkagCampaignBuilder';

type Props = {
  currentStep: number;
  selectedBuilderType: AD_BUILDER_TYPE;
  setCurrentStep: (step: number) => void;
  setSelectedBuilderType: (type: AD_BUILDER_TYPE) => void;
};

export const BuilderContainer = ({
  currentStep,
  selectedBuilderType,
  setCurrentStep,
  setSelectedBuilderType,
}: Props) => {
  const isSKAGFlow = selectedBuilderType === AD_BUILDER_TYPE.SKAG;
  const isSTAGFlow = selectedBuilderType === AD_BUILDER_TYPE.STAG;

  const { skagCampaign, setSkagKeywords } = useSkagCampaignBuilder();

  const startSKAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AD_BUILDER_TYPE.SKAG);
  };

  const startSTAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AD_BUILDER_TYPE.STAG);
  };

  const startADFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AD_BUILDER_TYPE.AD);
  };

  const SKAGFlowPages = {
    1: <SkagBuilder campaign={skagCampaign} setKeywords={setSkagKeywords} />,
    2: <SkagAdCreator campaign={skagCampaign} />,
    3: <SkagConfigurator />,
    4: <SkagReviewer />,
  };

  const STAGFlowPages = {
    1: <StagBuilder />,
    2: <StagAdCreator />,
    3: <StagConfigurator />,
    4: <StagReviewer />,
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
        <BuilderItem type={AD_BUILDER_TYPE.SKAG} onClick={startSKAGFlow} />
        {config.featureFlags.stag && (
          <BuilderItem type={AD_BUILDER_TYPE.STAG} onClick={startSTAGFlow} />
        )}
        {config.featureFlags.ad && (
          <BuilderItem type={AD_BUILDER_TYPE.AD} onClick={startADFlow} />
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
