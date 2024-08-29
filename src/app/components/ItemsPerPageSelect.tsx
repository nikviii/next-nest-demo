import React from 'react';

interface ItemsPerPageSelectProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({
  limit,
  onLimitChange,
}) => {
  return (
    <div>
      <label htmlFor="limitSelect">Items per page:</label>
      <select
        id="limitSelect"
        value={limit}
        onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
      >
        <option value={1}>1</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelect;
