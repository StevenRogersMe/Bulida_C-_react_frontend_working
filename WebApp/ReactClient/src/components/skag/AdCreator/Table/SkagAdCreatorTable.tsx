import styled from 'styled-components';

export const SkagAdCreatorTable = () => {
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
        <Table />
      </BlockContainer>
    </Container>
  );
};

const Container = styled.div`
  width: inherit;
  margin-bottom: 3rem;
  display: flex;
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
  width: 100%;
  padding: 1.5rem 3rem;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.body2};
  font-weight: 500;
`;

const LeftBlock = styled.div`
  display: flex;
  width: 50%;
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
  width: 100%;
  padding: 1.5rem 3rem;
  ${(props) => props.theme.text.fontType.body2};
`;
