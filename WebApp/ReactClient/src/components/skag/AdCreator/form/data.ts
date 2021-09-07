import { AdType } from 'src/utils/types';
import { defaultDataSnippetExt } from 'src/components/skag/AdCreator/form/SnippetExtForm/data';
import { defaultDataExpText } from 'src/components/skag/AdCreator/form/ExpandedTextForm/data';
import { defaultDataCallOnly } from 'src/components/skag/AdCreator/form/CallOnlyForm/data';
import { defaultDataRespResearch } from 'src/components/skag/AdCreator/form/ResponsiveResearchForm/data';
import { defaultDataCallOutExt } from 'src/components/skag/AdCreator/form/CallOutForm/data';

const expTextForm = {
  id: 'expandedTextFormModal',
  title1: 'Edit Expanded',
  boldTitle: 'Text Ad',
  type: AdType.EXPANDED,
  defaultData: defaultDataExpText,
};

const callOnlyForm = {
  id: 'callOnlyFormModal',
  title1: 'Edit',
  boldTitle: 'Call Only Ad',
  type: AdType.CALL,
  defaultData: defaultDataCallOnly,
};

const snippetExpForm = {
  id: 'snippetExtFormModal',
  title1: 'Edit',
  boldTitle: 'Snippet Extension',
  type: AdType.SNIPPET,
  defaultData: defaultDataSnippetExt,
};

const respResearchForm = {
  id: 'respResearchFormModal',
  title1: 'Edit Responsive',
  boldTitle: 'Research Ad',
  type: AdType.RESPONSIVE,
  defaultData: defaultDataRespResearch,
};

const callOutForm = {
  id: 'callOutFormModal',
  title1: 'Edit',
  boldTitle: 'Callout Extension',
  type: AdType.CALLOUT,
  defaultData: defaultDataCallOutExt,
};

export const getDataForForm = (type: AdType) => {
  if (type === AdType.EXPANDED) {
    return expTextForm;
  } else if (type === AdType.CALL) {
    return callOnlyForm;
  } else if (type === AdType.SNIPPET) {
    return snippetExpForm;
  } else if (type === AdType.RESPONSIVE) {
    return respResearchForm;
  } else if (type === AdType.CALLOUT) {
    return callOutForm;
  }
};
