import styled from 'styled-components';
import { AdType } from 'src/utils/types';
import { notifySuccess } from 'src/services/notifications/notificationService';

type Props = {
  createAds: (type: AdType) => void;
};

export const AdCreatorModalFooter = ({ createAds }: Props) => {
  const onCreateAds = (type: AdType) => {
    createAds(type);
    notifySuccess({ msg: 'Ad was successfully created' });
  };
  return (
    <Wrapper>
      <ItemContainer>
        <Item onClick={() => onCreateAds(AdType.EXPANDED)}>
          Add exp. text ad
        </Item>
        <Item onClick={() => onCreateAds(AdType.RESPONSIVE)}>
          Add resp.search ad
        </Item>
        <Item onClick={() => onCreateAds(AdType.CALL)}>Add call only ad</Item>
      </ItemContainer>
      <ItemContainer>
        <Item>Add callout extention</Item>
        <Item>Add snippet extention</Item>
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
