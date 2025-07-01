
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Hardwood Installation",
      description: "Professional installation of solid and engineered hardwood floors with precision and care.",
      features: [
        "Solid hardwood flooring",
        "Engineered hardwood systems",
        "Subfloor preparation",
        "Professional installation"
      ],
      image: "https://raw.githubusercontent.com/usfilipe/top-flooring-showcase/refs/heads/main/src/photos/services/hardwood.jpg"
    },
    {
      title: "Vinyl & Laminate Flooring",
      description: "Durable, water-resistant, and beautiful vinyl and laminate solutions for any room.",
      features: [
        "Luxury vinyl plank (LVP)",
        "Luxury vinyl tile (LVT)",
        "Laminate flooring installation",
        "Waterproof options available",
        "Wide variety of styles and colors"
      ],
      image: "https://raw.githubusercontent.com/usfilipe/top-flooring-showcase/refs/heads/main/src/photos/services/vinyl.jpg"
    },
    {
      title: "Tile & Stone Installation",
      description: "Expert installation of ceramic, porcelain, and natural stone tiles for lasting beauty.",
      features: [
        "Ceramic and porcelain tile",
        "Natural stone installation",
        "Custom patterns and layouts",
        "Waterproofing and sealing",
        "Grout and caulk finishing"
      ],
      image: "https://raw.githubusercontent.com/usfilipe/top-flooring-showcase/refs/heads/main/src/photos/services/tile.jpg"
    },
    {
      title: "Demolition Services",
      description: "Professional demolition and removal services to prepare your space for new flooring.",
      features: [
        "Safe floor removal",
        "Debris cleanup and disposal",
        "Subfloor assessment",
        "Site preparation",
        "Environmental safety compliance"
      ],
      image: "https://raw.githubusercontent.com/usfilipe/top-flooring-showcase/refs/heads/main/src/photos/services/demolition.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Flooring Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive flooring solutions from installation to demolition, 
              backed by 8+ years of experience and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                  >
                    <Link to="/contact">
                      <Phone className="w-4 h-4 mr-2" />
                      Get Quote for This Service
                    </Link>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              From consultation to completion, we ensure a smooth and professional experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Free in-home consultation to assess your needs and provide detailed estimates."
              },
              {
                step: "2",
                title: "Planning",
                description: "Design planning and material selection with expert guidance on the best options."
              },
              {
                step: "3",
                title: "Installation",
                description: "Professional installation by our skilled craftsmen using quality materials."
              },
              {
                step: "4",
                title: "Completion",
                description: "Final walkthrough and cleanup, ensuring your complete satisfaction."
              }
            ].map((process, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600">
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Contact us today for a free consultation and see how we can transform your space.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
