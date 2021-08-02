import styled from 'styled-components';
import LogoImage from 'src/images/general/logo.svg';

export const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <LogoContainer>
        <Logo src={LogoImage} />
        Builda
      </LogoContainer>
      <Menu>
        <MenuItem>Product tour</MenuItem>
        <MenuItem>Help center</MenuItem>
        <MenuItem>Pricing</MenuItem>
      </Menu>
      <Auth>
        <LogInButton>SIGN IN</LogInButton>
        <SignUpButton>SIGN UP</SignUpButton>
      </Auth>
    </AppHeaderContainer>
  );
};

const AppHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 13rem;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.pureWhite};
  box-shadow: 0px 0px 12px rgba(84, 89, 98, 0.15);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.h5};
`;

const Logo = styled.img``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.body3};

  > div:nth-child(2) {
    margin: 0 4rem;
  }
`;

const MenuItem = styled.div``;

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  ${(props) => props.theme.text.fontType.body4};

  > div:nth-child(1) {
    margin: 0 0.5rem 0 0;
  }
`;

const LogInButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 1.2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  color: ${(props) => props.theme.colors.blue1};
  background-color: ${(props) => props.theme.colors.pureWhite};
`;

const SignUpButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 1.2rem;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue1};
`;
