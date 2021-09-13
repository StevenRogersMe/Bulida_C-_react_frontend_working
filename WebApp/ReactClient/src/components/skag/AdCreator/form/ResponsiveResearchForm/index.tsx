import styled from 'styled-components';
import { MITextInput } from 'src/components/common/MITextInput';
import {
  AdType,
  InputValue,
  RespSearchAdType,
  RespSearchFormErrors,
} from 'src/utils/types';
import {
  firstRow,
  fullRow,
  optionalDescriptionData,
  optionalDescriptions,
  optionalHeadlineData,
  optionalHeadlines,
  secondRow,
  validationRuleOfUrl,
} from './data';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createAds, updateAds } from 'src/redux/skagCompaign/actions';
import { notifySuccess } from 'src/services/notifications/notificationService';
import { RespResearchPreview } from './RespResearchPreview';
import { MIFormAddButton } from 'src/components/common/MIFormAddButton';
import MIFormButtons from 'src/components/common/MIFormButtons';

type Props = {
  initialValues: RespSearchAdType;
  closeModal: any;
};

export const RespResearchForm = ({ initialValues, closeModal }: Props) => {
  const isNewData = initialValues?.id === undefined;
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors: RespSearchFormErrors = {};
    if (!values.finalUrl) {
      errors.finalUrl = 'This field is required';
    } else if (!validationRuleOfUrl.test(values.finalUrl)) {
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
            ? createAds(AdType.RESPONSIVE, values)
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
          {...(key === optionalDescriptions
            ? optionalDescriptionData
            : optionalHeadlineData)}
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
              title='add new headline'
              onClick={() => optionalValuesHandler(optionalHeadlines)}
            />
          </AddButtonContainer>
          <ShortItems>{renderInputs(firstRow)}</ShortItems>
          {formik.values.optionalHeadlines?.length ? (
            <ShortItemsCustom>
              {renderInputs(formik.values.optionalHeadlines, optionalHeadlines)}
            </ShortItemsCustom>
          ) : null}
          <AddButtonContainer>
            <MIFormAddButton
              title='add new description'
              onClick={() => optionalValuesHandler(optionalDescriptions)}
            />
          </AddButtonContainer>
          {renderInputs(fullRow)}
          {formik.values.optionalDescriptions?.length
            ? renderInputs(
                formik.values.optionalDescriptions,
                optionalDescriptions
              )
            : null}
          <ShortItems>{renderInputs(secondRow)}</ShortItems>
        </ItemsContainer>
        <PreviewContainer>
          <PreviewTitle>Preview</PreviewTitle>
          <RespResearchPreview item={formik.values} />
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
`;

const ShortItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 100rem;
  > div:nth-child(2) {
    margin: 0 4.5rem 0 4.5rem;
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

const ShortItemsCustom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100rem;
  > div:nth-child(3n - 1) {
    margin: 0 1rem 0 1rem;
  }
  > div:nth-child(n) {
    color: red;
    min-width: calc(100% - 70rem);
    max-width: 32.7rem;
  }
`;
