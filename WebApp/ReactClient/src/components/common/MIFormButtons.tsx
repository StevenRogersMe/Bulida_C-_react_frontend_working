import styled, { css } from 'styled-components';
import PrevIcon from 'src/images/general/prev-icon.svg';
import NextIcon from 'src/images/general/next-icon.svg';

type Props = {
  closeModal: () => void;
  saveHandler: () => void;
};

const MIFormButtons = ({ closeModal, saveHandler }: Props) => {
  const save = (event) => {
    event.preventDefault();
    saveHandler && saveHandler();
  };

  const close = (event) => {
    event.preventDefault();
    closeModal && closeModal();
  };

  return (
    <Buttons>
      <BackButton onClick={close}>
        BACK
        <BackIconContainer>
          <BackIcon src={PrevIcon} />
        </BackIconContainer>
      </BackButton>
      <SaveButton onClick={save}>
        SAVE
        <SaveIconContainer>
          <SaveIcon src={NextIcon} />
        </SaveIconContainer>
      </SaveButton>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: space-between;
  width: 100%;
  margin: 2rem 0;
`;

const StepButtonStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 1rem 1rem 1rem 4rem;
  ${(props) => props.theme.text.fontType.h5};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;

const BackButton = styled.button`
  margin-right: 22rem;
  color: ${(props) => props.theme.colors.blue2};
  background-color: ${(props) => props.theme.colors.white};
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  ${StepButtonStyles}
`;

const BackIconContainer = styled.div`
  display: flex;
  padding: 1.2rem 3.2rem;
  margin-left: 3rem;
  box-sizing: border-box;
  border-radius: 4rem;
  border: 0.2rem solid ${(props) => props.theme.colors.stroke};
`;

const BackIcon = styled.img`
  width: 1rem;
  height: 2rem;
`;

const SaveButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.isDisabled ? props.theme.colors.stroke : props.theme.colors.blue2};
  border: none;
  ${StepButtonStyles}
  cursor: ${(props) => props.isDisabled && 'default'};

  &:hover {
    box-shadow: ${(props) => props.isDisabled && 'none'};
  }
`;

const SaveIconContainer = styled.div`
  display: flex;
  padding: 1.2rem 2.6rem;
  margin-left: 3rem;
  box-sizing: border-box;
  border-radius: 4rem;
  border: 0.2rem solid ${(props) => props.theme.colors.white};
`;

const SaveIcon = styled.img`
  width: 2.2rem;
  height: 2rem;
`;

export default MIFormButtons;
