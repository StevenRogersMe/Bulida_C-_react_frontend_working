import styled from 'styled-components';

export const SkagAdCreatorTableHeader = () => {
  return (
    <TableHeader>
      <ItemContainer>
        <ItemHeader>
          <Text>Ad types</Text>
          <Text>
            Total <Bold>COUNT</Bold>
          </Text>
        </ItemHeader>
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
`;

const Text = styled.div``;

const Bold = styled.span`
  font-weight: bold;
`;
