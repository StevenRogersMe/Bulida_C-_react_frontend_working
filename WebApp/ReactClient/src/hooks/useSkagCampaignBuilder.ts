import { useState } from 'react';
import { CampaignType, AdGroupType, AdType } from 'src/utils/types';

export const useSkagCampaignBuilder = (): {
  skagCampaign: CampaignType;
  setSkagCampaign: (campaign: CampaignType) => void;
  setSkagKeywords: (keywords: string[]) => void;
  createAds: (type: AdType) => void;
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

    keywords.forEach((keyword, index) => {
      adGroupList.push({
        id: index + 1,
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

  const createAds = (type: AdType) => {
    const adGroupList: AdGroupType[] = skagCampaign.adGroupList;

    if (type === AdType.EXPANDED) {
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
          finalUrl: `https://google.com/?q=_${keyword}_`,
          pathOne: 'shop',
          pathTwo: 'now',
          type: AdType.EXPANDED,
        });
      });
    }

    if (type === AdType.CALL) {
      adGroupList.forEach((adGroup) => {
        const id = adGroup.callOnlyExt.length + 1;
        const keyword = adGroup.keywords[0];
        adGroup.callOnlyExt.push({
          id: id,
          country: 'United States',
          phoneNumber: '123 456 789',
          headlineOne: keyword,
          headlineTwo: 'Call',
          descriptionOne: `Buy online ${keyword}`,
          descriptionTwo: `Vast collection of ${keyword}`,
          businessName: 'Your Business Name',
          verificationURL: '',
          finalUrl: 'https://google.com/',
          type: AdType.CALL,
        });
      });
    }

    if (type === AdType.RESPONSIVE) {
      adGroupList.forEach((adGroup) => {
        const id = adGroup.searchExt.length + 1;
        const keyword = adGroup.keywords[0];
        const adGroupName = adGroup.adGroup;
        adGroup.searchExt.push({
          id: id,
          headlineOne: keyword,
          headlineTwo: 'Online Store',
          headlineThree: 'Free Delivery',
          descriptionOne: `Buy online ${keyword}`,
          descriptionTwo: `Vast collection of ${keyword}`,
          finalUrl: `https://google.com/?q=_${keyword}_`,
          pathOne: 'shop',
          pathTwo: 'now',
          adGroupName: adGroupName,
          headLines: [],
          type: AdType.RESPONSIVE,
        });
      });
    }

    setSkagCampaign({
      ...skagCampaign,
      adGroupList: adGroupList || [],
    });
  };

  return {
    skagCampaign,
    setSkagCampaign,
    setSkagKeywords,
    createAds,
  };
};
