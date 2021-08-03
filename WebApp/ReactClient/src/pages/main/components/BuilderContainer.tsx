import styled from 'styled-components';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';

type Props = {
  selectedBuilderType: AD_BUILDER_TYPE;
  setCurrentStep: (step: number) => void;
  setSelectedBuilderType: (type: AD_BUILDER_TYPE) => void;
};

export const BuilderContainer = ({
  selectedBuilderType,
  setCurrentStep,
  setSelectedBuilderType,
}: Props) => {
  const isSTAGFlowStarted = selectedBuilderType === AD_BUILDER_TYPE.STAG;
  const startSTAGFlow = () => {
    setCurrentStep(1);
    setSelectedBuilderType(AD_BUILDER_TYPE.STAG);
  };

  const render = () => {
    if (isSTAGFlowStarted) {
      return <div />;
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

  return render();
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
