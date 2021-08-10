import styled from 'styled-components';

export const AdCreatorModalFooter = () => {
  return (
    <Wrapper>
      <ItemContainer>
        <Item>Add exp. text ad</Item>
        <Item>Add snippet extention</Item>
        <Item>Add call only ad</Item>
      </ItemContainer>
      <ItemContainer>
        <Item>Add callout extention</Item>
        <Item>Add resp.search ad</Item>
        <Item>Add sitelink extention</Item>
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div:nth-child(1) {
    margin: 0 0 2rem 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  > div:nth-child(2) {
    margin: 0 2rem;
  }
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: 5rem;
  border-radius: 2rem;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.body6};
  font-weight: 300;
`;
