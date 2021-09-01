import styled from 'styled-components';
import { MITextInput } from 'src/components/common/MITextInput';
import {
  AdType,
  InputValue,
  ExpTextAdExtType,
  ExpTextAdExtTypeErrors,
} from 'src/utils/types';
import { firstRow, fullRow, secondRow, validationRule } from './data';
import { MIButton } from 'src/components/common/MIButton';
import { BUTTON_VARIANT } from 'src/utils/consts';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createAds, updateAds } from 'src/redux/skagCompaign/actions';
import { notifySuccess } from 'src/services/notifications/notificationService';
import { ExpTextCardPreview } from 'src/components/skag/AdCreator/form/ExpandedTextForm/ExpTextCardPreview';

type Props = {
  initialValues: ExpTextAdExtType;
  closeModal: any;
};

export const ExpandedTextForm = ({ initialValues, closeModal }: Props) => {
  const isNewData = initialValues?.id === undefined;
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors: ExpTextAdExtTypeErrors = {};
    if (!values.finalUrl) {
      errors.finalUrl = 'This field is required';
    } else if (!validationRule.test(values.finalUrl)) {
      errors.finalUrl = 'Wrong format';
    }
    return errors;
  };

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues,
    validate,
    onSubmit: (values) => {
      if (!Object.keys(formik.errors).length) {
        dispatch(
          isNewData
            ? createAds(AdType.EXPANDED, values)
            : updateAds(initialValues.id, values)
        );
        notifySuccess({
          msg: isNewData
            ? 'Ad was successfully created'
            : 'Ad was successfully updated',
        });
        closeModal();
      }
    },
  });

  const inputHandler = (key: string, value: string) => {
    formik.setFieldValue(key, value);
    if (formik.errors) {
      formik.setErrors({});
    }
  };

  const renderInputs = (values) => {
    return values.map((item) => (
      <MITextInput
        key={item.key}
        id={item.key}
        name={item.key}
        errorMessage={
          item.key in formik.errors ? formik.errors[item.key] : null
        }
        value={formik.values[item.key]}
        onChange={(e: InputValue) => inputHandler(item.key, e.value)}
        {...item}
      />
    ));
  };

  return (
    <Wrapper>
      <ShortItems>{renderInputs(firstRow)}</ShortItems>
      <ShortItems>{renderInputs(secondRow)}</ShortItems>
      {renderInputs(fullRow)}
      <PreviewContainer>
        <PreviewTitle>Preview</PreviewTitle>
        <ExpTextCardPreview item={formik.values} />
      </PreviewContainer>
      <Buttons>
        <MIButton
          label='BACK'
          variant={BUTTON_VARIANT.SECONDARY}
          type='button'
          onClick={closeModal}
        />
        <MIButton
          label='SAVE'
          variant={BUTTON_VARIANT.PRIMARY}
          type='button'
          onClick={formik.submitForm}
        />
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const ShortItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 100rem;
  > div:nth-child(2) {
    margin: 0 1rem 0 1rem;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2.4rem 0 4.8rem 0;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.colors.lightBlue1};
`;

const PreviewTitle = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h4};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;