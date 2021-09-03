import styled from 'styled-components';
import { SnippetExtensionType } from 'src/utils/types';

type Props = {
  item: SnippetExtensionType;
  headerTypeLabel?: string;
};

export const SnippetCardPreview = ({ item, headerTypeLabel }: Props) => {
  return (
    <AdPreviewContainer>
      <Title>{`${headerTypeLabel}: ${item.snippetValueOne}, ${item.snippetValueTwo}, ${item.snippetValueThree}`}</Title>
    </AdPreviewContainer>
  );
};

const AdPreviewContainer = styled.div`
  display: flex;
  width: 55%;
  max-width: 55rem;
  height: fit-content;
  flex-direction: column;
  padding: 1.7rem;
  box-sizing: border-box;
  border-radius: 0 0 1rem 1rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
  border-top: 0.1rem dashed ${(props) => props.theme.colors.grey5};
  background-color: ${(props) => props.theme.colors.lightBlue2};
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.grey1};
  ${(props) => props.theme.text.fontType.body1};
  overflow: hidden;
  text-overflow: ellipsis;
`;
