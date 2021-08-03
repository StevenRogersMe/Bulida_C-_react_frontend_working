import SkagIcon from 'src/images/general/skag-icon.png';
import StagIcon from 'src/images/general/stag-icon.svg';
import AdIcon from 'src/images/general/ad-icon.svg';
import { AD_BUILDER_TYPE } from 'src/utils/consts';

export const calculateBuilderItemDescription = (type: AD_BUILDER_TYPE) => {
  let description;
  if (type === AD_BUILDER_TYPE.SKAG) {
    return (description = {
      title: 'SKAG',
      subtitle:
        'Single Theme Ad Group — ad groups can contain 1000 keywords in them.',
      cta: 'BUILD',
      icon: SkagIcon,
    });
  }

  if (type === AD_BUILDER_TYPE.STAG) {
    return (description = {
      title: 'STAG',
      subtitle:
        'Single Keyword Ad Group - ad groups that contain just one keyword in them.',
      cta: 'BUILD',
      icon: StagIcon,
    });
  }

  if (type === AD_BUILDER_TYPE.AD) {
    return (description = {
      title: 'Ad & extention',
      subtitle: 'Very interesting description about this menu item*',
      cta: 'BUILD',
      icon: AdIcon,
    });
  }

  return description;
};

export const calculateBuilderItemBackground = (type: AD_BUILDER_TYPE) => {
  let background;
  if (type === AD_BUILDER_TYPE.SKAG) {
    return (background = '#EDFCFE');
  }

  if (type === AD_BUILDER_TYPE.STAG) {
    return (background = '#F7F5FF');
  }

  if (type === AD_BUILDER_TYPE.AD) {
    return (background = '#FEF2EF');
  }

  return background;
};
