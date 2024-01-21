import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export const SearchBar: React.FC = () => {
  const handleSearch = (value: string) => {
    // Implement your search logic here
    console.log('Searching for:', value);
  };

  return (
    <Search
      placeholder="Enter your search query"
      onSearch={handleSearch}
      className="w-fit"
     
    />
  );
};

