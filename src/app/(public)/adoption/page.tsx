import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import { Heart, Check, AlertCircle, FileText, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Adopt a Pet - Sarwa Society for Animal Welfare',
  description:
    'Give a rescued animal a forever home. Browse our adoptable pets and find your perfect companion at Sarwa Society for Animal Welfare.',
};

const adoptablePets = [
  {
    id: 1,
    name: 'Bruno',
    species: 'Dog',
    breed: 'Labrador Mix',
    age: '2 years',
    gender: 'Male',
    size: 'Large',
    temperament: ['Friendly', 'Energetic', 'Good with kids'],
    medicalStatus: 'Vaccinated & Sterilized',
    story:
      "Bruno is a gentle giant who loves to play fetch and cuddle. He's great with children and other dogs.",
    image: '/images/animals/bruno.jpg',
    urgent: false,
  },
  {
    id: 2,
    name: 'Mittens',
    species: 'Cat',
    breed: 'Persian Mix',
    age: '1 year',
    gender: 'Female',
    size: 'Medium',
    temperament: ['Calm', 'Affectionate', 'Indoor cat'],
    medicalStatus: 'Vaccinated & Sterilized',
    story:
      'Mittens is a sweet, quiet cat who loves to nap in sunny spots and enjoys gentle petting.',
    image: '/images/animals/mittens.jpg',
    urgent: false,
  },
  {
    id: 3,
    name: 'Charlie',
    species: 'Dog',
    breed: 'Indie',
    age: '3 years',
    gender: 'Male',
    size: 'Medium',
    temperament: ['Loyal', 'Protective', 'Trained'],
    medicalStatus: 'Vaccinated & Sterilized',
    story:
      'Charlie is a smart, well-trained dog who makes an excellent companion and watchdog.',
    image: '/images/animals/charlie.jpg',
    urgent: true,
  },
  {
    id: 4,
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '6 months',
    gender: 'Female',
    size: 'Small',
    temperament: ['Playful', 'Curious', 'Social'],
    medicalStatus: 'Vaccinated',
    story:
      'Luna is a kitten full of energy and curiosity. She loves to explore and play with toys.',
    image: '/images/animals/luna-cat.jpg',
    urgent: false,
  },
  {
    id: 5,
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever Mix',
    age: '4 years',
    gender: 'Male',
    size: 'Large',
    temperament: ['Gentle', 'Patient', 'Family dog'],
    medicalStatus: 'Vaccinated & Sterilized',
    story:
      "Max is perfect for families. He's patient, loving, and great with children of all ages.",
    image: '/images/animals/max-dog.jpg',
    urgent: false,
  },
  {
    id: 6,
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle Mix',
    age: '1.5 years',
    gender: 'Female',
    size: 'Medium',
    temperament: ['Active', 'Friendly', 'Loves walks'],
    medicalStatus: 'Vaccinated & Sterilized',
    story:
      'Bella is an active dog who loves long walks and outdoor adventures. Perfect for active families.',
    image: '/images/animals/bella-dog.jpg',
    urgent: true,
  },
];

const adoptionProcess = [
  {
    step: 1,
    title: 'Browse & Select',
    description:
      'Browse our adoptable pets and find one that matches your lifestyle and preferences.',
    icon: Heart,
  },
  {
    step: 2,
    title: 'Submit Application',
    description:
      'Fill out our adoption application form with details about your home and experience.',
    icon: FileText,
  },
  {
    step: 3,
    title: 'Home Visit',
    description:
      'Our team will conduct a home visit to ensure a safe environment for the pet.',
    icon: Home,
  },
  {
    step: 4,
    title: 'Meet & Greet',
    description:
      'Spend time with your chosen pet to ensure compatibility and build a connection.',
    icon: Heart,
  },
  {
    step: 5,
    title: 'Adoption Day',
    description:
      'Complete the paperwork, receive care instructions, and welcome your new family member!',
    icon: Check,
  },
];

export default function AdoptionPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Find Your Perfect Companion"
        subtitle="Every pet deserves a loving home. Browse our adoptable animals and give a rescued pet a second chance at happiness."
        primaryCTA={{ text: 'View All Pets', href: '#pets' }}
        secondaryCTA={{ text: 'Adoption Process', href: '#process' }}
      />

      {/* Adoptable Pets */}
      <section id="pets" className="bg-white py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Meet Our Adoptable Pets
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              All our pets are vaccinated, sterilized, and ready for their
              forever homes. Each one has a unique personality waiting to
              brighten your life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {adoptablePets.map((pet) => (
              <div
                key={pet.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-primary/30" />
                  </div>
                  {pet.urgent && (
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-red-500 text-white">Urgent</Badge>
                    </div>
                  )}
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-white text-primary">
                      {pet.species}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {pet.name}
                      </h3>
                      <p className="text-gray-600">{pet.breed}</p>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Age:</span>
                      <span className="ml-2 font-medium">{pet.age}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-2 font-medium">{pet.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-2 font-medium">{pet.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 font-medium text-green-600">
                        Available
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 line-clamp-2 text-gray-600">{pet.story}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {pet.temperament.map((trait, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-4 flex items-center text-sm text-green-600">
                    <Check className="mr-1 h-4 w-4" />
                    {pet.medicalStatus}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Heart className="mr-2 h-4 w-4" />
                    Adopt {pet.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Adoption Process */}
      <section id="process" className="bg-gray-50 py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Adoption Process
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              We follow a careful process to ensure the best match between pets
              and families.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            {adoptionProcess.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="mb-8 flex gap-6 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl bg-white p-6 shadow-md">
                    <div className="mb-2 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Adoption Requirements
            </h2>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
              <div className="mb-6 flex items-start gap-3">
                <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    Before You Apply
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>Must be 21 years or older</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>
                        Have a stable living situation and landlord approval (if
                        renting)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>
                        Able to provide proper care, including food, shelter,
                        and medical needs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>All family members agree to the adoption</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>
                        Willing to provide updates and allow follow-up visits
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Adopt?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Start your adoption journey today and give a rescued animal the
              loving home they deserve.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Application
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Have Questions? Contact Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
