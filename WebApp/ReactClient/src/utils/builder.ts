import SkagIcon from 'src/images/general/skag-icon.png';
import StagIcon from 'src/images/general/stag-icon.svg';
import AdIcon from 'src/images/general/ad-icon.svg';
import { AdBuilderType } from './types';

export const calculateBuilderItemDescription = (type: AdBuilderType) => {
  let description;
  if (type === AdBuilderType.SKAG) {
    return (description = {
      title: 'SKAG',
      subtitle:
        'Single Theme Ad Group — ad groups can contain 1000 keywords in them.',
      cta: 'BUILD',
      icon: SkagIcon,
    });
  }

  if (type === AdBuilderType.STAG) {
    return (description = {
      title: 'STAG',
      subtitle:
        'Single Keyword Ad Group - ad groups that contain just one keyword in them.',
      cta: 'BUILD',
      icon: StagIcon,
    });
  }

  if (type === AdBuilderType.AD) {
    return (description = {
      title: 'Ad & extention',
      subtitle: 'Very interesting description about this menu item*',
      cta: 'BUILD',
      icon: AdIcon,
    });
  }

  return description;
};

export const calculateBuilderItemBackground = (type: AdBuilderType) => {
  let background;
  if (type === AdBuilderType.SKAG) {
    return (background = '#EDFCFE');
  }

  if (type === AdBuilderType.STAG) {
    return (background = '#F7F5FF');
  }

  if (type === AdBuilderType.AD) {
    return (background = '#FEF2EF');
  }

  return background;
};
