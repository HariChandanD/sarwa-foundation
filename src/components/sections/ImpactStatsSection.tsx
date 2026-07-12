'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, Home, Award, TrendingUp, Shield } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  color?: string;
}

interface ImpactStatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    icon: Heart,
    value: 10000,
    suffix: '+',
    label: 'Animals Rescued',
    description: 'Lives saved and rehabilitated',
    color: 'text-red-500',
  },
  {
    icon: Home,
    value: 5000,
    suffix: '+',
    label: 'Successful Adoptions',
    description: 'Forever homes found',
    color: 'text-blue-500',
  },
  {
    icon: Users,
    value: 2500,
    suffix: '+',
    label: 'Active Volunteers',
    description: 'Dedicated community members',
    color: 'text-green-500',
  },
  {
    icon: Shield,
    value: 50,
    suffix: '+',
    label: 'Rescue Centers',
    description: 'Across the country',
    color: 'text-purple-500',
  },
  {
    icon: Award,
    value: 15000,
    suffix: '+',
    label: 'Medical Treatments',
    description: 'Veterinary care provided',
    color: 'text-orange-500',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Success Rate',
    description: 'Recovery and rehoming',
    color: 'text-teal-500',
  },
];

function CountUpAnimation({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactStatsSection({
  title = 'Our Impact in Numbers',
  subtitle = "Together, we're making a real difference in the lives of animals",
  stats = defaultStats,
  className,
}: ImpactStatsSectionProps) {
  return (
    <section
      className={cn('bg-gradient-to-b from-gray-50 to-white py-20', className)}
    >
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                  {/* Icon */}
                  <div
                    className={cn(
                      'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl',
                      'bg-gradient-to-br from-primary/10 to-primary/5',
                      'transition-transform duration-300 group-hover:scale-110'
                    )}
                  >
                    <Icon
                      className={cn('h-8 w-8', stat.color || 'text-primary')}
                    />
                  </div>

                  {/* Value */}
                  <div className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                    <CountUpAnimation
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  {stat.description && (
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  )}

                  {/* Decorative Element */}
                  <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent transition-transform duration-300 group-hover:scale-110" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-gray-600">
            Want to be part of these numbers? Join our mission today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/donate"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90"
            >
              <Heart className="mr-2 h-5 w-5" />
              Make a Donation
            </a>
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-primary/5"
            >
              <Users className="mr-2 h-5 w-5" />
              Become a Volunteer
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Made with Bob
