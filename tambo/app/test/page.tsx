'use client';

import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PricingTable from '@/components/landing/PricingTable';
import CallToAction from '@/components/landing/CallToAction';

export default function TestPage() {
  // Test data with minimal props
  const heroProps = {
    headline: "Test Hero",
    subheadline: "Test subheadline",
    ctaText: "Test CTA"
  };

  const featureProps = {
    features: [
      { title: "Feature 1", description: "Description 1" },
      { title: "Feature 2", description: "Description 2" }
    ]
  };

  const pricingProps = {
    tiers: [
      {
        name: "Basic",
        price: "$9",
        features: ["Feature 1", "Feature 2"]
      }
    ]
  };

  const ctaProps = {
    headline: "Test CTA",
    primaryButton: { text: "Get Started" }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Component Test Page</h1>
        
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <HeroSection {...heroProps} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Feature Grid</h2>
            <FeatureGrid {...featureProps} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pricing Table</h2>
            <PricingTable {...pricingProps} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Call to Action</h2>
            <CallToAction {...ctaProps} />
          </div>
        </div>
      </div>
    </div>
  );
}