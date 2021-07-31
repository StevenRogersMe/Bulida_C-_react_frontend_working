import { useState, useEffect } from 'react';
import { AD_BUILDER_TYPE, STAG_PROGRESS_BAR_STEPS } from 'src/utils/consts';

export const useBuilderSelection = (): {
  currentStep: number;
  progressBarSteps: string[];
  selectedBuilderType: AD_BUILDER_TYPE;
  setCurrentStep: (step: number) => void;
  finishBuilderFlow: () => void;
  setSelectedBuilderType: (type: AD_BUILDER_TYPE) => void;
} => {
  const [selectedBuilderType, setSelectedBuilderType] =
    useState<AD_BUILDER_TYPE>(AD_BUILDER_TYPE.EMPTY);

  const [progressBarSteps, setProgressBarSteps] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (selectedBuilderType === AD_BUILDER_TYPE.STAG) {
      setProgressBarSteps(STAG_PROGRESS_BAR_STEPS);
    }
  }, [selectedBuilderType]);

  const finishBuilderFlow = () => {
    setCurrentStep(0);
    setProgressBarSteps([]);
    setSelectedBuilderType(AD_BUILDER_TYPE.EMPTY);
  };

  return {
    currentStep,
    progressBarSteps,
    selectedBuilderType,
    setCurrentStep,
    finishBuilderFlow,
    setSelectedBuilderType,
  };
};
