import { AdType } from 'src/utils/types';
import styled from 'styled-components';

type Props = {
  item: any;
};

export const SkagAdCreatorTableItem = ({ item }: Props) => {
  const renderItem = (item) => {
    const { type } = item;
    if (type === AdType.EXPANDED) {
      return renderExpTextAd(item);
    }
  };

  const calculateAdType = (item) => {
    const { type } = item;
    if (type === AdType.EXPANDED) {
      return 'Expanded text ad';
    }

    if (type === AdType.CALL) {
      return 'Call only ad';
    }

    if (type === AdType.RESPONSIVE) {
      return 'Responsive research ad';
    }

    if (type === AdType.SNIPPET) {
      return 'Snippet extention';
    }

    if (type === AdType.CALLOUT) {
      return 'Callout extention';
    }
  };

  const renderExpTextAd = (item) => {
    return (
      <>
        <AdPreviewContainer>
          <Title>
            {`${item.headlineOne} | ${item.headlineTwo} | ${item.headlineThree}`}
          </Title>
          <Link>{item.finalURL}</Link>
          <Description>{item.descriptionOne}</Description>
          <Description>{item.descriptionTwo}</Description>
        </AdPreviewContainer>
        <RightBlock>
          <TypeContainer>{calculateAdType(item)}</TypeContainer>
          <AdGroupsContainer>TEST</AdGroupsContainer>
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
  margin-bottom: 2rem;
`;

const AdPreviewContainer = styled.div`
  display: flex;
  width: 55%;
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
  align-items: center;
  justify-content: center;
  width: 50%;
  max-width: 30rem;
  font-weight: 500;
`;

const RightBlock = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  padding-left: 3rem;
`;
