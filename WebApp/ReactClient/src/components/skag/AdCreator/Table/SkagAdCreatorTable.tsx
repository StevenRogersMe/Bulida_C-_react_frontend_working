import styled from 'styled-components';
import { SkagAdCreatorTableEmptyState } from 'src/components/skag/AdCreator/Table/SkagAdCreatorTableEmptyState';

type Props = {
  adsCount: number;
};

export const SkagAdCreatorTable = ({ adsCount }: Props) => {
  const showEmptyState = adsCount === 0;
  return (
    <Container>
      <BlockContainer>
        <Header>
          <LeftBlock>Ads</LeftBlock>
          <RightBlock>
            <RightBlockItem>Type</RightBlockItem>
            <RightBlockItem>Add groups</RightBlockItem>
          </RightBlock>
        </Header>
        {showEmptyState ? <SkagAdCreatorTableEmptyState /> : <Table />}
      </BlockContainer>
      {!showEmptyState && (
        <BlockContainer>
          <Table />
          <Footer />
        </BlockContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: inherit;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;

  > div:nth-child(1) {
    margin-bottom: 1rem;
  }
`;

const BlockContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  overflow: hidden;
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
`;

const Header = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.body2};
  font-weight: 500;
`;

const LeftBlock = styled.div`
  display: flex;
  width: 55%;
`;

const RightBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
`;

const RightBlockItem = styled.div`
  display: flex;
`;

const Table = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  ${(props) => props.theme.text.fontType.body2};
`;

const Footer = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  background-color: ${(props) => props.theme.colors.blue2};
`;
