import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  progressBarSteps: string[];
};

export const StepLayout = ({ children, progressBarSteps }: Props) => {
  return (
    <>
      <StepHeader>
        {progressBarSteps.map((label, index) => {
          return <StepContainer key={index}>{label}</StepContainer>;
        })}
      </StepHeader>
      <Children>{children}</Children>
      <StepFooter>StepFooter</StepFooter>
    </>
  );
};

const Children = styled.div``;

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  margin: 4rem 0;
`;

const StepFooter = styled.div`
  position: absolute;
  bottom: 0;
  margin: 4rem 0 7rem 0;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1.1rem 2rem;
  border-radius: 1.2rem;
  color: ${(props) => props.theme.colors.grey1};
  border: 0.1rem solid ${(props) => props.theme.colors.lightBlue1};
  background-color: ${(props) => props.theme.colors.lightBlue2};
  ${(props) => props.theme.text.fontType.body2};
`;
