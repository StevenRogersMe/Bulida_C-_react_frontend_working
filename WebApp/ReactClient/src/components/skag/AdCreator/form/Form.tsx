import styled from 'styled-components';

const Form = ({ titleComponent, contentComponent, footerComponent }) => {
  return (
    <Container>
      {titleComponent && <TitleContainer>{titleComponent}</TitleContainer>}
      {contentComponent && (
        <ContentContainer>{contentComponent}</ContentContainer>
      )}
      {footerComponent && <FooterContainer>{footerComponent}</FooterContainer>}
    </Container>
  );
};

const Container = styled.div`
  min-width: 90%;
  max-height: calc(120vh);
`;

const TitleContainer = styled.div``;

const ContentContainer = styled.div``;

const FooterContainer = styled.div``;

export default Form;
