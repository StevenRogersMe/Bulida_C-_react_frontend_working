import styled from 'styled-components';
import { AdType } from 'src/utils/types';
import { notifySuccess } from 'src/services/notifications/notificationService';
import {
  searchExtData,
  callOnlyExtData,
  callOutExtData,
  snippetExtData,
} from 'src/utils/mockedData';
type Props = {
  createAds: (type: AdType, data: any) => void;
};

export const AdCreatorModalFooter = ({ createAds }: Props) => {
  const onCreateAds = (type: AdType, data: any) => {
    createAds(type, data);
    if (type !== AdType.EXPANDED && type !== AdType.CALL) {
      notifySuccess({ msg: 'Ad was successfully created' });
    }
  };
  return (
    <Wrapper>
      <ItemContainer>
        <Item onClick={() => onCreateAds(AdType.EXPANDED, {})}>
          Add exp. text ad
        </Item>
        <Item onClick={() => onCreateAds(AdType.RESPONSIVE, searchExtData)}>
          Add resp.search ad
        </Item>
        <Item onClick={() => onCreateAds(AdType.CALL, callOnlyExtData)}>
          Add call only ad
        </Item>
      </ItemContainer>
      <ItemContainer>
        <Item onClick={() => onCreateAds(AdType.CALLOUT, callOutExtData)}>
          Add callout extention
        </Item>
        <Item onClick={() => onCreateAds(AdType.SNIPPET, snippetExtData)}>
          Add snippet extention
        </Item>
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

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;
