"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Home, Award, TrendingUp, Shield } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

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
    suffix: "+",
    label: "Animals Rescued",
    description: "Lives saved and rehabilitated",
    color: "text-red-500",
  },
  {
    icon: Home,
    value: 5000,
    suffix: "+",
    label: "Successful Adoptions",
    description: "Forever homes found",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: 2500,
    suffix: "+",
    label: "Active Volunteers",
    description: "Dedicated community members",
    color: "text-green-500",
  },
  {
    icon: Shield,
    value: 50,
    suffix: "+",
    label: "Rescue Centers",
    description: "Across the country",
    color: "text-purple-500",
  },
  {
    icon: Award,
    value: 15000,
    suffix: "+",
    label: "Medical Treatments",
    description: "Veterinary care provided",
    color: "text-orange-500",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Recovery and rehoming",
    color: "text-teal-500",
  },
];

function CountUpAnimation({ 
  end, 
  duration = 2000,
  prefix = "",
  suffix = "" 
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
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function ImpactStatsSection({
  title = "Our Impact in Numbers",
  subtitle = "Together, we're making a real difference in the lives of animals",
  stats = defaultStats,
  className,
}: ImpactStatsSectionProps) {
  return (
    <section className={cn("py-20 bg-gradient-to-b from-gray-50 to-white", className)}>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Icon */}
                  <div className={cn(
                    "inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6",
                    "bg-gradient-to-br from-primary/10 to-primary/5",
                    "group-hover:scale-110 transition-transform duration-300"
                  )}>
                    <Icon className={cn("h-8 w-8", stat.color || "text-primary")} />
                  </div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    <CountUpAnimation
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  {stat.description && (
                    <p className="text-sm text-gray-600">
                      {stat.description}
                    </p>
                  )}

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -z-10 group-hover:scale-110 transition-transform duration-300" />
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
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to be part of these numbers? Join our mission today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Heart className="mr-2 h-5 w-5" />
              Make a Donation
            </a>
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
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
