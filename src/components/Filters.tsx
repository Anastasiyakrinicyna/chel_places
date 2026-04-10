import React from 'react';
import type { Category } from '../types';

interface FiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="filters">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Поиск мест по названию, описанию или адресу..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Поиск мест"
        />
      </div>
      
      <div className="categories" role="tablist">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
            role="tab"
            aria-selected={selectedCategory === category.id}
            aria-label={category.name}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;