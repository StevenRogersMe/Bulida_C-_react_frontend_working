import { useState } from 'react';
import { CampaignType, AdGroupType } from 'src/utils/types';

export const useSkagCampaignBuilder = (): {
  skagCampaign: CampaignType;
  setSkagCampaign: (campaign: CampaignType) => void;
  setSkagKeywords: (keywords: string[]) => void;
  createExpTextAdExt: () => void;
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

  const createExpTextAdExt = () => {
    const adGroupList: AdGroupType[] = skagCampaign.adGroupList;

    adGroupList.forEach((adGroup) => {
      const id = adGroup.expTextAdExt.length + 1;
      const keyword = adGroup.keywords[0];
      adGroup.expTextAdExt.push({
        id: id,
        headlineOne: keyword,
        headlineTwo: 'Online Store',
        headlineThree: 'Free Delivery',
        descriptionOne: `Buy online ${keyword}`,
        descriptionTwo: `Vast collection of ${keyword}`,
        finalURL: `https://books.com/?q=_${keyword}_`,
        pathOne: 'shop',
        pathTwo: 'now',
      });
    });

    setSkagCampaign({
      ...skagCampaign,
      adGroupList: adGroupList || [],
    });
  };

  return {
    skagCampaign,
    setSkagCampaign,
    setSkagKeywords,
    createExpTextAdExt,
  };
};
