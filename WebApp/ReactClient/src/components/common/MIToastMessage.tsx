import styled from 'styled-components';
import { NOTIFICATION_VARIANT } from 'src/utils/consts';

export type Props = {
  type: NOTIFICATION_VARIANT;
  text: string;
};

export const MIToastMessage = ({ type, text }: Props) => {
  return (
    <ToastMessageContainer type={type}>
      <Content>
        <ToastMessageText>{text}</ToastMessageText>
      </Content>
    </ToastMessageContainer>
  );
};

type GetBackgroundColorProps = {
  type: NOTIFICATION_VARIANT;
  colors: Record<string, any>;
};

const getBackgroundColor = ({ type, colors }: GetBackgroundColorProps) => {
  switch (type) {
    case NOTIFICATION_VARIANT.SUCCESS:
      return colors.green;
    case NOTIFICATION_VARIANT.INFO:
      return colors.main;
    case NOTIFICATION_VARIANT.ERROR:
      return colors.red;
    default:
      return colors.main;
  }
};

const ToastMessageContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: row;
  background-color: ${(props) =>
    getBackgroundColor({
      type: props.type,
      colors: props.theme.colors,
    })};
  color: ${(props) => props.theme.colors.pureWhite};
  max-width: 45rem;
  min-width: 22rem;
  min-height: 4.8rem;
  border-radius: 0.8rem;
  font-family: ${(props) => props.theme.fontFamily};
`;

const ToastMessageText = styled.div`
  letter-spacing: 0.027rem;
  ${(props) => props.theme.text.fontType.body1};
  font-weight: 500;
`;

const Content = styled.div`
  flex-grow: 1;
  margin: 1.3rem 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
