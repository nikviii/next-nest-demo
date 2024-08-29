'use client';

import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import CategorySelect from '../components/CategorySelect';
import SearchInput from '../components/SearchInput';
import PaginationControls from '../components/PaginationControls';
import ItemsPerPageSelect from '../components/ItemsPerPageSelect';
import { Category, Product } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product-categories`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data.items);
      } catch (error) {
        setError('Error fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}/products?page=${currentPage}&limit=${limit}`;
        if (searchTerm) url += `&search=${searchTerm}`;
        if (sortBy && sortOrder) url += `&sort=${sortBy}&order=${sortOrder}`;
        if (selectedCategory) url += `&productCategory=${selectedCategory}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data.items);
        setTotal(data.total);
      } catch (error) {
        setError('Error fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, sortBy, sortOrder, currentPage, limit, selectedCategory]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <div className="mb-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 mr-2"
          onClick={() => handleSort('name')}
        >
          Sort by Name
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200 mr-2"
          onClick={() => handleSort('price')}
        >
          Sort by Price
        </button>
      </div>

      <div className="mb-4">
        <CategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="mb-4">
        <SearchInput value={searchTerm} onSearch={handleSearch} />
      </div>

      <ProductTable products={products} />

      <div className="mb-4">
        <PaginationControls
          total={total}
          limit={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mb-4">
        <ItemsPerPageSelect limit={limit} onLimitChange={handleLimitChange} />
      </div>
    </div>
  );
};

export default Home;
