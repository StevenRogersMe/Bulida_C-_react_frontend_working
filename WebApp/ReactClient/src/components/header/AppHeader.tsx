import styled from 'styled-components';
import { useModal } from 'src/helpers/react/useModal';
import { SignInModal } from 'src/components/header/Modal/SignInModal';
import LogoImage from 'src/images/general/logo.svg';

export const AppHeader = () => {
  const [SignIn, showSignIn] = useModal(SignInModal, {
    id: 'signInModal',
  });
  return (
    <>
      {SignIn}
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
          <LogInButton onClick={showSignIn}>SIGN IN</LogInButton>
          <SignUpButton>SIGN UP</SignUpButton>
        </Auth>
      </AppHeaderContainer>
    </>
  );
};

const AppHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 12rem;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.pureWhite};
  box-shadow: 0px 0px 12px rgba(84, 89, 98, 0.15);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.blue2};
  ${(props) => props.theme.text.fontType.h4};
`;

const Logo = styled.img``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.body2};

  > div:nth-child(2) {
    margin: 0 2rem;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 1rem;
`;

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
  cursor: pointer;
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  color: ${(props) => props.theme.colors.blue1};
  background-color: ${(props) => props.theme.colors.pureWhite};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;

const SignUpButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 1.2rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue1};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;
