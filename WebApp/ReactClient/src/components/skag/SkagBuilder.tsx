import styled from 'styled-components';

export const SkagBuilder = () => {
  return (
    <Container>
      <Title>
        Build <Bold>SKAG</Bold>
      </Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h1};
`;

const Bold = styled.span`
  font-weight: bold;
`;
