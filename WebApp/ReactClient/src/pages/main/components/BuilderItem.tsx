import styled from 'styled-components';
import {
  calculateBuilderItemDescription,
  calculateBuilderItemBackground,
} from 'src/utils/builder';
import { AD_BUILDER_TYPE } from 'src/utils/consts';

type Props = {
  type: AD_BUILDER_TYPE;
  onClick: () => void;
};

export const BuilderItem = ({ type, onClick }: Props) => {
  const description = calculateBuilderItemDescription(type);
  const background = calculateBuilderItemBackground(type);

  return (
    <Container background={background}>
      <HeaderContainer>
        <Icon src={description?.icon} />
        <Title>{description?.title}</Title>
      </HeaderContainer>
      <Subtitle>{description?.subtitle}</Subtitle>
      <ActionButton onClick={onClick}>{description?.cta}</ActionButton>
    </Container>
  );
};

const Container = styled.div<{ background: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 24rem;
  border-radius: 1.6rem;
  padding: 3rem;
  background-color: ${(props) => props.background};
  border: 5px solid transparent;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 2rem;
`;

const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  padding-right: 1rem;
`;

const Title = styled.div`
  ${(props) => props.theme.text.fontType.h2};
`;

const Subtitle = styled.div`
  ${(props) => props.theme.text.fontType.body5};
`;

const ActionButton = styled.button`
  cursor: pointer;
  border-radius: 1rem;
  padding: 1.5rem 13rem;
  margin-top: 7rem;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.body6};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;
