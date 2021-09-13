import styled from 'styled-components';
import { MITextInput } from 'src/components/common/MITextInput';
import {
  AdType,
  InputValue,
  SnippetExtensionType,
  SnippetExtensionFormErrors,
} from 'src/utils/types';
import { firstRow, fullRow } from './data';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createAds, updateAds } from 'src/redux/skagCompaign/actions';
import { notifySuccess } from 'src/services/notifications/notificationService';
import { MIDropDown } from 'src/components/common/MIDropDown';
import { MIInputLabel } from 'src/components/common/MIInputLabel';
import { SnippetCardPreview } from 'src/components/skag/AdCreator/form/SnippetExtForm/SnippetCardPreview';
import { headerTypes } from 'src/utils/headerTypes';
import MIFormButtons from 'src/components/common/MIFormButtons';

type Props = {
  initialValues: SnippetExtensionType;
  closeModal: any;
};

export const SnippetExtForm = ({ initialValues, closeModal }: Props) => {
  const isNewData = initialValues?.id === undefined;
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors: SnippetExtensionFormErrors = {};
    if (!values.language) {
      errors.language = 'This field is required';
    } else if (!values.headerType) {
      errors.headerType = 'This field is required';
    } else if (!values.snippetValueOne) {
      errors.snippetValueOne = 'This field is required';
    } else if (!values.snippetValueTwo) {
      errors.snippetValueTwo = 'This field is required';
    } else if (!values.snippetValueThree) {
      errors.snippetValueThree = 'This field is required';
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
            ? createAds(AdType.SNIPPET, values)
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
    return values.map((item) =>
      item.options ? (
        <ItemContainer key={item.key}>
          <MIInputLabel
            label={item.label}
            required={item.required}
            errorMessage={
              item.key in formik.errors ? formik.errors[item.key] : null
            }
          />
          <MIDropDown
            simpleStyles={true}
            options={item.options}
            errorMessage={
              item.key in formik.errors ? formik.errors[item.key] : null
            }
            label={
              item.options?.find(
                (option) => option.value === formik.values.language
              )?.label ||
              item.options?.find(
                (option) => option.value === formik.values.headerType
              )?.label ||
              ''
            }
            value={formik.values.language}
            onChange={({ value }) => inputHandler(item.key, value)}
          />
        </ItemContainer>
      ) : (
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
      )
    );
  };

  return (
    <Wrapper>
      <Container>
        <ItemsContainer>
          <ShortItems>{renderInputs(firstRow)}</ShortItems>
          {renderInputs(fullRow)}
          <PreviewContainer>
            <PreviewTitle>Preview</PreviewTitle>
            <SnippetCardPreview
              item={formik.values}
              headerTypeLabel={
                headerTypes.find((el) => el.value === formik.values.headerType)
                  ?.label
              }
            />
          </PreviewContainer>
        </ItemsContainer>
      </Container>
      <MIFormButtons closeModal={closeModal} saveHandler={formik.submitForm} />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 100rem;
`;

const ShortItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div:nth-child(1) {
    margin-right: 4.5rem;
  }
  > div:nth-child(2) {
    margin-left: 4.5rem;
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

const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
