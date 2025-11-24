import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, lang }) => {
  const isRtl = lang === 'ar';

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href={`/${lang}/projects?page=${i}`}
          className={`pagination-link ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </Link>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`pagination-wrapper ${isRtl ? 'rtl' : 'ltr'}`}>
      <Link
        href={`/${lang}/projects?page=${Math.max(1, currentPage - 1)}`}
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        aria-disabled={currentPage === 1}
      >
        {isRtl ? <FaArrowRight /> : <FaArrowLeft />}
        <span className="arrow-text">{isRtl ? 'التالي' : 'Previous'}</span>
      </Link>

      <div className="pagination-numbers">{renderPageNumbers()}</div>

      <Link
        href={`/${lang}/projects?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        aria-disabled={currentPage === totalPages}
      >
        <span className="arrow-text">{isRtl ? 'السابق' : 'Next'}</span>
        {isRtl ? <FaArrowLeft /> : <FaArrowRight />}
      </Link>
    </div>
  );
};

export default Pagination;
