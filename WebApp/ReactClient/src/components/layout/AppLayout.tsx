import * as React from 'react';
import styled from 'styled-components';
import { useBreak } from 'src/hooks/useBreak';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const { isDesktop } = useBreak();

  return (
    <Container>
      <>{isDesktop ? <Main>{children}</Main> : <div></div>}</>
    </Container>
  );
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.div`
  position: relative;
  flex: 1;
`;
