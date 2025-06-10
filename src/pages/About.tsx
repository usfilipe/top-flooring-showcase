
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Home, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Top Flooring Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A family-owned flooring company dedicated to bringing quality craftsmanship 
              and exceptional customer service to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded over 15 years ago, Top Flooring Services has been serving the community 
                  with premium flooring solutions. What started as a small family business has grown 
                  into a trusted name in the flooring industry, while maintaining our core values 
                  of quality, integrity, and customer satisfaction.
                </p>
                <p>
                  As a licensed and family-owned business, we understand the importance of treating 
                  your home with the same care and attention we would give our own. Every project, 
                  big or small, receives our full commitment to excellence.
                </p>
                <p>
                  Our team of skilled craftsmen brings years of experience and expertise to every 
                  installation, ensuring that your flooring not only looks beautiful but stands 
                  the test of time.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80"
                alt="Professional flooring installation"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center h-full">
              <CardContent className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Licensed & Professional</h3>
                <p className="text-gray-600">
                  We are fully licensed and insured, giving you confidence and protection 
                  with every project we undertake.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardContent className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Family-Owned</h3>
                <p className="text-gray-600">
                  As a family business, we treat every customer like family and every 
                  home like our own, ensuring personal attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardContent className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-amber-700">★</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We're not finished until you're 
                  completely happy with the results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=600&q=80"
                alt="Quality flooring work"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                15+ Years of Excellence
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  With over 15 years in the flooring industry, we've completed hundreds 
                  of successful projects across residential and commercial properties. 
                  Our experience spans all types of flooring materials and installation techniques.
                </p>
                <p>
                  We stay current with the latest industry trends, materials, and installation 
                  methods to ensure that our customers receive the best possible results. 
                  Our commitment to continuous learning and improvement sets us apart.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">100%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Experience the difference that comes with working with a trusted, 
            family-owned flooring company.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5 mr-2" />
              Get Your Free Estimate
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
