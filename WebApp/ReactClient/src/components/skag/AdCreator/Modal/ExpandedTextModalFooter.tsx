import { ExpandedTextForm } from '../form/ExpandedTextForm';
import { defaultData } from '../form/ExpandedTextForm/data';
import { ExpTextAdExtType } from 'src/utils/types';

type Props = {
  values?: ExpTextAdExtType;
  closeModal?: any;
};

export const ExpandedTextModalFooter = ({
  values = defaultData,
  closeModal,
}: Props) => {
  return <ExpandedTextForm initialValues={values} closeModal={closeModal} />;
};
