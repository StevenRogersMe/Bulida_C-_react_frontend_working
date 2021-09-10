import styled from 'styled-components';
import { MIPagination } from 'src/components/common/MIPagination';

type Props = {
  goToPage: (page: number) => void;
  showPagination: boolean;
  pageIndex: number;
  pageCount: number;
};

export const SkagAdCreatorTableFooter = ({
  goToPage,
  showPagination,
  pageIndex,
  pageCount,
}: Props) => {
  return (
    <Container>
      {showPagination && (
        <MIPagination
          goToPage={goToPage}
          pageIndex={pageIndex}
          pageCount={pageCount}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blue2};
`;
