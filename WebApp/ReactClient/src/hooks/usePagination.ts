import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from 'src/utils/consts';

type Props = {
  totalItems?: number;
  limit?: number;
};

export const usePagination = ({
  totalItems = 0,
  limit = DEFAULT_PAGE_SIZE,
}: Props) => {
  const pageCount = useMemo(
    () => Math.ceil(totalItems / limit),
    [totalItems, limit]
  );
  const showPagination = totalItems > limit;
  const [pageIndex, setPageIndex] = useState(1);
  const [canNextPage, setCanNextPage] = useState(true);
  const [canPreviousPage, setCanPreviousPage] = useState(false);

  useEffect(() => {
    setPageIndex(1);
  }, [totalItems]);

  const setPaginationState = useCallback(
    (page: number) => {
      setCanNextPage(page !== pageCount - 1);
      setCanPreviousPage(page !== 0);
    },
    [pageCount]
  );

  const goToPage = useCallback(
    (page: number) => {
      setPageIndex(page);
      setPaginationState(page);
    },
    [setPageIndex, setPaginationState]
  );

  const previousPage = useCallback(() => {
    const prevIndexPage = pageIndex - 1;
    goToPage(prevIndexPage);
  }, [goToPage, pageIndex]);

  const nextPage = useCallback(() => {
    const nextIndexPage = pageIndex + 1;
    goToPage(nextIndexPage);
  }, [goToPage, pageIndex]);

  return {
    canNextPage,
    canPreviousPage,
    previousPage,
    nextPage,
    goToPage,
    showPagination,
    pageCount,
    pageIndex,
    setPaginationState,
  };
};
