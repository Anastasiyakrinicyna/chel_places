import React from 'react';

interface HeaderProps {
  placeCount: number;
}

const Header: React.FC<HeaderProps> = ({ placeCount }) => {
  return (
    <header className="header">
      <h1 className="header-title">
        <span className="header-icon" role="img" aria-label="город">🏙️</span>
        Куда сходить в Челябинске
      </h1>
      <p className="header-subtitle">
        Найдите лучшие места для отдыха и развлечений в столице Южного Урала
      </p>
      <div className="place-counter" aria-live="polite">
        Найдено мест: <span className="counter-value">{placeCount}</span>
      </div>
    </header>
  );
};

export default Header;