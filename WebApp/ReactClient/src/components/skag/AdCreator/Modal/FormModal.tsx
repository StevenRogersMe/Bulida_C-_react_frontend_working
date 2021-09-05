import {
  AdType,
  CallOnlyAdType,
  ExpTextAdExtType,
  SnippetExtensionType,
  RespSearchAdType,
} from 'src/utils/types';
import { CallOnlyForm } from '../form/CallOnlyForm';
import { ExpandedTextForm } from '../form/ExpandedTextForm';
import { SnippetExtForm } from '../form/SnippetExtForm';
import { RespResearchForm } from '../form/ResponsiveResearchForm';

type Props = {
  values?:
    | CallOnlyAdType
    | ExpTextAdExtType
    | SnippetExtensionType
    | RespSearchAdType;
  closeModal?: any;
  currentAdType: AdType;
  defaultData: any;
};

export const FormModal = ({
  values,
  currentAdType,
  defaultData,
  closeModal,
}: Props) => {
  if (currentAdType === AdType.EXPANDED) {
    return (
      <ExpandedTextForm
        initialValues={values || defaultData}
        closeModal={closeModal}
      />
    );
  } else if (currentAdType === AdType.CALL) {
    return (
      <CallOnlyForm
        initialValues={values || defaultData}
        closeModal={closeModal}
      />
    );
  } else if (currentAdType === AdType.SNIPPET) {
    return (
      <SnippetExtForm
        initialValues={values || defaultData}
        closeModal={closeModal}
      />
    );
  } else if (currentAdType === AdType.RESPONSIVE) {
    return (
      <RespResearchForm
        initialValues={values || defaultData}
        closeModal={closeModal}
      />
    );
  }
  return (
    <ExpandedTextForm
      initialValues={values || defaultData}
      closeModal={closeModal}
    />
  );
};
