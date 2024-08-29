import React from 'react';

interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      className="border rounded px-3 py-2"
      placeholder="Search Products"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchInput;
