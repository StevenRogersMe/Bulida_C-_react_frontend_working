import styled from 'styled-components';
import { AdType, Expandable, AdGroupType } from 'src/utils/types';
import { AD_TYPES_OPTIONS } from 'src/utils/consts';
import { MIDropDown } from 'src/components/common/MIDropDown';

type Props = {
  adsCount: number;
  adGroupList: AdGroupType[];
  selectedAdType: AdType;
  selectedAdGroup: string;
  onSelectAdType: (change: Expandable<{ value: string }>) => void;
  onSelectAdGroup: (change: Expandable<{ value: string }>) => void;
};

export const SkagAdCreatorTableHeader = ({
  adsCount,
  adGroupList,
  selectedAdType,
  selectedAdGroup,
  onSelectAdType,
  onSelectAdGroup,
}: Props) => {
  const adGroupOptions = adGroupList
    .map((el) => el.adGroup)
    .map((el) => ({ label: el, value: el }));

  return (
    <TableHeader>
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
    </TableHeader>
  );
};

const TableHeader = styled.div`
  width: 65%;
  margin-bottom: 3rem;
  display: flex;
  color: ${(props) => props.theme.colors.grey2};
  ${(props) => props.theme.text.fontType.body1};
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

const Bold = styled.span`
  font-weight: bold;
`;
