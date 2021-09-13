import styled from 'styled-components';
import { AdType } from 'src/utils/types';
import {
  CallOnlyTitle,
  CallOutTitle,
  ExpandedTextTitle,
  RespResearchTitle,
  SnippetExpTitle,
} from '../form/data';

type Props = {
  createAds: (type: AdType, data: any, label: string) => void;
};

export const AdCreatorModalFooter = ({ createAds }: Props) => {
  const onCreateAds = (type: AdType, data: any, label: string) => {
    createAds(type, data, label);
  };

  return (
    <Wrapper>
      <ItemContainer>
        <Item
          onClick={() => onCreateAds(AdType.EXPANDED, {}, ExpandedTextTitle)}
        >
          {ExpandedTextTitle}
        </Item>
        <Item
          onClick={() => onCreateAds(AdType.RESPONSIVE, {}, RespResearchTitle)}
        >
          {RespResearchTitle}
        </Item>
        <Item onClick={() => onCreateAds(AdType.CALL, {}, CallOnlyTitle)}>
          {CallOnlyTitle}
        </Item>
      </ItemContainer>
      <ItemContainer>
        <Item onClick={() => onCreateAds(AdType.CALLOUT, {}, CallOutTitle)}>
          {CallOutTitle}
        </Item>
        <Item onClick={() => onCreateAds(AdType.SNIPPET, {}, SnippetExpTitle)}>
          {SnippetExpTitle}
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
