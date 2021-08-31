import { ExpandedTextForm } from '../form/ExpandedTextForm';
import { defaultData } from '../form/ExpandedTextForm/data';
import { ExpandedTextForm as ExpandedTextFormType } from '../form/ExpandedTextForm/types';

type Props = {
  values?: ExpandedTextFormType;
  closeModal?: any;
};

export const ExpandedTextModalFooter = ({ values = defaultData, closeModal }: Props) => {
  return <ExpandedTextForm initialValues={values} closeModal={closeModal} />
};
