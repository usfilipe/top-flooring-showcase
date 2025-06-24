
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useGalleryData } from "@/hooks/useGalleryData";
import ImageCarousel from "@/components/ImageCarousel";

const Gallery = () => {
  const { data, loading, error } = useGalleryData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<{
    project: any;
    imageIndex: number;
  } | null>(null);

  const filteredProjects = selectedCategory === "all" 
    ? data.projects 
    : data.projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
                onClick={() => setSelectedCategory(category.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div 
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  onClick={() => setSelectedProject({ project, imageIndex: 0 })}
                >
                  <img
                    src={project.images[0]?.src}
                    alt={project.images[0]?.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <div className="text-lg font-semibold mb-2">View Gallery</div>
                      <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mx-auto">
                        <span className="text-lg">+</span>
                      </div>
                      {project.images.length > 1 && (
                        <div className="text-sm mt-2">
                          {project.images.length} images
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Carousel Modal */}
      {selectedProject && (
        <ImageCarousel
          images={selectedProject.project.images}
          initialIndex={selectedProject.imageIndex}
          projectTitle={selectedProject.project.title}
          onClose={() => setSelectedProject(null)}
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
