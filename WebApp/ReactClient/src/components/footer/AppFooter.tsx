import styled from 'styled-components';

export const AppFooter = () => {
  return (
    <AppFooterContainer>
      <Copyright>Copyright © 2021</Copyright>
      <Menu>
        <MenuItem>Terms of Service</MenuItem>
        <MenuItem>Privacy Policy</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Menu>
    </AppFooterContainer>
  );
};

const AppFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.black2};
  ${(props) => props.theme.text.fontType.body1};
`;

const Copyright = styled.div``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;

  > div:nth-child(2) {
    margin: 0 4rem;
  }
`;

const MenuItem = styled.div``;
