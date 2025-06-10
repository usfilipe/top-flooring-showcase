
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "hardwood", name: "Hardwood" },
    { id: "vinyl", name: "Vinyl & Laminate" },
    { id: "tile", name: "Tile & Stone" },
    { id: "refinishing", name: "Refinishing" }
  ];

  const projects = [
    {
      id: 1,
      title: "Modern Living Room Hardwood",
      category: "hardwood",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      description: "Beautiful oak hardwood flooring installation in a contemporary living space."
    },
    {
      id: 2,
      title: "Kitchen Tile Installation",
      category: "tile",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      description: "Elegant ceramic tile flooring with custom pattern design."
    },
    {
      id: 3,
      title: "Luxury Vinyl Plank Bedroom",
      category: "vinyl",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      description: "Water-resistant luxury vinyl plank flooring in master bedroom."
    },
    {
      id: 4,
      title: "Hardwood Floor Refinishing",
      category: "refinishing",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80",
      description: "Complete refinishing of existing hardwood floors with modern stain."
    },
    {
      id: 5,
      title: "Open Concept Hardwood",
      category: "hardwood",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      description: "Seamless hardwood installation throughout open floor plan."
    },
    {
      id: 6,
      title: "Bathroom Tile Work",
      category: "tile",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
      description: "Waterproof tile installation with custom mosaic accents."
    }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
            {categories.map((category) => (
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
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {project.title}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {project.description}
                      </p>
                      <p className="text-sm text-gray-500 mb-6">
                        This project showcases our attention to detail and commitment to quality. 
                        Every installation is completed with precision and care, ensuring long-lasting 
                        beauty and durability.
                      </p>
                      <Button
                        asChild
                        className="bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Link to="/contact">
                          <Phone className="w-4 h-4 mr-2" />
                          Get Similar Quote
                        </Link>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

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
