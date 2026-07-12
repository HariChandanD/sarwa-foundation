'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

interface HeroSectionProps {
  variant?: 'homepage' | 'campaign' | 'about';
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export function HeroSection({
  variant: _variant = 'homepage',
  title = 'Every Life Deserves Love and Care',
  subtitle = 'Join us in our mission to rescue, rehabilitate, and rehome animals in need',
  description,
  primaryCTA = { text: 'Donate Now', href: '/donate' },
  secondaryCTA = { text: 'Learn More', href: '/about' },
  backgroundImage = '/images/hero-bg.jpg',
  stats,
}: HeroSectionProps) {
  const defaultStats = [
    { value: '10,000+', label: 'Animals Rescued' },
    { value: '5,000+', label: 'Successful Adoptions' },
    { value: '50+', label: 'Rescue Centers' },
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000" />
        </div>
      </div>

      <Container className="relative z-20 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">
                Making a Difference Since 2010
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl"
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 max-w-2xl text-base text-white/80"
              >
                {description}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="h-auto bg-white px-8 py-6 text-lg text-primary hover:bg-white/90"
                asChild
              >
                <a href={primaryCTA.href}>
                  <Heart className="mr-2 h-5 w-5" />
                  {primaryCTA.text}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto border-white px-8 py-6 text-lg text-white hover:bg-white/10"
                asChild
              >
                <a href={secondaryCTA.href}>
                  {secondaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-12"
            >
              {displayStats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="mb-1 text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm" />
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-48 w-48 text-white/30" />
              </div>
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-6 -top-6 rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Rescue Helpline</div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">Transparent</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2"
        >
          <div className="h-2 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Made with Bob
