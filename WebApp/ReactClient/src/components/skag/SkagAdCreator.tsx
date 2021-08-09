import { useState } from 'react';
import styled from 'styled-components';
import { CampaignType, AdType } from 'src/utils/types';
import { SkagAdCreatorTableHeader } from 'src/components/skag/SkagAdCreatorTableHeader';

type Props = {
  campaign: CampaignType;
};

export const SkagAdCreator = ({ campaign }: Props) => {
  const [selectedAdType, setSelectedAdType] = useState<AdType>(AdType.ALL);

  const onSelectAdType = (result) => {
    const { value } = result;
    setSelectedAdType(value);
  };

  return (
    <Container>
      <Title>
        <Bold>Ad</Bold> Creator
      </Title>
      <SkagAdCreatorTableHeader
        selectedAdType={selectedAdType}
        onSelectAdType={onSelectAdType}
      />
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
