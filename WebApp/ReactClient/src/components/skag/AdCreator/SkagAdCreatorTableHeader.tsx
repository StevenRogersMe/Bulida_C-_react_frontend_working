import styled from 'styled-components';
import { AdType, Expandable, AdGroupType } from 'src/utils/types';
import { AD_TYPES_OPTIONS } from 'src/utils/consts';
import { MIDropDown } from 'src/components/common/MIDropDown';
import { useModal } from 'src/helpers/react/useModal';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { AdCreatorModalFooter } from './Modal/AdCreatorModalFooter';
import PlusIcon from 'src/images/general/plus-icon.svg';

type Props = {
  adsCount: number;
  adGroupList: AdGroupType[];
  selectedAdType: AdType;
  selectedAdGroup: string;
  onSelectAdType: (change: Expandable<{ value: string }>) => void;
  onSelectAdGroup: (change: Expandable<{ value: string }>) => void;
  createExpTextAdExt: () => void;
};

export const SkagAdCreatorTableHeader = ({
  adsCount,
  adGroupList,
  selectedAdType,
  selectedAdGroup,
  onSelectAdType,
  onSelectAdGroup,
  createExpTextAdExt,
}: Props) => {
  const adGroupOptions = adGroupList
    .map((el) => el.adGroup)
    .map((el) => ({ label: el, value: el }));
  const [SelectAdGroupModal, showSelectAdGroupModal] = useModal(
    MIModalMessage,
    {
      id: 'selectAdGroup',
      footerComponent: (
        <AdCreatorModalFooter createExpTextAdExt={createExpTextAdExt} />
      ),
      titleComponent: (
        <TitleContainer>
          <Title>
            Ad <Bold>Ad</Bold> Or <Bold>Extention</Bold>
          </Title>
        </TitleContainer>
      ),
    }
  );

  return (
    <TableHeader>
      {SelectAdGroupModal}
      <LeftBlock>
        <ItemContainer>
          <ItemHeader>
            <Text>Ad types</Text>
            <Text>
              Total <Bold>{adsCount}</Bold>
            </Text>
          </ItemHeader>
          <MIDropDown
            label='Choose the type'
            value={selectedAdType}
            options={AD_TYPES_OPTIONS}
            onChange={onSelectAdType}
          />
        </ItemContainer>
        <ItemContainer>
          <ItemHeader>
            <Text>Ad groups</Text>
            <Text>
              Total <Bold>{adsCount}</Bold>
            </Text>
          </ItemHeader>
          <MIDropDown
            label='Choose the type'
            value={selectedAdGroup}
            options={adGroupOptions}
            onChange={onSelectAdGroup}
          />
        </ItemContainer>
      </LeftBlock>
      <RightBlock>
        <CreateAdButton onClick={showSelectAdGroupModal}>
          Add ads or extentions <CreateAdIcon src={PlusIcon} />
        </CreateAdButton>
      </RightBlock>
    </TableHeader>
  );
};

const TableHeader = styled.div`
  width: inherit;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${(props) => props.theme.colors.grey2};
  ${(props) => props.theme.text.fontType.body1};
`;

const LeftBlock = styled.div`
  display: flex;
`;

const RightBlock = styled.div``;

const CreateAdButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  color: ${(props) => props.theme.colors.blue1};
  background-color: ${(props) => props.theme.colors.lightBlue1};
  ${(props) => props.theme.text.fontType.body3};
  font-weight: 500;

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;

const CreateAdIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1.5rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4rem;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.9rem;
`;

const Text = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Title = styled.span`
  ${(props) => props.theme.text.fontType.h5};
  font-weight: normal;
`;

const Bold = styled.span`
  font-weight: bold;
`;
