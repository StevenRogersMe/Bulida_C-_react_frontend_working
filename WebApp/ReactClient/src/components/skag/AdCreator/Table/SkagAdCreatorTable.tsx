import styled from 'styled-components';
import { SkagAdCreatorTableEmptyState } from 'src/components/skag/AdCreator/Table/SkagAdCreatorTableEmptyState';
import { AdType, AdGroupType } from 'src/utils/types';
import { SkagAdCreatorTableItem } from 'src/components/skag/AdCreator/Table/SkagAdCreatorTableItem';

type Props = {
  adsCount: number;
  adGroupList: AdGroupType[];
  selectedAdType: AdType;
  selectedAdGroup: string;
};

export const SkagAdCreatorTable = ({
  adsCount,
  adGroupList,
  selectedAdType,
  selectedAdGroup,
}: Props) => {
  const showEmptyState = adsCount === 0;

  const renderItems = () => {
    const selectedAd = adGroupList.find((el) => el.adGroup === selectedAdGroup);
    const items: any = [];

    if (selectedAdType === AdType.ALL) {
      items.push(selectedAd?.expTextAdExt);
      items.push(selectedAd?.callOnlyExt);
      items.push(selectedAd?.searchExt);
      items.push(selectedAd?.snippetExt);
      items.push(selectedAd?.callOutExt);
    }

    if (selectedAdType === AdType.CALL) {
      items.push(selectedAd?.callOnlyExt);
    }

    if (selectedAdType === AdType.CALLOUT) {
      items.push(selectedAd?.callOutExt);
    }

    if (selectedAdType === AdType.EXPANDED) {
      items.push(selectedAd?.expTextAdExt);
    }

    if (selectedAdType === AdType.RESPONSIVE) {
      items.push(selectedAd?.searchExt);
    }

    if (selectedAdType === AdType.SNIPPET) {
      items.push(selectedAd?.snippetExt);
    }

    return (
      <>
        {items.map((item, index) => (
          <SkagAdCreatorTableItem
            key={index}
            item={item}
            adGroupList={adGroupList}
          />
        ))}
      </>
    );
  };

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
        {showEmptyState ? (
          <SkagAdCreatorTableEmptyState />
        ) : (
          <ItemsContainer>{renderItems()}</ItemsContainer>
        )}
        <Footer />
      </BlockContainer>
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

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  ${(props) => props.theme.text.fontType.body2};
`;

const Footer = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  background-color: ${(props) => props.theme.colors.blue2};
`;
