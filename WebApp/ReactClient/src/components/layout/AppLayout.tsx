import * as React from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { useBreak } from 'src/hooks/useBreak';
import { theme } from 'src/theme/defaultTheme';
import { AppHeader } from 'src/components/header/AppHeader';
import { AppFooter } from 'src/components/footer/AppFooter';
import { UnsupportedResolutionPage } from 'src/pages/unsupported/UnsupportedResolutionPage';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const { isDesktop } = useBreak();

  return (
    <>
      {isDesktop ? (
        <ThemeProvider theme={theme}>
          <Container>
            <AppHeader />
            <ToastContainer
              transition={Bounce}
              closeButton={false}
              className='MIToastContainer'
              toastClassName='MIToastInner'
            />
            <Main>{children}</Main>
            <AppFooter />
          </Container>
        </ThemeProvider>
      ) : (
        <UnsupportedResolutionPage />
      )}
    </>
  );
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
`;

const Main = styled.div`
  position: relative;
  flex: 1;
`;
