import { AdType } from 'src/utils/types';
import { defaultData as defaultDataExpText } from '../form/ExpandedTextForm/data';
import { defaultData as defaultDataCallOnly } from '../form/CallOnlyForm/data';

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

export const getDataForForm = (type: AdType) => {
  if (type === AdType.EXPANDED) {
    return expTextForm;
  } else if (type === AdType.CALL) {
    return callOnlyForm;
  }
}

