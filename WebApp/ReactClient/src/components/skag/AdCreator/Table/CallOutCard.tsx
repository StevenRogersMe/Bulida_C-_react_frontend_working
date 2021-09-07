import styled from 'styled-components';
import { TABLE_AD_TYPES } from 'src/utils/consts';
import { CallOutAdType } from 'src/utils/types';

type Props = {
  item: CallOutAdType;
  adGroupNames: string[];
  renderAdGroupNames: (adGroupNames: string[]) => void;
  showEditFormModal: (data: any) => void;
};

export const CallOutCard = ({
  item,
  adGroupNames,
  renderAdGroupNames,
  showEditFormModal,
}: Props) => {
  return (
    <>
      <AdPreviewContainer onClick={() => showEditFormModal(item)}>
        <Title>{`${item.callOutTextOne}, ${item.callOutTextTwo}, ${item.callOutTextThree}`}</Title>
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
  border-radius: 0 0 1rem 1rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
  border-top: 0.1rem dashed ${(props) => props.theme.colors.grey5};
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.grey1};
  ${(props) => props.theme.text.fontType.body1};
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
