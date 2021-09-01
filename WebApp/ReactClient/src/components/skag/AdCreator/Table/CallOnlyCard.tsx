import styled from 'styled-components';
import { TABLE_AD_TYPES } from 'src/utils/consts';
import { CallOnlyAdType } from 'src/utils/types';
import CallIcon from 'src/images/general/call-icon.svg';

type Props = {
  item: CallOnlyAdType;
  adGroupNames: string[];
  renderAdGroupNames: (adGroupNames: string[]) => void;
  showEditFormModal: (data: any) => void;
};

export const CallOnlyCard = ({
  item,
  adGroupNames,
  renderAdGroupNames,
  showEditFormModal,
}: Props) => {
  return (
    <>
      <AdPreviewContainer onClick={() => showEditFormModal(item)}>
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

const AdPreviewContainer = styled.div`
  display: flex;
  width: 55%;
  cursor: pointer;
  height: fit-content;
  flex-direction: column;
  padding: 1.7rem;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
`;

const TitleContainer = styled.span`
  display: flex;
  align-items: center;
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

const AdIcon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.8rem;
`;
