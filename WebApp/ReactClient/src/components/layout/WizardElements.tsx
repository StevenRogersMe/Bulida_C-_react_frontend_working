import styled from 'styled-components';

const WizardOptionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 2rem 0;
  max-width: 45rem;
  align-self: center;
`;

const WizardOptionLine = styled.div`
  height: 0.1rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.grey5};
  flex-grow: 1;
`;

const WizardOptionText = styled.div`
  flex-grow: none;
  margin: -0.3rem 1.7rem 0 1.7rem;
  color: ${(props) => props.theme.colors.grey1};
  ${(props) => props.theme.text.fontType.body5};
`;

export const WizardOrLine = () => (
  <WizardOptionContainer>
    <WizardOptionLine />
    <WizardOptionText>or</WizardOptionText>
    <WizardOptionLine />
  </WizardOptionContainer>
);
