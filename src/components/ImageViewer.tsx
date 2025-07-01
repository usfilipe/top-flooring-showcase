
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GalleryImage } from '@/hooks/useGalleryData';

interface ImageViewerProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ImageViewer = ({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrevious 
}: ImageViewerProps) => {
  const [imageOrientation, setImageOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const currentImage = images[currentIndex];
  
  if (!currentImage) return null;

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
    setImageOrientation(orientation);
  };

  // Reset orientation when image changes
  useEffect(() => {
    setImageOrientation('horizontal');
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-[95vw] max-h-[95vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b flex-shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-4">
            {currentImage.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center bg-gray-50">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            onLoad={handleImageLoad}
            className="max-w-full max-h-full object-contain"
            style={{ 
              width: 'auto', 
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
          
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={onPrevious}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                disabled={currentIndex === images.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} of {images.length}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="p-3 sm:p-4 border-t flex-shrink-0 max-h-32 overflow-y-auto">
          <p className="text-sm sm:text-base text-gray-600">{currentImage.description}</p>
        </div>
      </div>
    </div>
  );
};
