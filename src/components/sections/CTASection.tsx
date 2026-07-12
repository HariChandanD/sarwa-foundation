"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  variant?: "donate" | "volunteer" | "emergency" | "newsletter";
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
    icon?: React.ElementType;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    icon?: React.ElementType;
  };
  backgroundImage?: string;
  className?: string;
}

const variantConfig = {
  donate: {
    title: "Your Support Changes Lives",
    description: "Every donation helps us rescue, rehabilitate, and rehome animals in need. Join thousands of compassionate supporters making a difference.",
    primaryCTA: { text: "Donate Now", href: "/donate", icon: Heart },
    secondaryCTA: { text: "Become a Monthly Donor", href: "/donate?type=recurring", icon: ArrowRight },
    gradient: "from-primary via-primary/90 to-secondary",
  },
  volunteer: {
    title: "Join Our Community of Animal Lovers",
    description: "Make a hands-on difference in the lives of animals. Whether you have a few hours a week or want to foster, we need you.",
    primaryCTA: { text: "Volunteer Today", href: "/volunteer", icon: Heart },
    secondaryCTA: { text: "Learn About Fostering", href: "/foster", icon: ArrowRight },
    gradient: "from-green-600 via-green-500 to-teal-600",
  },
  emergency: {
    title: "Emergency Rescue Needed",
    description: "We have urgent cases requiring immediate medical attention. Your quick action can save lives today.",
    primaryCTA: { text: "Donate for Emergency", href: "/donate?campaign=emergency", icon: Heart },
    secondaryCTA: { text: "Call Rescue Helpline", href: "tel:1800-XXX-XXXX", icon: Phone },
    gradient: "from-red-600 via-red-500 to-orange-600",
  },
  newsletter: {
    title: "Stay Connected with Our Mission",
    description: "Get rescue updates, success stories, and ways to help delivered to your inbox every month.",
    primaryCTA: { text: "Subscribe Now", href: "#newsletter", icon: Mail },
    secondaryCTA: { text: "View Past Updates", href: "/blog", icon: ArrowRight },
    gradient: "from-blue-600 via-blue-500 to-indigo-600",
  },
};

export function CTASection({
  variant = "donate",
  title,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  className,
}: CTASectionProps) {
  const config = variantConfig[variant];
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalPrimaryCTA = primaryCTA || config.primaryCTA;
  const finalSecondaryCTA = secondaryCTA || config.secondaryCTA;

  const PrimaryIcon = finalPrimaryCTA.icon || Heart;
  const SecondaryIcon = finalSecondaryCTA?.icon || ArrowRight;

  return (
    <section className={cn("relative py-20 overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          config.gradient
        )} />
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {finalTitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            {finalDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-xl"
                asChild
              >
                <a href={finalPrimaryCTA.href}>
                  <PrimaryIcon className="mr-2 h-5 w-5" />
                  {finalPrimaryCTA.text}
                </a>
              </Button>
            </motion.div>

            {finalSecondaryCTA && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <a href={finalSecondaryCTA.href}>
                    {finalSecondaryCTA.text}
                    <SecondaryIcon className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Additional Info for Emergency Variant */}
          {variant === "emergency" && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <p className="text-white/90 text-sm mb-2">
                <strong>24/7 Emergency Helpline:</strong> 1800-XXX-XXXX
              </p>
              <p className="text-white/80 text-xs">
                For immediate rescue assistance, call our helpline anytime
              </p>
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>100% Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Tax Deductible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Secure Payments</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}

// Made with Bob
