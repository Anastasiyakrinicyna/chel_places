import React, { useState, useMemo } from 'react';
import { categories, placesData } from './data/places';
import type { Place } from './types';
import Header from './components/Header';
import Filters from './components/Filters';
import PlaceCard from './components/PlaceCard';
import PlaceModal from './components/PlaceModal';
import './App.css';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    return placesData.filter((place) => {
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="app">
      <div className="container">
        <Header placeCount={filteredPlaces.length} />
        
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {filteredPlaces.length === 0 ? (
          <div className="no-results">
            <p className="no-results-text">😕 По вашему запросу ничего не найдено</p>
            <button className="reset-btn" onClick={handleResetFilters}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="places-grid">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} onClick={setSelectedPlace} />
            ))}
          </div>
        )}
      </div>
      
      <PlaceModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
};

export default App;