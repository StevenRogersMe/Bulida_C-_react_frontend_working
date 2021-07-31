import styled from 'styled-components';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';

export const BuilderContainer = () => {
  return (
    <Container>
      <BuilderItem type={AD_BUILDER_TYPE.STAG} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
