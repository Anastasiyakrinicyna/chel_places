import React from 'react';
import type { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  onClick: (place: Place) => void;
}

const getCategoryName = (categoryId: string): string => {
  const categories: Record<string, string> = {
    attractions: 'Достопримечательности',
    parks: 'Парки',
    museums: 'Музеи',
    theaters: 'Театры',
    restaurants: 'Рестораны',
    shopping: 'ТЦ',
    cinemas: 'Кинотеатры',
    cafes: 'Кофейни',
    hotels: 'Отели'
  };
  return categories[categoryId] || categoryId;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(place);
    }
  };

  return (
    <article 
      className="place-card" 
      onClick={() => onClick(place)} 
      onKeyDown={handleKeyDown}
      role="button" 
      tabIndex={0}
      aria-label={`Подробнее о ${place.name}`}
    >
      <div className="place-image">
        <img 
          src={place.image} 
          alt={place.name} 
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Фото+не+доступно';
          }}
        />
        {place.rating && (
          <div className="place-rating" aria-label={`Рейтинг: ${place.rating} из 5`}>
            <span aria-hidden="true">★</span> {place.rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="place-info">
        <h3 className="place-name">{place.name}</h3>
        <div className="place-meta">
          <span className="place-category">{getCategoryName(place.category)}</span>
          <span className="place-price">{place.price}</span>
        </div>
        <p className="place-description">{place.description}</p>
        <div className="place-address" title={place.address}>
          <span className="address-icon" role="img" aria-label="адрес">📍</span>
          <span className="address-text">{place.address}</span>
        </div>
        {place.phone && (
          <div className="place-phone" title={place.phone}>
            <span className="phone-icon" role="img" aria-label="телефон">📞</span>
            <span className="phone-text">{place.phone}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PlaceCard;