import { useState } from 'react';
import { CampaignType, AdGroupType } from 'src/utils/types';

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
    keywordsList: [],
    googleAccountId: undefined,
  });

  const setSkagKeywords = (keywords: string[]) => {
    const adGroupList: AdGroupType[] = [];

    keywords.forEach((keyword) => {
      adGroupList.push({
        adGroup: keyword,
        keywords: [keyword],
        negatives: [],
        snippetExt: [],
        searchExt: [],
        callOnlyExt: [],
        callOutExt: [],
        expTextAdExt: [],
      });
    });

    setSkagCampaign({
      ...skagCampaign,
      keywordsList: keywords,
      adGroupList: adGroupList || [],
    });
  };

  return {
    skagCampaign,
    setSkagCampaign,
    setSkagKeywords,
  };
};
