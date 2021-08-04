import styled from 'styled-components';
import LogoImage from 'src/images/general/logo.svg';

export const UnsupportedResolutionPage = () => (
  <Container>
    <Logo src={LogoImage} />
    <Title>Screen width is too small</Title>
    <Subtitle>
      This screen resolution is not supported. Please resize the window.
    </Subtitle>
  </Container>
);

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #dae2f9;
  padding: 0 2rem;
`;

const Logo = styled.img``;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  color: #202226;
  font-size: 4.8rem;
  line-height: 5.8rem;
  font-weight: normal;
  padding: 0 0 2rem 0;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #606473;
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: bold; ;
`;
