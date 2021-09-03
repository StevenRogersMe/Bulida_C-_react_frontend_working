import {
  AdType,
  CallOnlyAdType,
  ExpTextAdExtType,
  SnippetExtensionType,
} from 'src/utils/types';
import { CallOnlyForm } from '../form/CallOnlyForm';
import { ExpandedTextForm } from '../form/ExpandedTextForm';
import { SnippetExtForm } from '../form/SnippetExtForm';

type Props = {
  values?: CallOnlyAdType | ExpTextAdExtType | SnippetExtensionType;
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
  }
  return (
    <ExpandedTextForm
      initialValues={values || defaultData}
      closeModal={closeModal}
    />
  );
};
