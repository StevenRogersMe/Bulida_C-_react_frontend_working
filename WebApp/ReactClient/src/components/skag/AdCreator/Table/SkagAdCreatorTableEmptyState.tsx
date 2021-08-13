import styled from 'styled-components';
import EmptyIcon from 'src/images/general/empty-state-icon.svg';

export const SkagAdCreatorTableEmptyState = () => {
  return (
    <Container>
      <EmptyStateIcon src={EmptyIcon} />
      <Title>Looks like you didn’t create any Ads or Extentions yet...</Title>
      <Subtitle>
        To begin, create them by clicking “Add ads or extentions +”
      </Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 4rem 4rem 4rem;
`;

const EmptyStateIcon = styled.img`
  width: 20rem;
  height: 17rem;
`;

const Title = styled.span`
  display: flex;
  margin: 2rem 0;
  color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.h3};
`;

const Subtitle = styled.span`
  display: flex;
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.body2};
`;
