import styled from 'styled-components';
import { CampaignType } from 'src/utils/types';
import { SkagAdCreatorTableHeader } from 'src/components/skag/SkagAdCreatorTableHeader';

type Props = {
  campaign: CampaignType;
};

export const SkagAdCreator = ({ campaign }: Props) => {
  console.log(campaign);
  return (
    <Container>
      <Title>
        <Bold>Ad</Bold> Creator
      </Title>
      <SkagAdCreatorTableHeader />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
