import { useState } from 'react';
import styled from 'styled-components';
import { AdType, AdGroupType } from 'src/utils/types';
import { calculateAdGroupNamesByType } from 'src/utils/builder';
import { ExpTextCard } from 'src/components/skag/AdCreator/Table/ExpTextCard';
import { CallOnlyCard } from 'src/components/skag/AdCreator/Table/CallOnlyCard';
import { ResponsiveSearchCard } from 'src/components/skag/AdCreator/Table/ResponsiveSearchCard';
import { SnippetCard } from 'src/components/skag/AdCreator/Table/SnippetCard';
import { CallOutCard } from 'src/components/skag/AdCreator/Table/CallOutCard';
import { useModal } from 'src/helpers/react/useModal';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { headerTypes } from 'src/utils/headerTypes';
import { FormModal } from '../Modal/FormModal';
import { getDataForForm } from '../form/data';

type Props = {
  item: any;
  adGroupList: AdGroupType[];
};

export const SkagAdCreatorTableItem = ({ item, adGroupList }: Props) => {
  const [currentAdTypeDetails, setAdTypeDetails] = useState<any>({});
  const [currentItem, setCurrentItem] = useState<any>();
  const closeModal = () => {
    dismiss();
  };
  const showEditFormModal = (data) => {
    setAdTypeDetails(getDataForForm(data.type));
    setCurrentItem(data);
    showEditingFormModal();
  };

  const [EditingFormModal, showEditingFormModal, , dismiss] = useModal(
    MIModalMessage,
    {
      id: currentAdTypeDetails?.id,
      titleComponent: (
        <ModalTitleContainer>
          <ModalTitle>
            {currentAdTypeDetails?.title1}{' '}
            <Bold>{currentAdTypeDetails?.boldTitle}</Bold>
          </ModalTitle>
        </ModalTitleContainer>
      ),
      footerComponent: (
        <FormModal
          currentAdType={currentAdTypeDetails?.type}
          defaultData={{}}
          values={currentItem}
          closeModal={closeModal}
        />
      ),
    }
  );

  const renderItem = (item) => {
    const { type } = item;
    const adGroupNames = calculateAdGroupNamesByType(type, adGroupList);
    if (type === AdType.EXPANDED) {
      return (
        <ExpTextCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
          showEditFormModal={showEditFormModal}
        />
      );
    }

    if (type === AdType.CALL) {
      return (
        <CallOnlyCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
          showEditFormModal={showEditFormModal}
        />
      );
    }

    if (type === AdType.RESPONSIVE) {
      return (
        <ResponsiveSearchCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
          showEditFormModal={showEditFormModal}
        />
      );
    }

    if (type === AdType.SNIPPET) {
      return (
        <SnippetCard
          item={item}
          headerTypeLabel={
            headerTypes.find((el) => el.value === item.headerType)?.label
          }
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
          showEditFormModal={showEditFormModal}
        />
      );
    }

    if (type === AdType.CALLOUT) {
      return (
        <CallOutCard
          item={item}
          adGroupNames={adGroupNames}
          renderAdGroupNames={renderAdGroupNames}
          showEditFormModal={showEditFormModal}
        />
      );
    }
  };

  const renderAdGroupNames = (adGroupNames) => {
    const visibleAdGroupNames = adGroupNames.slice(0, 3);
    const unVisibleAdGroupNamesCount = adGroupNames.length - 3;
    const showUnVisibleAdGroupNamesCount = unVisibleAdGroupNamesCount > 0;
    return (
      <>
        {EditingFormModal}
        {visibleAdGroupNames.map((name, index) => {
          return <AdGroupName key={index}>{name}</AdGroupName>;
        })}
        {showUnVisibleAdGroupNamesCount && (
          <AdGroupNamesCount>{` + ${unVisibleAdGroupNamesCount}`}</AdGroupNamesCount>
        )}
      </>
    );
  };

  return (
    <>
      {item.map((i, index) => {
        return <Container key={index}>{renderItem(i)}</Container>;
      })}
    </>
  );
};

const Container = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const AdGroupName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AdGroupNamesCount = styled.span`
  background-color: #ebedf3;
  border-radius: 0.5rem;
  width: fit-content;
  margin-top: 1rem;
  padding: 0.5rem 0.6rem;
  ${(props) => props.theme.text.fontType.hint};
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
