
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting quote request:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-quote-request', {
        body: formData
      });

      if (error) {
        console.error("Error sending quote request:", error);
        throw error;
      }

      console.log("Quote request sent successfully:", data);

      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you within 24 hours to schedule your free consultation.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Failed to send quote request:", error);
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to transform your floors? Contact us today for a free consultation 
              and detailed estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">
                    Request Your Free Quote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">Service Needed</Label>
                      <Select onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hardwood">Hardwood Installation</SelectItem>
                          <SelectItem value="vinyl">Vinyl & Laminate</SelectItem>
                          <SelectItem value="tile">Tile & Stone</SelectItem>
                          <SelectItem value="demolition">Demolition Services</SelectItem>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your project - room size, preferred materials, timeline, etc."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Quote Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">(689) 255-7378</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">contact@topflooring.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Service Area</h4>
                    <p className="text-gray-600">Orlando-FL</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency</span>
                    <span className="text-gray-900">Open 24 Hours 7 days a week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Why Choose Us?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                      Licensed and fully insured
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                      15+ years of experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                      Family-owned business
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                      100% customer satisfaction
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-700 rounded-full mr-3"></div>
                      Free consultations and estimates
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Emergency Flooring Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We offer emergency flooring repairs and water damage restoration services.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call (808) 123-4567 Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
