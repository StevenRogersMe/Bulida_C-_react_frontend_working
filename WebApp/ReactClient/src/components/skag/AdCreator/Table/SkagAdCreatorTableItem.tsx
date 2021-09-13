import styled from 'styled-components';
import { AdType, AdGroupType } from 'src/utils/types';
import { calculateAdGroupNamesByType } from 'src/utils/builder';
import { ExpTextCard } from 'src/components/skag/AdCreator/Table/ExpTextCard';
import { CallOnlyCard } from 'src/components/skag/AdCreator/Table/CallOnlyCard';
import { ResponsiveSearchCard } from 'src/components/skag/AdCreator/Table/ResponsiveSearchCard';
import { SnippetCard } from 'src/components/skag/AdCreator/Table/SnippetCard';
import { CallOutCard } from 'src/components/skag/AdCreator/Table/CallOutCard';
import { headerTypes } from 'src/utils/headerTypes';
import { getDataForForm, getFormTitle } from '../form/data';
import { useDispatch, useSelector } from 'react-redux';
import { replaceSkagStep, setCurrentFormData, setSkagStep } from 'src/redux/skagCreationFlow/actions';
import { getSkagFlowStep } from 'src/redux/skagCreationFlow/selectors';

type Props = {
  item: any;
  adGroupList: AdGroupType[];
};

export const SkagAdCreatorTableItem = ({ item, adGroupList }: Props) => {

  const currentStep = useSelector(getSkagFlowStep);
  const dispatch = useDispatch();
  const showEditFormModal = (data) => {
    dispatch(setCurrentFormData(data, getDataForForm(data.type)))
    dispatch(replaceSkagStep(3, getFormTitle(data.type)));
    dispatch(setSkagStep(currentStep + 1))
  };

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
        {visibleAdGroupNames.map((name, index) => {
          return <AdGroupName key={index}>{name}</AdGroupName>;
        })}
        {showUnVisibleAdGroupNamesCount && (
          <AdGroupNamesCount>{` + ${unVisibleAdGroupNamesCount}`}</AdGroupNamesCount>
        )}
      </>
    );
  };

  return <Container>{renderItem(item)}</Container>;
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
