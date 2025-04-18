import React from 'react';
import { gsap } from 'gsap';
import './PassionsSection.css';
import CustomCursor from './cursor';

const PassionsSection = () => {
  const passionItems = [
    {
      title: "Project Mangment",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56ac211dc6935e5516_Sri_Lanka_phone_export_31.webp",
      isLong: true,
    },
    {
      title: "Develpoment Planing",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Architectural Design",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Buliding Contracting",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Engineering Consultancy",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Interior Design",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Landscaping",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Real estate",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
    {
      title: "Fit-out",
      image:
        "https://cdn.prod.website-files.com/65df4ab0e1e0700997c6556f/6660df56d3b2c93274c3a96f_skating.webp",
      isLong: false,
    },
  ];

  const handleMouseEnter = (event, index) => {
    const item = event.currentTarget;
    const img = item.querySelector(`.passion-list_grid-item-bg-${index}`);
    const { width, height, top, left } = item.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const edge = closestEdge(x, y, width, height);

    let fromVars;
    switch (edge) {
      case 'left':
        fromVars = { xPercent: -100, yPercent: 0 };
        break;
      case 'right':
        fromVars = { xPercent: 100, yPercent: 0 };
        break;
      case 'top':
        fromVars = { xPercent: 0, yPercent: -100 };
        break;
      case 'bottom':
        fromVars = { xPercent: 0, yPercent: 100 };
        break;
      default:
        fromVars = { xPercent: 0, yPercent: 0 };
    }

    gsap.fromTo(
      img,
      { ...fromVars, opacity: 0 },
      { xPercent: 0, yPercent: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }
    );
  };

  const handleMouseLeave = (event, index) => {
    const item = event.currentTarget;
    const img = item.querySelector(`.passion-list_grid-item-bg-${index}`);
    gsap.to(img, {
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
    });
  };

  return (
    <div className="section--passion-list" style={{    backgroundColor: '#f5f5f5'}}>
        <CustomCursor/>
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="passion-list_inner">
            <div className="passion-list_grid">
              {passionItems.map((item, index) => (
                <div
                  key={index}
                  className={`passion-list_grid-item-wrap ${item.isLong ? 'is-long' : ''}`}
                  onMouseEnter={(e) => handleMouseEnter(e, index)}
                  onMouseLeave={(e) => handleMouseLeave(e, index)}
                >
                  <div className="passion-list_grid-item">
                    <div className="passion-list_grid-item-content">
                      <img
                        src={item.image}
                        alt=""
                        className={`passion-list_grid-item-bg passion-list_grid-item-bg-${index}`}
                        style={{ opacity: 0 }}
                      />
                      <div className="overflow-hidden">
                        <h3 className="heading-style-h3 is-blending-difference is-passion">
                        
                   
                            {item.title}
                    
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassionsSection;

function closestEdge(x, y, w, h) {
  const topEdgeDist = distMetric(x, y, w / 2, 0);
  const bottomEdgeDist = distMetric(x, y, w / 2, h);
  const leftEdgeDist = distMetric(x, y, 0, h / 2);
  const rightEdgeDist = distMetric(x, y, w, h / 2);
  const min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
  switch (min) {
    case leftEdgeDist:
      return 'left';
    case rightEdgeDist:
      return 'right';
    case topEdgeDist:
      return 'top';
    case bottomEdgeDist:
      return 'bottom';
  }
}

function distMetric(x, y, x2, y2) {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
}