import styled from 'styled-components';
import { MITextInput } from 'src/components/common/MITextInput';
import {
  AdType,
  InputValue,
  CallOutAdType,
  CallOutFormErrors,
} from 'src/utils/types';
import { fullRow, optionalValues, optionalTextData } from './data';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createAds, updateAds } from 'src/redux/skagCompaign/actions';
import { notifySuccess } from 'src/services/notifications/notificationService';
import { CallOutCardPreview } from './CallOutCardPreview';
import { MIFormAddButton } from 'src/components/common/MIFormAddButton';
import MIFormButtons from 'src/components/common/MIFormButtons';

type Props = {
  initialValues: CallOutAdType;
  closeModal: any;
};

export const CallOutForm = ({ initialValues, closeModal }: Props) => {
  const isNewData = initialValues?.id === undefined;
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors: CallOutFormErrors = {};
    if (!values.callOutTextOne) {
      errors.callOutTextOne = 'This field is required';
    } else if (!values.callOutTextTwo) {
      errors.callOutTextTwo = 'This field is required';
    } else if (!values.callOutTextThree) {
      errors.callOutTextThree = 'This field is required';
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
            ? createAds(AdType.CALLOUT, values)
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

  const inputHandler = (key: string, value: string | string[]) => {
    formik.setFieldValue(key, value);
    if (formik.errors) {
      formik.setErrors({});
    }
  };

  const renderInputs = (values, key?) => {
    if (key) {
      return values.map((_, index) => (
        <MITextInput
          key={key + index}
          value={formik.values[key][index]}
          onChange={(e: InputValue) =>
            inputHandler(`${[key]}[${index}]`, e.value)
          }
          {...(key === optionalValues && optionalTextData)}
        />
      ));
    }
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

  const optionalValuesHandler = (key) => {
    if (formik.values[key].length < 15) {
      formik.setFieldValue(key, formik.values[key].concat(''));
    }
  };

  return (
    <Wrapper>
      <Container>
        <ItemsContainer>
          <AddButtonContainer>
            <MIFormAddButton
              title='add new callout'
              onClick={() => optionalValuesHandler(optionalValues)}
            />
          </AddButtonContainer>
          {renderInputs(fullRow)}
          {formik.values.optionalValues?.length
            ? renderInputs(formik.values.optionalValues, optionalValues)
            : null}
        </ItemsContainer>
        <PreviewContainer>
          <PreviewTitle>Preview</PreviewTitle>
          <CallOutCardPreview item={formik.values} />
        </PreviewContainer>
      </Container>
      <MIFormButtons closeModal={closeModal} saveHandler={formik.submitForm} />
    </Wrapper>
  );
};

const AddButtonContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 100rem;
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

const ItemsContainer = styled.div`
  border: 1px solid #cfd9e1;
  border-radius: 1.5rem;
  padding: 4rem;
  background-color: ${(props) => props.theme.colors.white};
`;

const Container = styled.div`
  border: 1px solid #cfd9e1;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.lightBlue1};
`;

const PreviewTitle = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h4};
`;
