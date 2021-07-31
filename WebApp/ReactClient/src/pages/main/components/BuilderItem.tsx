import styled from 'styled-components';
import StagIcon from 'src/images/general/stag-icon.svg';
import { AD_BUILDER_TYPE } from 'src/utils/consts';
import { AdBuilderType } from 'src/utils/types';

export const BuilderItem = ({ type }: AdBuilderType) => {
  const calculateItemDescription = () => {
    let description;
    if (type === AD_BUILDER_TYPE.STAG) {
      return (description = {
        header: 'Build',
        title: 'STAG',
        subtitle:
          'Single Theme Ad Group — ad groups can contain 1000 keywords in them.',
        icon: StagIcon,
      });
    }

    return description;
  };

  const description = calculateItemDescription();

  return (
    <Container>
      <Icon src={description?.icon} />
      <Header>{description?.header}</Header>
      <Title>{description?.title}</Title>
      <Subtitle>{description?.subtitle}</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 31rem;
  height: 22rem;
  border-radius: 1.5rem;
  padding: 3rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 5px solid transparent;

  &:hover {
    cursor: pointer;
    border: 5px solid ${(props) => props.theme.colors.blue4};
  }
`;

const Header = styled.div`
  ${(props) => props.theme.text.fontType.body3};
`;

const Title = styled.div`
  ${(props) => props.theme.text.fontType.h2};
`;

const Subtitle = styled.div`
  ${(props) => props.theme.text.fontType.body3};
`;

const Icon = styled.img`
  position: absolute;
  top: -5rem;
  right: 3.8rem;
  height: 12rem;
  width: 12rem;
`;
