
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryImage } from "@/hooks/useGalleryData";

interface ImageCarouselProps {
  images: GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
  projectTitle: string;
}

const ImageCarousel = ({ images, initialIndex = 0, onClose, projectTitle }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
              onClick={goToNext}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        {/* Main image */}
        <div className="relative">
          <img
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt}
            className="w-full h-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {/* Image counter and title */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
            <h3 className="text-lg font-semibold">{projectTitle}</h3>
            <p className="text-sm text-gray-300">{images[currentIndex]?.alt}</p>
            {images.length > 1 && (
              <p className="text-xs text-gray-400 mt-1">
                {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? "border-amber-400 opacity-100" 
                    : "border-transparent opacity-60 hover:opacity-80"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
