import { useState } from 'react';
import { CampaignType } from 'src/utils/types';

export const useSkagCampaignBuilder = (): {
  skagCampaign: CampaignType;
  setSkagCampaign: (campaign: CampaignType) => void;
  setSkagKeywords: (keywords: string[]) => void;
} => {
  const [skagCampaign, setSkagCampaign] = useState<CampaignType>({
    name: '',
    budget: 0,
    exact: false,
    phrase: false,
    modifier: false,
    broad: false,
    negativePhrase: false,
    skag: true,
    stag: false,
    adGroupList: [],
    googleAccountId: undefined,
  });

  const setSkagKeywords = (keywords: string[]) => {
    setSkagCampaign({
      ...skagCampaign,
      adGroupList: [
        {
          adGroup: '',
          keywords,
          negatives: [],
          snippetExt: [],
          searchExt: [],
          callOnlyExt: [],
          callOutExt: [],
          expTextAdExt: [],
        },
      ],
    });
  };

  return {
    skagCampaign,
    setSkagCampaign,
    setSkagKeywords,
  };
};
