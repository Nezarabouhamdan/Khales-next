import React, { useState } from 'react';
import './ServiceItem.css';

const ServiceItem = ({ title, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="service-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* The title is visible when not hovered */}
      <div className={`service-content ${isHovered ? 'fade-out' : ''}`}>
        {title}
      </div>
      {/* The image appears on hover and follows the mouse */}
      {isHovered && (
        <img
          src={imageUrl}
          alt={title}
          className="service-image"
          style={{
            top: mousePos.y,
            left: mousePos.x,
          }}
        />
      )}
    </div>
  );
};

export default ServiceItem;
