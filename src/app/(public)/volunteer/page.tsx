import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { Container } from "@/components/layout/Container";
import { Heart, Users, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Volunteer - Sarwa Foundation",
  description: "Join Sarwa Foundation's volunteer community and make a hands-on difference in animal welfare. Various opportunities available for all skill levels.",
};

const volunteerRoles = [
  {
    title: "Animal Care Volunteer",
    description: "Help with daily care, feeding, grooming, and socializing rescued animals at our shelters.",
    commitment: "4-8 hours/week",
    skills: "Love for animals, patience, physical fitness",
    icon: Heart,
  },
  {
    title: "Rescue Team Member",
    description: "Join our emergency response team to rescue animals in distress across the city.",
    commitment: "On-call basis",
    skills: "Quick response, physical fitness, vehicle preferred",
    icon: Users,
  },
  {
    title: "Foster Parent",
    description: "Provide temporary home care for animals recovering from trauma or awaiting adoption.",
    commitment: "Flexible duration",
    skills: "Safe home environment, time commitment",
    icon: Heart,
  },
  {
    title: "Event Coordinator",
    description: "Help organize adoption drives, fundraising events, and awareness campaigns.",
    commitment: "10-15 hours/month",
    skills: "Organization, communication, creativity",
    icon: Calendar,
  },
  {
    title: "Social Media Volunteer",
    description: "Create content, manage social media, and help spread awareness about our cause.",
    commitment: "5-10 hours/week",
    skills: "Social media, content creation, design",
    icon: Users,
  },
  {
    title: "Administrative Support",
    description: "Assist with paperwork, data entry, donor management, and office tasks.",
    commitment: "8-12 hours/week",
    skills: "Computer skills, attention to detail",
    icon: Clock,
  },
];

export default function VolunteerPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Volunteer With Us"
        subtitle="Join our community of passionate volunteers making a real difference in the lives of animals. Your time and skills can save lives."
        primaryCTA={{ text: "Apply Now", href: "#application" }}
        secondaryCTA={{ text: "Learn More", href: "#roles" }}
      />

      {/* Why Volunteer */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Volunteer With Sarwa Foundation?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Volunteering is more than just giving your time—it's about being part of a compassionate community and making a tangible impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Make Real Impact",
                description: "See the direct results of your efforts in the lives you help save and transform.",
              },
              {
                title: "Learn & Grow",
                description: "Gain valuable skills, experience, and knowledge about animal welfare and care.",
              },
              {
                title: "Join Community",
                description: "Connect with like-minded people who share your passion for animal welfare.",
              },
              {
                title: "Flexible Commitment",
                description: "Choose roles and schedules that fit your availability and lifestyle.",
              },
              {
                title: "Professional Development",
                description: "Build your resume with meaningful volunteer experience and references.",
              },
              {
                title: "Personal Fulfillment",
                description: "Experience the joy and satisfaction of making a difference every day.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Volunteer Roles */}
      <section id="roles" className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have diverse roles to match your skills, interests, and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        <strong>Commitment:</strong> {role.commitment}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        <strong>Skills:</strong> {role.skills}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Volunteer Application
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 48 hours.
              </p>
            </div>

            <form className="space-y-6 bg-gray-50 rounded-2xl p-8">
              {/* Personal Information */}
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="Mumbai" required />
              </div>

              {/* Volunteer Preferences */}
              <div>
                <Label htmlFor="role">Preferred Volunteer Role *</Label>
                <select
                  id="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select a role</option>
                  {volunteerRoles.map((role, index) => (
                    <option key={index} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="availability">Availability *</Label>
                <select
                  id="availability"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both Weekdays & Weekends</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="experience">Previous Experience with Animals</Label>
                <Textarea
                  id="experience"
                  placeholder="Tell us about any previous experience you have with animals or volunteering..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="motivation">Why do you want to volunteer with us? *</Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation and what you hope to contribute..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to undergo a background check and commit to the volunteer guidelines and code of conduct.
                </Label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                <Heart className="mr-2 h-5 w-5" />
                Submit Application
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hear From Our Volunteers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Animal Care Volunteer",
                quote: "Volunteering at Sarwa Foundation has been the most rewarding experience. Seeing animals recover and find homes is priceless.",
              },
              {
                name: "Rahul Mehta",
                role: "Rescue Team Member",
                quote: "Being part of the rescue team has taught me so much about compassion and quick thinking. Every rescue is a new adventure.",
              },
              {
                name: "Anjali Patel",
                role: "Foster Parent",
                quote: "Fostering has brought so much joy to my life. Watching animals heal and thrive in a home environment is beautiful.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
