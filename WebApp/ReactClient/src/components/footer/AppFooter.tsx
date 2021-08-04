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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.8rem 11rem 2.8rem 12rem;
  color: ${(props) => props.theme.colors.black2};
  background-color: ${(props) => props.theme.colors.pureWhite};
  ${(props) => props.theme.text.fontType.body3};
`;

const Copyright = styled.div``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;

  > div:nth-child(2) {
    margin: 0 1rem;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 1rem;
`;
