# Getting Started with Conversational UI Starter

This guide will help you get up and running with your new conversational interface in under 5 minutes.

## 🎯 What You're Building

A conversational interface that generates professional landing pages from natural language prompts. Users describe what they want, and Tambo AI composes it using your registered React components.

## 📋 Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Tambo AI account created at [tambo.co](https://tambo.co)
- [ ] Tambo API key obtained from your dashboard

## 🚀 Setup Steps

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Configure Environment (1 minute)

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local and add your API key
NEXT_PUBLIC_TAMBO_API_KEY=your_actual_api_key_here
```

### 3. Configure Tambo Project (2 minutes)

1. Go to your [Tambo dashboard](https://tambo.co)
2. Create a new project or select existing one
3. In project settings, set the **System Prompt** to:

```
You are a UI composer for landing pages. You have access to exactly four components:

1. HeroSection - Use for primary landing page headers with headlines and CTAs
2. FeatureGrid - Use for displaying multiple features in a grid layout  
3. PricingTable - Use for showing pricing tiers and comparisons
4. CallToAction - Use for conversion-focused sections

IMPORTANT RULES:
- Only use these four registered components
- Do not invent or suggest other components
- Prefer fewer components unless the user specifically asks for more
- Always provide realistic, professional content
- Ensure all required props are included
```

### 4. Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎉 Test Your Setup

Try this prompt in the interface:

```
Create a landing page for a productivity app called "FocusFlow". Include a hero section with an engaging headline about boosting productivity, a feature grid showing 3 key benefits, and a call-to-action to start a free trial.
```

You should see:
1. Loading indicator while AI processes
2. Generated landing page with hero, features, and CTA
3. Professional styling and responsive design

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### API Key Issues
- Verify key starts with correct prefix
- Check key is set in `.env.local` (not `.env.example`)
- Ensure no extra spaces or quotes around the key

### Generation Not Working
- Check browser console for errors
- Verify system prompt is configured in Tambo dashboard
- Try simpler prompts first

### Component Not Rendering
- Check that all four components are registered in `lib/tambo-config.ts`
- Verify Zod schemas match component props
- Look for TypeScript errors in terminal

## 📚 Next Steps

Once everything is working:

1. **Customize Components**: Modify the four landing page components in `components/landing/`
2. **Add New Components**: Follow the pattern to register additional components
3. **Style Changes**: Update Tailwind classes or add custom CSS
4. **Deploy**: Push to Vercel, Netlify, or your preferred platform

## 💡 Pro Tips

- **Start Simple**: Test with basic prompts before complex ones
- **Check Logs**: Browser console shows helpful debugging info
- **Iterate Fast**: The hot reload makes development smooth
- **Read Schemas**: Understanding `lib/schemas.ts` helps with customization

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review [Tambo AI docs](https://docs.tambo.co) for advanced features
- Look at existing components for patterns and examples

---

**🎊 Congratulations!** You now have a working conversational UI that generates landing pages. Time to build something amazing!