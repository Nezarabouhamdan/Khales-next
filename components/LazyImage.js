import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 85,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  style = {},
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={
        fill ? { position: "relative", ...style } : { width, height, ...style }
      }
    >
      {isInView || priority ? (
        <>
          {!hasError ? (
            <Image
              src={src}
              alt={alt}
              width={fill ? undefined : width}
              height={fill ? undefined : height}
              fill={fill}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              sizes={sizes}
              className={`transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={handleLoad}
              onError={handleError}
              style={fill ? { objectFit: "cover" } : {}}
              {...props}
            />
          ) : (
            <div
              className="w-full h-full bg-gray-200 flex items-center justify-content-center"
              style={
                fill ? { position: "absolute", inset: 0 } : { width, height }
              }
            >
              <div className="text-gray-400 text-sm">Image not available</div>
            </div>
          )}
        </>
      ) : (
        <div
          className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center"
          style={fill ? { position: "absolute", inset: 0 } : { width, height }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
