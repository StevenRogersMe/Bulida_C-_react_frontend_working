import { ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseIcon from 'src/images/general/close-icon.svg';

type Props = {
  titleComponent?: ReactNode;
  contentComponent?: ReactNode;
  footerComponent?: ReactNode;
  dismiss: (event: React.MouseEvent) => void;
};

export const MIModalMessage = ({
  titleComponent,
  contentComponent,
  footerComponent,
  dismiss,
}: Props) => {
  return ReactDOM.createPortal(
    <ModalWrapper>
      <Backdrop onClick={dismiss} />
      <ModalContainer>
        <ModalContentContainer>
          {dismiss && (
            <CloseButtonWrapper onClick={dismiss}>
              <CloseModalIcon src={CloseIcon} />
            </CloseButtonWrapper>
          )}
          {titleComponent && <TitleContainer>{titleComponent}</TitleContainer>}
          {contentComponent && (
            <ContentContainer>{contentComponent}</ContentContainer>
          )}
          {footerComponent && (
            <FooterContainer>{footerComponent}</FooterContainer>
          )}
        </ModalContentContainer>
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector('body')
  );
};

const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.translucent1};
`;

const ModalContainer = styled.div`
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  z-index: 1;
  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.white};
`;

const ModalContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
`;

export const CloseButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 1.8rem;
  right: 1.8rem;
`;

const TitleContainer = styled.div``;

const ContentContainer = styled.div``;

export const FooterContainer = styled.div``;

const CloseModalIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
