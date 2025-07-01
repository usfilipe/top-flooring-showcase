
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useGalleryData } from "@/hooks/useGalleryData";
import { ImageViewer } from "@/components/ImageViewer";

const Gallery = () => {
  const { data, loading, error } = useGalleryData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewerImages, setViewerImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [imageOrientations, setImageOrientations] = useState<{[key: string]: 'horizontal' | 'vertical'}>({});

  // Function to detect image orientation
  const handleImageLoad = (imageId: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
    setImageOrientations(prev => ({
      ...prev,
      [imageId]: orientation
    }));
  };

  // Add debugging logs
  console.log("Gallery data:", data);
  console.log("Selected category:", selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">Failed to load gallery data:</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">No gallery data available</p>
      </div>
    );
  }

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? data.images 
    : data.images.filter(image => image.category === selectedCategory);

  console.log("Filtered images:", filteredImages);
  console.log("All images:", data.images);

  const openViewer = (imageIndex: number) => {
    // Use only the filtered images for the viewer
    setViewerImages(filteredImages);
    setCurrentImageIndex(imageIndex);
    setShowViewer(true);
  };

  const closeViewer = () => {
    setShowViewer(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % viewerImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + viewerImages.length) % viewerImages.length);
  };

  // Get current category name for display
  const currentCategoryName = data.categories.find(cat => cat.id === selectedCategory)?.name || "All Projects";

  const handleCategoryChange = (categoryId: string) => {
    console.log("Changing category to:", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Work Gallery
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our portfolio of completed flooring projects and see the quality 
              craftsmanship that sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {data.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-amber-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentCategoryName}
            </h2>
            <p className="text-gray-600">
              {filteredImages.length} {filteredImages.length === 1 ? 'project' : 'projects'} in this category
            </p>
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No images found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredImages.map((image, index) => {
                const orientation = imageOrientations[image.id] || 'horizontal';
                return (
                  <div 
                    key={image.id} 
                    className="group cursor-pointer"
                    onClick={() => openViewer(index)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                      <img
                        src={image.src}
                        alt={image.title}
                        onLoad={(e) => handleImageLoad(image.id, e)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                          <div className="text-lg font-semibold mb-2">View Details</div>
                          <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mx-auto">
                            <span className="text-lg">+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {image.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Image Viewer */}
      {showViewer && (
        <ImageViewer
          images={viewerImages}
          currentIndex={currentImageIndex}
          onClose={closeViewer}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Love What You See?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let us create something beautiful for your home too. Contact us for a free consultation.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5 mr-2" />
              Start Your Project Today
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
