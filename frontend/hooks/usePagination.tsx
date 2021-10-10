import { useEffect, useState } from 'react';

type TProps = {
  pageSize: number;
  loading: boolean,
  sortStrQuery: string;
}

export default function usePagination({ pageSize, loading, sortStrQuery }: TProps) {
  const [pages, setPages] = useState(0);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (sortStrQuery) {
      handlePageClick(0);
    }
  }, [sortStrQuery])

  const handlePageNext = () => {
    if (loading) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setSkip(skip + pages)
  };

  const handlePagePrev = () => {
    if (loading) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setSkip(skip - pages)
  };

  const handlePageClick = (pageNumber: number) => {
    if (loading) {
      return;
    }
    setCurrentPage(pageNumber);
    setSkip(pageSize * pageNumber)
  }

  const setTotal = (total: number) => {
    const calPageSize = Math.ceil(total / pageSize)
    if (calPageSize !== pages) {
      setPages(calPageSize);
      handlePageClick(0);
    }
  }

  return {
    limit: pageSize,
    skip,
    pages,
    currentPage,
    handlePageNext,
    handlePagePrev,
    handlePageClick,
    setTotal
  };
}

