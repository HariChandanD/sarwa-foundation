import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog - Sarwa Society for Animal Welfare',
  description:
    'Read the latest news, stories, and insights about animal welfare from Sarwa Society for Animal Welfare. Stay updated on our rescue operations and success stories.',
};

const blogPosts = [
  {
    id: 1,
    title:
      'Understanding Street Animal Behavior: A Guide for Compassionate Citizens',
    excerpt:
      'Learn how to safely interact with street animals and understand their behavior patterns. This guide helps you become a more compassionate community member.',
    author: 'Dr. Priya Sharma',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Education',
    tags: ['Animal Behavior', 'Community', 'Safety'],
    featured: true,
  },
  {
    id: 2,
    title: 'The Importance of Sterilization: Controlling Population Humanely',
    excerpt:
      'Discover why sterilization is the most effective and humane method for controlling street animal populations and preventing suffering.',
    author: 'Dr. Rahul Mehta',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Veterinary Care',
    tags: ['Sterilization', 'Population Control', 'Health'],
    featured: false,
  },
  {
    id: 3,
    title:
      'Success Story: How Community Support Saved 50 Animals During Floods',
    excerpt:
      'Read about our emergency response during the recent floods and how community volunteers made all the difference in saving lives.',
    author: 'Anjali Patel',
    date: '2024-01-10',
    readTime: '10 min read',
    category: 'Rescue Stories',
    tags: ['Emergency Response', 'Community', 'Success Story'],
    featured: true,
  },
  {
    id: 4,
    title: 'Preparing Your Home for a New Pet: Essential Checklist',
    excerpt:
      "Planning to adopt? Here's everything you need to know about preparing your home for a new furry family member.",
    author: 'Meera Singh',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Adoption',
    tags: ['Adoption', 'Pet Care', 'Home Preparation'],
    featured: false,
  },
  {
    id: 5,
    title:
      'The Hidden Costs of Pet Ownership: Budgeting for Your Animal Companion',
    excerpt:
      'Understanding the financial commitment of pet ownership helps ensure you can provide the best care for your animal throughout their life.',
    author: 'Vikram Desai',
    date: '2024-01-05',
    readTime: '9 min read',
    category: 'Pet Care',
    tags: ['Pet Ownership', 'Budgeting', 'Responsibility'],
    featured: false,
  },
  {
    id: 6,
    title: 'Volunteer Spotlight: Meet the Heroes Behind Our Rescue Operations',
    excerpt:
      'Get to know the dedicated volunteers who work tirelessly to rescue and rehabilitate animals in need.',
    author: 'Sarwa Society for Animal Welfare Team',
    date: '2024-01-03',
    readTime: '5 min read',
    category: 'Volunteers',
    tags: ['Volunteers', 'Team', 'Inspiration'],
    featured: false,
  },
];

const categories = [
  'All',
  'Education',
  'Veterinary Care',
  'Rescue Stories',
  'Adoption',
  'Pet Care',
  'Volunteers',
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Our Blog"
        subtitle="Stay informed with the latest news, stories, and insights from the world of animal welfare"
        primaryCTA={{ text: 'Subscribe to Newsletter', href: '#newsletter' }}
        secondaryCTA={{ text: 'Share Your Story', href: '/contact' }}
      />

      {/* Category Filter */}
      <section className="border-b bg-white py-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="bg-gray-50 py-20">
        <Container>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Featured Articles
          </h2>
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>

                    <p className="mb-4 line-clamp-3 text-gray-600">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center font-medium text-primary transition-all hover:gap-2"
                    >
                      Read Full Article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
          </div>

          {/* All Posts */}
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />

                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>

                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary transition-all hover:gap-2"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </article>
              ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90">
              Load More Articles
            </button>
          </div>
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section
        id="newsletter"
        className="bg-gradient-to-br from-primary to-secondary py-20 text-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Get the latest rescue stories, animal welfare tips, and updates
              delivered to your inbox every month.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-6 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-white/70">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
