
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Users, Home } from "lucide-react";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  const services = [
    {
      title: "Hardwood Installation",
      description: "Expert installation of solid and engineered hardwood floors with premium finishes.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Vinyl & Laminate",
      description: "Durable and beautiful vinyl and laminate flooring solutions for any space.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Tile & Stone",
      description: "Professional tile and stone installation for kitchens, bathrooms, and more.",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Demolition Services",
      description: "Professional demolition and removal services to prepare your space for new flooring.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <section 
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://raw.githubusercontent.com/usfilipe/top-flooring-showcase/refs/heads/main/src/photos/F3/IMG-20250616-WA0078.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Flooring
              <span className="text-amber-400 block">Solutions</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Licensed, family-owned flooring company with 8+ years of experience. 
              We specialize in hardwood, laminate, vinyl, tile installation, and demolition services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
              >
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-white"
              >
                <Link to="/gallery">
                  <Home className="w-5 h-5 mr-2" />
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed and insured for your peace of mind and protection.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family-Owned</h3>
              <p className="text-gray-600">Family-owned business with a commitment to quality and customer satisfaction.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-700">8+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Years Experience</h3>
              <p className="text-gray-600">Over 8 years of experience in professional flooring installation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From hardwood installation to demolition services, we provide comprehensive flooring solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-amber-700 text-amber-700 hover:bg-amber-50"
                  >
                    <Link to="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Get your free estimate today and see why customers choose Top Flooring Services.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5 mr-2" />
              Get Your Free Quote
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
