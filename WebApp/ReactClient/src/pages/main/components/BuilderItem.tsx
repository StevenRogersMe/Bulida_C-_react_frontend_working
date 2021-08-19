import styled from 'styled-components';
import { MIButton } from 'src/components/common/MIButton';
import {
  calculateBuilderItemDescription,
  calculateBuilderItemBackground,
} from 'src/utils/builder';
import { AdBuilderType } from 'src/utils/types';

type Props = {
  type: AdBuilderType;
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
      <MIButton label={description?.cta} onClick={onClick} />
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
  border: 0.5rem solid transparent;
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
  margin-bottom: 7rem;
  ${(props) => props.theme.text.fontType.body5};
`;
