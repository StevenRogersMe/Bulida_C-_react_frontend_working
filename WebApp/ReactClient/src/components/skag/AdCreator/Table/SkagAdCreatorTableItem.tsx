import styled from 'styled-components';
import { AdType, AdGroupType } from 'src/utils/types';
import { calculateAdGroupNamesByType } from 'src/utils/builder';
import { ExpTextCard } from 'src/components/skag/AdCreator/Table/ExpTextCard';
import { CallOnlyCard } from 'src/components/skag/AdCreator/Table/CallOnlyCard';
import { ResponsiveSearchCard } from 'src/components/skag/AdCreator/Table/ResponsiveSearchCard';
import { SnippetCard } from 'src/components/skag/AdCreator/Table/SnippetCard';

type Props = {
  item: any;
  adGroupList: AdGroupType[];
};

export const SkagAdCreatorTableItem = ({ item, adGroupList }: Props) => {
  const renderItem = (item) => {
    const { type } = item;
    const adGroupNames = calculateAdGroupNamesByType(type, adGroupList);
    if (type === AdType.EXPANDED) {
      return (
        <ExpTextCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
        />
      );
    }

    if (type === AdType.CALL) {
      return (
        <CallOnlyCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
        />
      );
    }

    if (type === AdType.RESPONSIVE) {
      return (
        <ResponsiveSearchCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
        />
      );
    }

    if (type === AdType.SNIPPET) {
      return (
        <SnippetCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
        />
      );
    }
  };

  const renderAdGroupNames = (adGroupNames) => {
    const visibleAdGroupNames = adGroupNames.slice(0, 3);
    const unVisibleAdGroupNamesCount = adGroupNames.length - 3;
    const showUnVisibleAdGroupNamesCount = unVisibleAdGroupNamesCount > 0;
    return (
      <>
        {visibleAdGroupNames.map((name, index) => {
          return <AdGroupName key={index}>{name}</AdGroupName>;
        })}
        {showUnVisibleAdGroupNamesCount && (
          <AdGroupNamesCount>{` + ${unVisibleAdGroupNamesCount}`}</AdGroupNamesCount>
        )}
      </>
    );
  };

  return (
    <>
      {item.map((i, index) => {
        return <Container key={index}>{renderItem(i)}</Container>;
      })}
    </>
  );
};

const Container = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const AdGroupName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AdGroupNamesCount = styled.span`
  background-color: #ebedf3;
  border-radius: 0.5rem;
  width: fit-content;
  margin-top: 1rem;
  padding: 0.5rem 0.6rem;
  ${(props) => props.theme.text.fontType.hint};
`;
