// Generated Landing Page

import React from 'react';
import HeroSplit0 from './components/HeroSplit0';
import FeatureGrid1 from './components/FeatureGrid1';
import PricingTable2 from './components/PricingTable2';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSplit0 {...{
  headline: "FlowPilot: Automate workflows, reporting, and handoffs",
  subheadline: "A SaaS platform for product & operations teams to eliminate manual busywork—turning requests into tracked, automated processes in minutes.",
  ctaText: "Start a free trial",
  ctaLink: "#pricing",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
  features: [
    "No-code workflow builder with templates",
    "Real-time dashboards & SLA tracking",
    "Integrations with Slack, Jira, and Google Workspace"
  ],
  colorScheme: "indigo"
}} />
      <FeatureGrid1 {...{
  title: "Three ways FlowPilot saves your team hours every week",
  features: [
    {
      title: "Automate repetitive work",
      description: "Route requests, approvals, and handoffs with rules, forms, and triggers—no engineering tickets required.",
      icon: "rocket"
    },
    {
      title: "Stay on top of every SLA",
      description: "Track status, owners, and deadlines in one place with dashboards, alerts, and escalation paths.",
      icon: "speed"
    },
    {
      title: "Connect your existing tools",
      description: "Sync updates across Slack, Jira, Google Sheets, and email so work moves forward without copy/paste.",
      icon: "🔌"
    }
  ],
  columns: "2",
  colorScheme: "slate",
  style: "cards"
}} />
      <PricingTable2 {...{
  title: "Pricing that scales with your team",
  tiers: [
    {
      name: "Starter",
      price: "$19",
      period: "per user / month",
      features: [
        "Unlimited workflows",
        "Up to 3 integrations",
        "Basic analytics",
        "Email support"
      ],
      highlighted: false,
      ctaText: "Start Starter"
    },
    {
      name: "Team",
      price: "$39",
      period: "per user / month",
      features: [
        "Everything in Starter",
        "Unlimited integrations",
        "Advanced analytics & SLA dashboards",
        "Approvals & role-based access",
        "Priority support"
      ],
      highlighted: true,
      ctaText: "Start Team"
    },
    {
      name: "Business",
      price: "$79",
      period: "per user / month",
      features: [
        "Everything in Team",
        "SSO/SAML",
        "Audit logs & admin controls",
        "Custom data retention",
        "Dedicated onboarding"
      ],
      highlighted: false,
      ctaText: "Contact sales"
    }
  ],
  colorScheme: "indigo",
  layout: "cards"
}} />
    </div>
  );
}
