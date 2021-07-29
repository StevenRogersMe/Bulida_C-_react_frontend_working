import * as React from 'react';
import styled from 'styled-components';
import backgroundImage from 'src/images/background/background.png';
import { ThemeProvider } from 'styled-components';
import { useBreak } from 'src/hooks/useBreak';
import { theme } from 'src/theme/defaultTheme';
import { AppHeader } from 'src/components/header/AppHeader';

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
            <Main>{children}</Main>
          </Container>
        </ThemeProvider>
      ) : (
        <div />
      )}
    </>
  );
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  padding: 5rem 12rem 7rem 14rem;
  background-color: ${(props) => props.theme.background.default};
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  -moz-background-size: 100%;
  -webkit-background-size: 100%;
  -o-background-size: 100%;
  background-size: 100%;
`;

const Main = styled.div`
  position: relative;
  flex: 1;
`;