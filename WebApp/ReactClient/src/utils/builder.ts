import StagIcon from 'src/images/general/stag-icon.svg';
import { AD_BUILDER_TYPE } from 'src/utils/consts';

export const calculateBuilderItemDescription = (type: AD_BUILDER_TYPE) => {
  let description;
  if (type === AD_BUILDER_TYPE.STAG) {
    return (description = {
      title: 'STAG',
      subtitle:
        'Single Keyword Ad Group - ad groups that contain just one keyword in them.',
      cta: 'BUILD',
      icon: StagIcon,
    });
  }

  return description;
};

export const calculateBuilderItemBackground = (type: AD_BUILDER_TYPE) => {
  let background;
  if (type === AD_BUILDER_TYPE.STAG) {
    return (background = '#F7F5FF');
  }

  return background;
};
