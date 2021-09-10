import styled from 'styled-components';

type Props = {
  goToPage: (page: number) => void;
  pageIndex: number;
  pageCount: number;
};

export const MIPagination = ({ goToPage, pageIndex, pageCount }: Props) => {
  return (
    <Container>
      {Array.from(Array(pageCount)).map((el, index) => {
        const isSelected = index + 1 === pageIndex;
        return (
          <PageIndex
            key={index}
            isSelected={isSelected}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </PageIndex>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageIndex = styled.div<{ isSelected: boolean }>`
  color: ${(props) =>
    props.isSelected ? props.theme.colors.blue2 : props.theme.colors.white};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 2px 9px;
  border-radius: 5px;
  box-sizing: border-box;
  background: ${(props) => props.isSelected && props.theme.colors.white};
  ${(props) => props.theme.text.fontType.body1};
`;
