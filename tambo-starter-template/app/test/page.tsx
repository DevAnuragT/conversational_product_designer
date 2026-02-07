'use client';

import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PricingTable from '@/components/landing/PricingTable';
import CallToAction from '@/components/landing/CallToAction';

export default function TestPage() {
  // Test data with better content
  const heroProps = {
    headline: "Transform Your Business Today",
    subheadline: "Experience the power of modern solutions designed to accelerate your growth",
    ctaText: "Start Free Trial"
  };

  const featureProps = {
    title: "Why Choose Us",
    features: [
      { 
        title: "Lightning Fast", 
        description: "Built for speed and performance with cutting-edge technology",
        icon: "⚡"
      },
      { 
        title: "Secure & Reliable", 
        description: "Enterprise-grade security with 99.9% uptime guarantee",
        icon: "🔒"
      },
      { 
        title: "Easy Integration", 
        description: "Seamlessly integrate with your existing tools and workflows",
        icon: "🔗"
      }
    ]
  };

  const pricingProps = {
    title: "Choose Your Plan",
    tiers: [
      {
        name: "Starter",
        price: "$9",
        period: "month",
        features: ["Up to 5 projects", "Basic support", "1GB storage"],
        highlighted: false,
        ctaText: "Get Started"
      },
      {
        name: "Professional",
        price: "$29",
        period: "month", 
        features: ["Unlimited projects", "Priority support", "10GB storage", "Advanced analytics"],
        highlighted: true,
        ctaText: "Start Free Trial"
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "month",
        features: ["Everything in Pro", "Custom integrations", "Unlimited storage", "24/7 phone support"],
        highlighted: false,
        ctaText: "Contact Sales"
      }
    ]
  };

  const ctaProps = {
    headline: "Ready to Get Started?",
    description: "Join thousands of satisfied customers who trust our platform",
    primaryButton: { text: "Start Your Journey" },
    secondaryButton: { text: "Learn More" }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-0">
        <HeroSection {...heroProps} />
        <FeatureGrid {...featureProps} />
        <PricingTable {...pricingProps} />
        <CallToAction {...ctaProps} />
      </div>
    </div>
  );
}