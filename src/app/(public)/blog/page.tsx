import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { Container } from "@/components/layout/Container";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog - Sarwa Foundation",
  description: "Read the latest news, stories, and insights about animal welfare from Sarwa Foundation. Stay updated on our rescue operations and success stories.",
};

const blogPosts = [
  {
    id: 1,
    title: "Understanding Street Animal Behavior: A Guide for Compassionate Citizens",
    excerpt: "Learn how to safely interact with street animals and understand their behavior patterns. This guide helps you become a more compassionate community member.",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Education",
    tags: ["Animal Behavior", "Community", "Safety"],
    featured: true,
  },
  {
    id: 2,
    title: "The Importance of Sterilization: Controlling Population Humanely",
    excerpt: "Discover why sterilization is the most effective and humane method for controlling street animal populations and preventing suffering.",
    author: "Dr. Rahul Mehta",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Veterinary Care",
    tags: ["Sterilization", "Population Control", "Health"],
    featured: false,
  },
  {
    id: 3,
    title: "Success Story: How Community Support Saved 50 Animals During Floods",
    excerpt: "Read about our emergency response during the recent floods and how community volunteers made all the difference in saving lives.",
    author: "Anjali Patel",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Rescue Stories",
    tags: ["Emergency Response", "Community", "Success Story"],
    featured: true,
  },
  {
    id: 4,
    title: "Preparing Your Home for a New Pet: Essential Checklist",
    excerpt: "Planning to adopt? Here's everything you need to know about preparing your home for a new furry family member.",
    author: "Meera Singh",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Adoption",
    tags: ["Adoption", "Pet Care", "Home Preparation"],
    featured: false,
  },
  {
    id: 5,
    title: "The Hidden Costs of Pet Ownership: Budgeting for Your Animal Companion",
    excerpt: "Understanding the financial commitment of pet ownership helps ensure you can provide the best care for your animal throughout their life.",
    author: "Vikram Desai",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Pet Care",
    tags: ["Pet Ownership", "Budgeting", "Responsibility"],
    featured: false,
  },
  {
    id: 6,
    title: "Volunteer Spotlight: Meet the Heroes Behind Our Rescue Operations",
    excerpt: "Get to know the dedicated volunteers who work tirelessly to rescue and rehabilitate animals in need.",
    author: "Sarwa Foundation Team",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Volunteers",
    tags: ["Volunteers", "Team", "Inspiration"],
    featured: false,
  },
];

const categories = ["All", "Education", "Veterinary Care", "Rescue Stories", "Adoption", "Pet Care", "Volunteers"];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Our Blog"
        subtitle="Stay informed with the latest news, stories, and insights from the world of animal welfare"
        primaryCTA={{ text: "Subscribe to Newsletter", href: "#newsletter" }}
        secondaryCTA={{ text: "Share Your Story", href: "/contact" }}
      />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                    >
                      Read Full Article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
          </div>

          {/* All Posts */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />

                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
                      className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </article>
              ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Load More Articles
            </button>
          </div>
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get the latest rescue stories, animal welfare tips, and updates delivered to your inbox every month.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-white/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
