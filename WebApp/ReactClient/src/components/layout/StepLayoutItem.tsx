import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CurrentIcon from 'src/images/general/current-step-icon.svg';

type Props = {
  label: string;
  isCurrent: boolean;
  isZeroStep: boolean;
  isLastStep: boolean;
};

export const StepLayoutItem = ({
  label,
  isCurrent,
  isZeroStep,
  isLastStep,
}: Props) => {
  const [isPrevStep, setIsPrevStep] = useState<boolean>(false);

  useEffect(() => {
    isCurrent && setIsPrevStep(true);
  }, [isCurrent]);

  if (isZeroStep) {
    return <Step>{label}</Step>;
  }

  if (isCurrent && !isLastStep) {
    return (
      <CurrentStep>
        <CurrentStepIcon src={CurrentIcon} />
        {label}
      </CurrentStep>
    );
  }

  if (isLastStep) {
    return (
      <LastStepContainer>
        <LastStepSeparator />
        <LastStep>{label}</LastStep>
      </LastStepContainer>
    );
  }

  if (isPrevStep && !isCurrent) {
    return (
      <Step>
        <CurrentStepIcon src={CurrentIcon} />
        {label}
      </Step>
    );
  }

  return (
    <EmptyStep>
      <CurrentStepIcon src={CurrentIcon} isHidden />
      {label}
    </EmptyStep>
  );
};

const StepStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  margin-right: 0.5rem;
  padding: 1.1rem 2rem;
  border-radius: 1.2rem;
`;

const Step = styled.div`
  color: ${(props) => props.theme.colors.grey1};
  background-color: ${(props) => props.theme.colors.grey3};
  ${(props) => props.theme.text.fontType.body2};
  ${StepStyles};
`;

const CurrentStep = styled.div`
  color: ${(props) => props.theme.colors.blue2};
  background-color: rgba(232, 249, 255, 0.6);
  ${(props) => props.theme.text.fontType.body2};
  ${StepStyles};
`;

const CurrentStepIcon = styled.img<{ isHidden?: boolean }>`
  visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
  margin-right: 1rem;
`;

const LastStep = styled.div`
  color: ${(props) => props.theme.colors.stroke};
  border: 0.2rem dashed ${(props) => props.theme.colors.stroke};
  ${(props) => props.theme.text.fontType.body2};
  ${StepStyles};
  margin-right: 0;
`;

const LastStepContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const LastStepSeparator = styled.div`
  width: 100%;
  height: 0.1rem;
  margin: 0 2rem;
  background-color: ${(props) => props.theme.colors.stroke};
`;

const EmptyStep = styled.div`
  color: ${(props) => props.theme.colors.pureWhite};
  border: 0.2rem dashed ${(props) => props.theme.colors.stroke};
  ${StepStyles};
  padding: 1.1rem 1.8rem;
  ${(props) => props.theme.text.fontType.body2};
`;
