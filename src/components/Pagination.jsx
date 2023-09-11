import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPreviousPage }) => {
  return (
    <div className="pagination">
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>

  );
};

export default Pagination;
