import { useState, useEffect } from 'react';
import { AdBuilderType } from 'src/utils/types';
import { PROGRESS_BAR_STEPS } from 'src/utils/consts';

export const useBuilderSelection = (): {
  currentStep: number;
  progressBarSteps: string[];
  selectedBuilderType: AdBuilderType;
  setCurrentStep: (step: number) => void;
  finishBuilderFlow: () => void;
  setSelectedBuilderType: (type: AdBuilderType) => void;
} => {
  const [selectedBuilderType, setSelectedBuilderType] = useState<AdBuilderType>(
    AdBuilderType.EMPTY
  );

  const [progressBarSteps, setProgressBarSteps] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (selectedBuilderType !== AdBuilderType.EMPTY) {
      setProgressBarSteps(PROGRESS_BAR_STEPS[selectedBuilderType]);
    }
  }, [selectedBuilderType]);

  const finishBuilderFlow = () => {
    setCurrentStep(0);
    setProgressBarSteps([]);
    setSelectedBuilderType(AdBuilderType.EMPTY);
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
