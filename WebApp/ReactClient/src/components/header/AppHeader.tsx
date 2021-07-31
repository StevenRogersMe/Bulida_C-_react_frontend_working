import styled from 'styled-components';

export const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <Logo>LOGO</Logo>
      <Menu>
        <MenuItem>Product tour</MenuItem>
        <MenuItem>Help center</MenuItem>
        <MenuItem>Pricing</MenuItem>
      </Menu>
      <Auth>
        <LogInButton>Sign in</LogInButton>
        <SignUpButton>Sign up</SignUpButton>
      </Auth>
    </AppHeaderContainer>
  );
};

const AppHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: ${(props) => props.theme.colors.grey1};
  ${(props) => props.theme.text.fontType.h5};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.black};
  ${(props) => props.theme.text.fontType.body3};

  > div:nth-child(2) {
    margin: 0 4rem;
  }
`;

const MenuItem = styled.div``;

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.1rem;
  ${(props) => props.theme.text.fontType.body3};

  > div:nth-child(1) {
    margin: 0 1rem 0 0;
  }
`;

const LogInButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 4rem;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
`;

const SignUpButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 4rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue3};
`;
