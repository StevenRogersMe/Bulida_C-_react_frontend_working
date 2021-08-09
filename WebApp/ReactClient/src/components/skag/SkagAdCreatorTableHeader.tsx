import styled from 'styled-components';
import { AdType, Expandable } from 'src/utils/types';
import { AD_TYPES_OPTIONS } from 'src/utils/consts';
import { MIDropDown } from 'src/components/common/MIDropDown';

type Props = {
  selectedAdType: AdType;
  onSelectAdType: (change: Expandable<{ value: string }>) => void;
};

export const SkagAdCreatorTableHeader = ({
  selectedAdType,
  onSelectAdType,
}: Props) => {
  return (
    <TableHeader>
      <ItemContainer>
        <ItemHeader>
          <Text>Ad types</Text>
          <Text>
            Total <Bold>COUNT</Bold>
          </Text>
        </ItemHeader>
        <MIDropDown
          label='Choose the type'
          value={selectedAdType}
          options={AD_TYPES_OPTIONS}
          onChange={onSelectAdType}
        />
      </ItemContainer>
      {/* <ItemContainer></ItemContainer> */}
    </TableHeader>
  );
};

const TableHeader = styled.div`
  margin-bottom: 3rem;
  display: flex;
  color: ${(props) => props.theme.colors.grey2};
  ${(props) => props.theme.text.fontType.body1};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
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
