/**
 * Industry-Specific Templates
 */

import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'saas-productivity',
    name: 'SaaS Productivity',
    industry: 'saas',
    description: 'Perfect for B2B SaaS products focused on productivity and collaboration',
    colorScheme: 'blue',
    components: [
      {
        type: 'HeroSection',
        props: {
          headline: 'Supercharge Your Team\'s Productivity',
          subheadline: 'Streamline workflows, collaborate seamlessly, and achieve more with our all-in-one productivity platform.',
          primaryButton: { text: 'Start Free Trial' },
          secondaryButton: { text: 'Watch Demo' },
          colorScheme: 'blue'
        }
      },
      {
        type: 'LogoCloud',
        props: {
          title: 'Trusted by leading companies',
          logos: [
            { name: 'TechCorp', url: '#' },
            { name: 'InnovateCo', url: '#' },
            { name: 'DataSystems', url: '#' },
            { name: 'CloudWorks', url: '#' }
          ]
        }
      },
      {
        type: 'FeatureGrid',
        props: {
          title: 'Everything you need to succeed',
          columns: '3',
          features: [
            {
              title: 'Real-time Collaboration',
              description: 'Work together seamlessly with your team in real-time, no matter where they are.',
              icon: '👥'
            },
            {
              title: 'Smart Automation',
              description: 'Automate repetitive tasks and focus on what matters most.',
              icon: '⚡'
            },
            {
              title: 'Advanced Analytics',
              description: 'Get insights into your team\'s performance with powerful analytics.',
              icon: '📊'
            }
          ]
        }
      },
      {
        type: 'PricingTable',
        props: {
          title: 'Simple, transparent pricing',
          tiers: [
            {
              name: 'Starter',
              price: '$29',
              period: 'month',
              features: ['Up to 10 users', 'Basic features', 'Email support', '5GB storage'],
              ctaText: 'Start Free Trial'
            },
            {
              name: 'Professional',
              price: '$99',
              period: 'month',
              highlighted: true,
              features: ['Up to 50 users', 'Advanced features', 'Priority support', '50GB storage', 'Custom integrations'],
              ctaText: 'Start Free Trial'
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              features: ['Unlimited users', 'All features', '24/7 support', 'Unlimited storage', 'Dedicated account manager'],
              ctaText: 'Contact Sales'
            }
          ]
        }
      },
      {
        type: 'CallToAction',
        props: {
          headline: 'Ready to transform your workflow?',
          description: 'Join thousands of teams already using our platform to achieve more.',
          primaryButton: { text: 'Start Free Trial' },
          secondaryButton: { text: 'Schedule Demo' }
        }
      }
    ]
  },
  {
    id: 'ecommerce-fashion',
    name: 'E-commerce Fashion',
    industry: 'ecommerce',
    description: 'Designed for online fashion and retail stores',
    colorScheme: 'purple',
    components: [
      {
        type: 'HeroSplit',
        props: {
          headline: 'Discover Your Style',
          subheadline: 'Curated fashion collections for the modern wardrobe. Free shipping on orders over $50.',
          primaryButton: { text: 'Shop Now' },
          secondaryButton: { text: 'View Collections' },
          colorScheme: 'purple'
        }
      },
      {
        type: 'Stats',
        props: {
          title: 'Why customers love us',
          stats: [
            { value: '50K+', label: 'Happy Customers', description: 'Worldwide' },
            { value: '4.9/5', label: 'Customer Rating', description: 'Based on 10K+ reviews' },
            { value: '24/7', label: 'Customer Support', description: 'Always here to help' }
          ]
        }
      },
      {
        type: 'FeatureList',
        props: {
          title: 'Shopping made simple',
          features: [
            {
              title: 'Free Shipping',
              description: 'On all orders over $50. Fast delivery to your doorstep.',
              icon: '🚚'
            },
            {
              title: 'Easy Returns',
              description: '30-day return policy. No questions asked.',
              icon: '↩️'
            },
            {
              title: 'Secure Checkout',
              description: 'Your payment information is always protected.',
              icon: '🔒'
            }
          ]
        }
      },
      {
        type: 'Testimonials',
        props: {
          title: 'What our customers say',
          testimonials: [
            {
              name: 'Sarah Johnson',
              role: 'Fashion Blogger',
              content: 'Amazing quality and fast shipping! My go-to store for trendy pieces.',
              rating: 5
            },
            {
              name: 'Michael Chen',
              role: 'Verified Buyer',
              content: 'Great customer service and beautiful products. Highly recommend!',
              rating: 5
            },
            {
              name: 'Emma Davis',
              role: 'Style Enthusiast',
              content: 'Love the curated collections. Always find something unique here.',
              rating: 5
            }
          ]
        }
      },
      {
        type: 'CTABanner',
        props: {
          headline: 'Get 20% off your first order',
          description: 'Sign up for our newsletter and receive exclusive offers.',
          primaryButton: { text: 'Shop Now' }
        }
      }
    ]
  },
  {
    id: 'healthcare-wellness',
    name: 'Healthcare & Wellness',
    industry: 'healthcare',
    description: 'For healthcare providers, wellness apps, and medical services',
    colorScheme: 'green',
    components: [
      {
        type: 'HeroSection',
        props: {
          headline: 'Your Health, Our Priority',
          subheadline: 'Access quality healthcare from the comfort of your home. Connect with certified professionals 24/7.',
          primaryButton: { text: 'Book Appointment' },
          secondaryButton: { text: 'Learn More' },
          colorScheme: 'green'
        }
      },
      {
        type: 'FeatureGrid',
        props: {
          title: 'Comprehensive care at your fingertips',
          columns: '3',
          features: [
            {
              title: 'Virtual Consultations',
              description: 'Connect with doctors via video call from anywhere.',
              icon: '💻'
            },
            {
              title: 'Prescription Management',
              description: 'Get prescriptions delivered to your doorstep.',
              icon: '💊'
            },
            {
              title: 'Health Records',
              description: 'Secure access to your medical history anytime.',
              icon: '📋'
            }
          ]
        }
      },
      {
        type: 'Process',
        props: {
          title: 'How it works',
          steps: [
            {
              title: 'Book Appointment',
              description: 'Choose your preferred time and specialist.',
              icon: '📅'
            },
            {
              title: 'Video Consultation',
              description: 'Meet with your doctor via secure video call.',
              icon: '🎥'
            },
            {
              title: 'Get Treatment',
              description: 'Receive prescriptions and follow-up care.',
              icon: '✅'
            }
          ]
        }
      },
      {
        type: 'FAQ',
        props: {
          title: 'Frequently asked questions',
          questions: [
            {
              question: 'Is telemedicine as effective as in-person visits?',
              answer: 'Yes, for many conditions, telemedicine is just as effective. Our doctors can diagnose and treat a wide range of health issues remotely.'
            },
            {
              question: 'How do I access my medical records?',
              answer: 'All your medical records are securely stored in your account and accessible anytime through our platform.'
            },
            {
              question: 'What if I need emergency care?',
              answer: 'For emergencies, please call 911 or visit your nearest emergency room. Our service is for non-emergency consultations.'
            }
          ]
        }
      },
      {
        type: 'CallToAction',
        props: {
          headline: 'Start your journey to better health',
          description: 'Book your first consultation today and experience healthcare reimagined.',
          primaryButton: { text: 'Book Now' },
          secondaryButton: { text: 'Contact Us' }
        }
      }
    ]
  },
  {
    id: 'finance-banking',
    name: 'Finance & Banking',
    industry: 'finance',
    description: 'For fintech apps, banking services, and financial products',
    colorScheme: 'indigo',
    components: [
      {
        type: 'HeroSection',
        props: {
          headline: 'Banking Made Simple',
          subheadline: 'Manage your money smarter with zero fees, instant transfers, and powerful financial tools.',
          primaryButton: { text: 'Open Account' },
          secondaryButton: { text: 'See Features' },
          colorScheme: 'indigo'
        }
      },
      {
        type: 'Stats',
        props: {
          title: 'Trusted by millions',
          stats: [
            { value: '$2B+', label: 'Assets Under Management', description: 'Growing daily' },
            { value: '500K+', label: 'Active Users', description: 'Worldwide' },
            { value: '99.9%', label: 'Uptime', description: 'Always available' }
          ]
        }
      },
      {
        type: 'FeatureGrid',
        props: {
          title: 'Everything you need to manage your finances',
          columns: '3',
          features: [
            {
              title: 'Zero Fees',
              description: 'No monthly fees, no hidden charges. Keep more of your money.',
              icon: '💰'
            },
            {
              title: 'Instant Transfers',
              description: 'Send and receive money instantly, 24/7.',
              icon: '⚡'
            },
            {
              title: 'Advanced Security',
              description: 'Bank-level encryption and fraud protection.',
              icon: '🔐'
            },
            {
              title: 'Savings Goals',
              description: 'Set and track your financial goals effortlessly.',
              icon: '🎯'
            },
            {
              title: 'Investment Tools',
              description: 'Grow your wealth with smart investment options.',
              icon: '📈'
            },
            {
              title: 'Expense Tracking',
              description: 'Understand your spending with detailed insights.',
              icon: '📊'
            }
          ]
        }
      },
      {
        type: 'PricingCompact',
        props: {
          title: 'Choose your plan',
          tiers: [
            {
              name: 'Basic',
              price: 'Free',
              features: ['No monthly fees', 'Instant transfers', 'Basic analytics'],
              ctaText: 'Get Started'
            },
            {
              name: 'Premium',
              price: '$9.99',
              period: 'month',
              highlighted: true,
              features: ['Everything in Basic', 'Investment tools', 'Priority support', 'Advanced analytics'],
              ctaText: 'Upgrade Now'
            }
          ]
        }
      },
      {
        type: 'CallToAction',
        props: {
          headline: 'Ready to take control of your finances?',
          description: 'Open your account in minutes. No paperwork, no hassle.',
          primaryButton: { text: 'Open Account' }
        }
      }
    ]
  },
  {
    id: 'education-learning',
    name: 'Education & Learning',
    industry: 'education',
    description: 'For online courses, educational platforms, and learning apps',
    colorScheme: 'orange',
    components: [
      {
        type: 'HeroSplit',
        props: {
          headline: 'Learn Anything, Anytime',
          subheadline: 'Access thousands of courses taught by industry experts. Start your learning journey today.',
          primaryButton: { text: 'Browse Courses' },
          secondaryButton: { text: 'Free Trial' },
          colorScheme: 'orange'
        }
      },
      {
        type: 'StatsMinimal',
        props: {
          stats: [
            { value: '10K+', label: 'Courses' },
            { value: '1M+', label: 'Students' },
            { value: '500+', label: 'Instructors' }
          ]
        }
      },
      {
        type: 'FeatureGrid',
        props: {
          title: 'Why choose our platform',
          columns: '3',
          features: [
            {
              title: 'Expert Instructors',
              description: 'Learn from industry professionals with real-world experience.',
              icon: '👨‍🏫'
            },
            {
              title: 'Flexible Learning',
              description: 'Study at your own pace, on any device, anytime.',
              icon: '⏰'
            },
            {
              title: 'Certificates',
              description: 'Earn recognized certificates upon course completion.',
              icon: '🎓'
            }
          ]
        }
      },
      {
        type: 'PricingTable',
        props: {
          title: 'Flexible pricing for everyone',
          tiers: [
            {
              name: 'Free',
              price: '$0',
              features: ['Access to free courses', 'Community forums', 'Basic certificates'],
              ctaText: 'Get Started'
            },
            {
              name: 'Pro',
              price: '$29',
              period: 'month',
              highlighted: true,
              features: ['All free features', 'Unlimited course access', 'Premium certificates', 'Priority support', 'Offline downloads'],
              ctaText: 'Start Free Trial'
            },
            {
              name: 'Team',
              price: '$99',
              period: 'month',
              features: ['All Pro features', 'Up to 10 team members', 'Team analytics', 'Custom learning paths', 'Dedicated support'],
              ctaText: 'Contact Sales'
            }
          ]
        }
      },
      {
        type: 'Testimonials',
        props: {
          title: 'Success stories from our students',
          testimonials: [
            {
              name: 'Alex Thompson',
              role: 'Software Developer',
              content: 'The courses helped me transition into tech. Now I\'m working at my dream company!',
              rating: 5
            },
            {
              name: 'Maria Garcia',
              role: 'Marketing Manager',
              content: 'Excellent content and instructors. I\'ve learned so much in just a few months.',
              rating: 5
            },
            {
              name: 'David Kim',
              role: 'Data Analyst',
              content: 'The flexibility to learn at my own pace was perfect for my busy schedule.',
              rating: 5
            }
          ]
        }
      },
      {
        type: 'CallToAction',
        props: {
          headline: 'Start learning today',
          description: 'Join millions of learners and unlock your potential.',
          primaryButton: { text: 'Browse Courses' },
          secondaryButton: { text: 'Start Free Trial' }
        }
      }
    ]
  }
];

export function getTemplatesByIndustry(industry: string): Template[] {
  return templates.filter(t => t.industry === industry);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}
