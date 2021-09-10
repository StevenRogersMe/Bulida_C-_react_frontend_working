import { AdType, AdGroupType } from 'src/utils/types';
import { DEFAULT_PAGE_SIZE } from 'src/utils/consts';

export const countSelectedAdAds = (
  selectedAd: AdGroupType,
  selectedAdType: AdType
) => {
  const { callOnlyExt, callOutExt, expTextAdExt, searchExt, snippetExt } =
    selectedAd;
  let count: number = 0;

  if (selectedAdType === AdType.ALL) {
    count =
      callOnlyExt.length +
      callOutExt.length +
      expTextAdExt.length +
      searchExt.length +
      snippetExt.length;
  }

  if (selectedAdType === AdType.CALL) {
    count = callOnlyExt.length;
  }

  if (selectedAdType === AdType.CALLOUT) {
    count = callOutExt.length;
  }

  if (selectedAdType === AdType.EXPANDED) {
    count = expTextAdExt.length;
  }

  if (selectedAdType === AdType.RESPONSIVE) {
    count = searchExt.length;
  }

  if (selectedAdType === AdType.SNIPPET) {
    count = snippetExt.length;
  }

  return count;
};

export const getGroupedItems = (
  selectedAd: AdGroupType,
  selectedAdType: AdType,
  adsCount: number,
  pageIndex: number
) => {
  const items: any = [];

  if (selectedAdType === AdType.ALL) {
    items.push(selectedAd?.expTextAdExt);
    items.push(selectedAd?.callOnlyExt);
    items.push(selectedAd?.searchExt);
    items.push(selectedAd?.snippetExt);
    items.push(selectedAd?.callOutExt);
  }

  if (selectedAdType === AdType.CALL) {
    items.push(selectedAd?.callOnlyExt);
  }

  if (selectedAdType === AdType.CALLOUT) {
    items.push(selectedAd?.callOutExt);
  }

  if (selectedAdType === AdType.EXPANDED) {
    items.push(selectedAd?.expTextAdExt);
  }

  if (selectedAdType === AdType.RESPONSIVE) {
    items.push(selectedAd?.searchExt);
  }

  if (selectedAdType === AdType.SNIPPET) {
    items.push(selectedAd?.snippetExt);
  }

  const groupedItems =
    adsCount > DEFAULT_PAGE_SIZE
      ? items
          .flat()
          .slice(
            (pageIndex - 1) * DEFAULT_PAGE_SIZE,
            pageIndex * DEFAULT_PAGE_SIZE
          )
      : items.flat();

  return groupedItems;
};
