import styled from 'styled-components';
import { config } from 'src/config/default';
import { CampaignType, AdBuilderType, AdType } from 'src/utils/types';
import { BuilderItem } from 'src/pages/main/components/BuilderItem';
import { StagBuilder } from 'src/components/stag/StagBuilder';
import { StagAdCreator } from 'src/components/stag/StagAdCreator';
import { StagSettings } from 'src/components/stag/StagSettings';
import { StagReviewEditor } from 'src/components/stag/StagReviewEditor';
import { SkagBuilder } from 'src/components/skag/SkagBuilder';
import { SkagAdCreator } from 'src/components/skag/AdCreator/SkagAdCreator';
import { SkagSettings } from 'src/components/skag/SkagSettings';
import { SkagReviewEditor } from 'src/components/skag/SkagReviewEditor';
import { useDispatch, useSelector } from 'react-redux';
import { replaceSkagStep, setSkagStep } from 'src/redux/skagCreationFlow/actions';
import {
  getCurrentItem,
  getSkagSteps,
  getCurrentAdTypeDetails,
} from 'src/redux/skagCreationFlow/selectors';
import Form from 'src/components/skag/AdCreator/form/Form';
import { FormModal } from 'src/components/skag/AdCreator/Modal/FormModal';
import { settingsStep } from 'src/utils/consts';

type Props = {
  currentStep: number;
  skagCampaign: CampaignType;
  selectedBuilderType: AdBuilderType;
  setSelectedBuilderType: (type: AdBuilderType) => void;
};

export const BuilderContainer = ({
  currentStep,
  skagCampaign,
  selectedBuilderType,
  setSelectedBuilderType,
}: Props) => {
  const skagFlow = useSelector(getSkagSteps);
  const currentItem = useSelector(getCurrentItem);
  const currentAdTypeDetails = useSelector(getCurrentAdTypeDetails);
  const isSKAGFlow = selectedBuilderType === AdBuilderType.SKAG;
  const isSTAGFlow = selectedBuilderType === AdBuilderType.STAG;
  const dispatch = useDispatch();
  const startSKAGFlow = () => {
    dispatch(setSkagStep(1));
    setSelectedBuilderType(AdBuilderType.SKAG);
  };

  const startSTAGFlow = () => {
    setSelectedBuilderType(AdBuilderType.STAG);
  };

  const startADFlow = () => {
    setSelectedBuilderType(AdBuilderType.AD);
  };

  const closeHandler = () => {
    dispatch(replaceSkagStep(3, settingsStep));
    dispatch(setSkagStep(currentStep - 1))
  };

  const SKAGFlowPages = {
    1: <SkagBuilder campaign={skagCampaign} />,
    2: <SkagAdCreator campaign={skagCampaign} />,
    3:
      skagFlow[3] === settingsStep ? (
        <SkagSettings />
      ) : (
        <Form
          titleComponent={
            <ModalTitleContainer>
              <ModalTitle>
                {currentAdTypeDetails?.title1}{' '}
                <Bold>{currentAdTypeDetails?.boldTitle}</Bold>
              </ModalTitle>
            </ModalTitleContainer>
          }
          contentComponent={<></>}
          footerComponent={
            <FormModal
              currentAdType={currentAdTypeDetails?.type}
              defaultData={currentAdTypeDetails?.defaultData}
              values={currentItem}
              closeModal={closeHandler}
            />
          }
        />
      ),
    4: <SkagReviewEditor />,
  };

  const STAGFlowPages = {
    1: <StagBuilder />,
    2: <StagAdCreator />,
    3: <StagSettings />,
    4: <StagReviewEditor />,
  };

  const renderBuilderStep = () => {
    if (isSKAGFlow) {
      return SKAGFlowPages[currentStep] || <div>Not Found</div>;
    }

    if (isSTAGFlow) {
      return STAGFlowPages[currentStep] || <div>Not Found</div>;
    }

    return (
      <Container>
        <BuilderItem type={AdBuilderType.SKAG} onClick={startSKAGFlow} />
        {config.featureFlags.stag && (
          <BuilderItem type={AdBuilderType.STAG} onClick={startSTAGFlow} />
        )}
        {config.featureFlags.ad && (
          <BuilderItem type={AdBuilderType.AD} onClick={startADFlow} />
        )}
      </Container>
    );
  };

  return renderBuilderStep();
};

const Container = styled.div`
  width: 100%;
  margin: 0 13rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > div:nth-child(2) {
    margin: 0 3.5rem;
  }
`;

const ModalTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const ModalTitle = styled.span`
  ${(props) => props.theme.text.fontType.h4};
  font-weight: normal;
`;

const Bold = styled.span`
  font-weight: bold;
`;
