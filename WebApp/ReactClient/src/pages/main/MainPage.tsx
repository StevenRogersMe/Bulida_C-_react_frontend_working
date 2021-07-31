import styled from 'styled-components';
import { BuilderContainer } from 'src/pages/main/components/BuilderContainer';

export const MainPage = () => {
  return (
    <MainPageContainer>
      <BuilderContainer />
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12rem;
`;
