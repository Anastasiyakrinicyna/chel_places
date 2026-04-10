import React, { useEffect, useRef } from 'react';
import type { Place } from '../types';

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
}

const PlaceModal: React.FC<PlaceModalProps> = ({ place, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (place) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      // Фокус на кнопку закрытия для доступности
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [place, onClose]);

  if (!place) return null;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const formatPhoneLink = (phone: string) => {
    return `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  const formatWebsite = (website: string) => {
    if (website.startsWith('http://') || website.startsWith('https://')) {
      return website;
    }
    return `https://${website}`;
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" ref={modalRef}>
        {/* Улучшенная кнопка закрытия */}
        <button 
          ref={closeButtonRef}
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Закрыть"
          title="Закрыть (Esc)"
        >
          <svg 
            className="close-icon" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="close-text">Закрыть</span>
        </button>
        
        <div className="modal-image">
          <img 
            src={place.image} 
            alt={place.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Фото+не+доступно';
            }}
          />
        </div>
        
        <div className="modal-body">
          <h2 id="modal-title" className="modal-title">{place.name}</h2>
          
          {place.rating && (
            <div className="modal-rating">
              <span className="rating-stars" aria-label={`Рейтинг ${place.rating} из 5`}>
                {renderStars(place.rating)}
              </span>
              <span className="rating-value">{place.rating.toFixed(1)}</span>
            </div>
          )}
          
          <p className="modal-description">{place.description}</p>
          
          <div className="modal-details">
            <div className="detail-item">
              <span className="detail-icon" role="img" aria-label="адрес">📍</span>
              <span className="detail-label">Адрес:</span>
              <span className="detail-value">{place.address}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon" role="img" aria-label="время работы">🕒</span>
              <span className="detail-label">Время работы:</span>
              <span className="detail-value">{place.workingHours}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon" role="img" aria-label="цена">💰</span>
              <span className="detail-label">Цена:</span>
              <span className="detail-value">{place.price}</span>
            </div>

            {place.phone && (
              <div className="detail-item">
                <span className="detail-icon" role="img" aria-label="телефон">📞</span>
                <span className="detail-label">Телефон:</span>
                <span className="detail-value">
                  <a href={formatPhoneLink(place.phone)} className="phone-link">
                    {place.phone}
                  </a>
                </span>
              </div>
            )}

            {place.website && (
              <div className="detail-item">
                <span className="detail-icon" role="img" aria-label="сайт">🌐</span>
                <span className="detail-label">Сайт:</span>
                <span className="detail-value">
                  <a 
                    href={formatWebsite(place.website)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="website-link"
                  >
                    {place.website.replace(/^https?:\/\//, '')}
                  </a>
                </span>
              </div>
            )}
          </div>
          
          <div className="modal-actions">
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(place.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn map-btn"
            >
              <span className="btn-icon">📍</span>
              Яндекс.Карты
            </a>
            <a
              href={`https://2gis.ru/chelyabinsk/search/${encodeURIComponent(place.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn map-btn"
            >
              <span className="btn-icon">🗺️</span>
              2ГИС
            </a>
            <button className="modal-btn close-btn" onClick={onClose}>
              <span className="btn-icon">✕</span>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;