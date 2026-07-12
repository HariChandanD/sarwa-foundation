"use client";

import { motion } from "framer-motion";
import { Heart, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  currency?: string;
  urgency?: "low" | "medium" | "high" | "critical";
  status?: "active" | "completed" | "upcoming";
  daysLeft?: number;
  donorCount?: number;
  slug: string;
  featured?: boolean;
  className?: string;
}

const urgencyConfig = {
  low: { color: "bg-blue-500", label: "Ongoing" },
  medium: { color: "bg-yellow-500", label: "Important" },
  high: { color: "bg-orange-500", label: "Urgent" },
  critical: { color: "bg-red-500", label: "Critical" },
};

const statusConfig = {
  active: { color: "bg-green-500", label: "Active" },
  completed: { color: "bg-gray-500", label: "Completed" },
  upcoming: { color: "bg-blue-500", label: "Coming Soon" },
};

export function CampaignCard({
  id,
  title,
  description,
  image,
  goalAmount,
  raisedAmount,
  currency = "₹",
  urgency = "medium",
  status = "active",
  daysLeft,
  donorCount,
  slug,
  featured = false,
  className,
}: CampaignCardProps) {
  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100);
  const urgencyInfo = urgencyConfig[urgency];
  const statusInfo = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300",
        featured && "ring-2 ring-primary ring-offset-4",
        className
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-primary text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Urgency & Status Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {status !== "active" && (
            <Badge className={cn("text-white", statusInfo.color)}>
              {statusInfo.label}
            </Badge>
          )}
          {urgency !== "low" && status === "active" && (
            <Badge className={cn("text-white", urgencyInfo.color)}>
              {urgencyInfo.label}
            </Badge>
          )}
        </div>

        {/* Days Left */}
        {daysLeft !== undefined && daysLeft > 0 && status === "active" && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-900">
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {progressPercentage.toFixed(0)}% funded
            </span>
            <span className="text-sm text-gray-500">
              {currency}{raisedAmount.toLocaleString()} raised
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {currency}{goalAmount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Goal</div>
          </div>
          {donorCount !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {donorCount}
              </div>
              <div className="text-xs text-gray-500">Donors</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={`/donate?campaign=${id}`}>
              <Heart className="mr-2 h-4 w-4" />
              Donate Now
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
            asChild
          >
            <a href={`/campaigns/${slug}`}>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Made with Bob
