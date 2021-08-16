import styled from 'styled-components';
import { AdType, AdGroupType } from 'src/utils/types';
import { TABLE_AD_TYPES } from 'src/utils/consts';
import { calculateAdGroupNamesByType } from 'src/utils/builder';
import CallIcon from 'src/images/general/call-icon.svg';
import ResponsiveIcon from 'src/images/general/responsive-icon.svg';

type Props = {
  item: any;
  adGroupList: AdGroupType[];
};

export const SkagAdCreatorTableItem = ({ item, adGroupList }: Props) => {
  const renderItem = (item) => {
    const { type } = item;
    const adGroupNames = calculateAdGroupNamesByType(type, adGroupList);
    if (type === AdType.EXPANDED) {
      return renderExpTextAd(item, adGroupNames);
    }

    if (type === AdType.CALL) {
      return renderCallOnlyAd(item, adGroupNames);
    }

    if (type === AdType.RESPONSIVE) {
      return renderResponsiveSearchAd(item, adGroupNames);
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

  const renderExpTextAd = (item, adGroupNames) => {
    return (
      <>
        <AdPreviewContainer>
          <Title>
            {`${item.headlineOne} | ${item.headlineTwo} | ${item.headlineThree}`}
          </Title>
          <Link>{item.finalUrl}</Link>
          <Description>{item.descriptionOne}</Description>
          <Description>{item.descriptionTwo}</Description>
        </AdPreviewContainer>
        <RightBlock>
          <TypeContainer>{TABLE_AD_TYPES[item.type]}</TypeContainer>
          <AdGroupsContainer>
            {renderAdGroupNames(adGroupNames)}
          </AdGroupsContainer>
        </RightBlock>
      </>
    );
  };

  const renderCallOnlyAd = (item, adGroupNames) => {
    return (
      <>
        <AdPreviewContainer>
          <TitleContainer>
            <AdIcon src={CallIcon} />
            <Title>
              {`${item.headlineOne} | ${item.headlineTwo} ${item.phoneNumber}`}
            </Title>
          </TitleContainer>
          <Link>{item.finalUrl}</Link>
          <Description>{item.descriptionOne}</Description>
          <Description>{item.descriptionTwo}</Description>
        </AdPreviewContainer>
        <RightBlock>
          <TypeContainer>{TABLE_AD_TYPES[item.type]}</TypeContainer>
          <AdGroupsContainer>
            {renderAdGroupNames(adGroupNames)}
          </AdGroupsContainer>
        </RightBlock>
      </>
    );
  };

  const renderResponsiveSearchAd = (item, adGroupNames) => {
    return (
      <>
        <AdPreviewContainer>
          <TitleContainer>
            <AdIcon src={ResponsiveIcon} />
            <Title>
              {`${item.headlineOne} | ${item.headlineTwo} ${item.headlineThree}`}
            </Title>
          </TitleContainer>
          <Link>{item.finalUrl}</Link>
          <Description>{item.descriptionOne}</Description>
          <Description>{item.descriptionTwo}</Description>
        </AdPreviewContainer>
        <RightBlock>
          <TypeContainer>{TABLE_AD_TYPES[item.type]}</TypeContainer>
          <AdGroupsContainer>
            {renderAdGroupNames(adGroupNames)}
          </AdGroupsContainer>
        </RightBlock>
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

const AdPreviewContainer = styled.div`
  display: flex;
  width: 55%;
  height: fit-content;
  flex-direction: column;
  padding: 1.7rem;
  box-sizing: border-box;
  border-radius: 1rem;
  max-width: 60rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.blue1};
  ${(props) => props.theme.text.fontType.body3};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Link = styled.span`
  padding: 0.2rem 0;
  color: ${(props) => props.theme.colors.link};
  ${(props) => props.theme.text.fontType.link};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.span`
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.link};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TypeContainer = styled.span`
  display: flex;
  align-items: center;
  width: 50%;
  max-width: 30rem;
  font-weight: 500;
`;

const AdGroupsContainer = styled.span`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  max-width: 30rem;
  font-weight: 300;
`;

const RightBlock = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  padding-left: 3rem;
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

const AdIcon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.8rem;
`;
