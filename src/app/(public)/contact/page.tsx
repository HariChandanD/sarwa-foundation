import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { Container } from "@/components/layout/Container";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact Us - Sarwa Foundation",
  description: "Get in touch with Sarwa Foundation. Reach out for rescue emergencies, adoption inquiries, volunteer opportunities, or general questions.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Emergency Helpline",
    details: ["24/7 Rescue: 1800-XXX-XXXX", "WhatsApp: +91 98765 43210"],
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["General: contact@sarwafoundation.org", "Adoptions: adopt@sarwafoundation.org"],
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Rescue Street, Animal Welfare Complex", "Mumbai, Maharashtra 400001"],
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "rescue", label: "Emergency Rescue" },
  { value: "adoption", label: "Adoption Inquiry" },
  { value: "volunteer", label: "Volunteer Opportunity" },
  { value: "donation", label: "Donation & Sponsorship" },
  { value: "media", label: "Media & Press" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "complaint", label: "Complaint or Feedback" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Get in Touch"
        subtitle="Have questions? Need help? Want to get involved? We're here to help and would love to hear from you."
        primaryCTA={{ text: "Emergency Rescue", href: "tel:1800-XXX-XXXX" }}
        secondaryCTA={{ text: "Send Message", href: "#contact-form" }}
      />

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Reach Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multiple ways to connect with us. Choose what works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${info.bgColor} mb-4`}>
                    <Icon className={`h-6 w-6 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Emergency Animal Rescue
                </h3>
                <p className="text-gray-700 mb-3">
                  If you've found an injured or distressed animal that needs immediate help, please call our 24/7 emergency helpline:
                </p>
                <a
                  href="tel:1800-XXX-XXXX"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1800-XXX-XXXX
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24-48 hours.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Form */}
              <div className="md:col-span-2">
                <form className="space-y-6 bg-white rounded-2xl p-8 shadow-md">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <select
                      id="department"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="Brief subject of your message" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" className="mt-1" required />
                    <Label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to be contacted by Sarwa Foundation regarding my inquiry and understand that my information will be handled according to the privacy policy.
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "Adoption Process", href: "/adoption" },
                      { label: "Volunteer Application", href: "/volunteer" },
                      { label: "Donation Options", href: "/donate" },
                      { label: "FAQs", href: "/faq" },
                      { label: "Our Programs", href: "/programs" },
                    ].map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Follow Us
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Stay updated with our latest rescues and success stories on social media.
                  </p>
                  <div className="flex gap-3">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                        aria-label={platform}
                      >
                        {platform[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Shelter
            </h2>
            <p className="text-lg text-gray-600">
              Come visit us and meet the animals. Volunteers and visitors are always welcome!
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">
                123 Rescue Street, Animal Welfare Complex, Mumbai 400001
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
