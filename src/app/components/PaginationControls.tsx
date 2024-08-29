import React from 'react';

interface PaginationControlsProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  total,
  limit,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <ul className="flex">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li key={page}>
          <button
            className={`px-4 py-2 rounded bg-gray-200 mr-2 ${
              currentPage === page ? 'bg-gray-400' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PaginationControls;
