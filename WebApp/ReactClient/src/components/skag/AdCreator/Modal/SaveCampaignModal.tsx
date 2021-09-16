import styled from 'styled-components';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import DownloadImage from 'src/images/general/download-image.svg';
import GoogleAdwardsLogo from 'src/images/general/google-adwards-logo.svg';
import CloudDownloadImage from 'src/images/general/cloud-download.svg';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
};

export const SaveCampaignModal = ({ dismiss }: Props) => {
  return (
    <MIModalMessage
      dismiss={dismiss}
      titleComponent={
        <ModalTitleContainer>
          <ModalTitle>
            Save <Bold>Campaign</Bold>
          </ModalTitle>
          <ItemsContainer>
            <ItemContainer>
              <ItemIcon src={DownloadImage} />
              <ItemDescription>
                <Description>Download</Description>
                <Bold>CSV</Bold>
              </ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemIcon src={GoogleAdwardsLogo} />
              <ItemDescription>
                <Description>Import To</Description>
                <Bold>Google Adwards</Bold>
              </ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemIcon src={CloudDownloadImage} />
              <ItemDescription>
                <Description>Save</Description>
                <Bold>Campaign</Bold>
              </ItemDescription>
            </ItemContainer>
          </ItemsContainer>
        </ModalTitleContainer>
      }
    />
  );
};

const ModalTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.span`
  ${(props) => props.theme.text.fontType.h4};
  font-weight: 300;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > div:nth-child(2) {
    margin: 5rem 2rem;
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.text.size.subNav};
  line-height: ${(props) => props.theme.text.lineHeight.regular};
`;

const Description = styled.span``;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 33rem;
  height: 12.8rem;
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  border-radius: 1.5rem;
  background: ${(props) => props.theme.colors.white};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;

const ItemIcon = styled.img`
  margin-right: 2.5rem;
`;
