import styled from 'styled-components';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';

type Props = {
  setCurrentStep: (step: number) => void;
  setSelectedBuilderType: (type: AD_BUILDER_TYPE) => void;
};

export const BuilderContainer = ({
  setCurrentStep,
  setSelectedBuilderType,
}: Props) => {
  const startSTAGFlow = () => {
    setCurrentStep(1)
    setSelectedBuilderType(AD_BUILDER_TYPE.STAG);
  };

  return (
    <Container>
      <BuilderItem type={AD_BUILDER_TYPE.STAG} onClick={startSTAGFlow} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
