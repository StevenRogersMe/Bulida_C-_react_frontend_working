import styled from 'styled-components';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';
import { Builder } from 'src/components/stag/Builder';
import { AdCreator } from 'src/components/stag/AdCreator';
import { Configurator } from 'src/components/stag/Configurator';
import { Reviewer } from 'src/components/stag/Reviewer';

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
  const isSTAGFlowStarted = selectedBuilderType === AD_BUILDER_TYPE.STAG;
  const startSTAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AD_BUILDER_TYPE.STAG);
  };

  const STAGFlowPages = {
    1: <Builder />,
    2: <AdCreator />,
    3: <Configurator />,
    4: <Reviewer />,
    5: <div>Page 5</div>,
  };

  const renderBuilderStep = () => {
    if (isSTAGFlowStarted) {
      return STAGFlowPages[currentStep] || <div>Not Found</div>;
    }

    return (
      <Container>
        <BuilderItem
          type={AD_BUILDER_TYPE.SKAG}
          onClick={() => console.log('Start SKAG flow')}
        />
        <BuilderItem type={AD_BUILDER_TYPE.STAG} onClick={startSTAGFlow} />
        <BuilderItem
          type={AD_BUILDER_TYPE.AD}
          onClick={() => console.log('Start AD flow')}
        />
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
