import { useState, useEffect } from 'react';
import { AD_BUILDER_TYPE, STAG_PROGRESS_BAR_STEPS } from 'src/utils/consts';

export const useBuilderSelection = (): {
  selectedBuilderType: AD_BUILDER_TYPE;
  progressBarSteps: string[];
  setSelectedBuilderType: (type: AD_BUILDER_TYPE) => void;
} => {
  const [selectedBuilderType, setSelectedBuilderType] =
    useState<AD_BUILDER_TYPE>(AD_BUILDER_TYPE.EMPTY);

  const [progressBarSteps, setProgressBarSteps] = useState<string[]>([]);

  useEffect(() => {
    if (selectedBuilderType === AD_BUILDER_TYPE.STAG) {
      setProgressBarSteps(STAG_PROGRESS_BAR_STEPS);
    }
  }, [selectedBuilderType]);

  return {
    selectedBuilderType,
    progressBarSteps,
    setSelectedBuilderType,
  };
};
