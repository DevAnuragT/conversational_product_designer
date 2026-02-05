# Demo Script: Conversational Product Designer with Tambo AI

## Overview
This demo showcases how to generate professional landing pages using natural language prompts with Tambo AI. The application composes landing pages using four registered React components based on user descriptions.

## Demo Timeline (60 seconds)

### 00:00 - 00:05: Problem Statement
**Narrator**: "Creating professional landing pages typically requires design skills, coding knowledge, and significant time investment. What if you could just describe what you want in plain English?"

**Action**: Show the application interface with empty state

### 00:05 - 00:15: Prompt #1 - SaaS Landing Page
**Narrator**: "Let's create a landing page for a productivity SaaS application."

**Prompt to type**: 
```
Create a landing page for TaskFlow, a productivity SaaS app that helps teams manage projects better. Include a hero section with a compelling headline, a feature grid showing 3 key benefits (collaboration, automation, and analytics), and a call-to-action section encouraging users to start their free trial.
```

**Action**: 
- Type the prompt in the textarea
- Click "Generate UI" button
- Show loading state

### 00:15 - 00:30: UI Generation & Results
**Narrator**: "Watch as Tambo AI composes the landing page using our registered components - HeroSection, FeatureGrid, and CallToAction."

**Action**: 
- Show the generated landing page appearing in the preview area
- Highlight each component as it renders:
  - Hero section with TaskFlow branding
  - Feature grid with 3 benefits
  - Call-to-action section
- Scroll through the generated page to show responsiveness

### 00:30 - 00:45: Prompt #2 - E-commerce Variation
**Narrator**: "Let's try something different - an e-commerce landing page with pricing."

**Prompt to type**:
```
Build a landing page for "EcoWear", a sustainable clothing brand. Start with a hero section about eco-friendly fashion, add a feature grid highlighting sustainability, quality, and style, include a pricing table with 3 product tiers (Basic, Premium, Luxury), and end with a strong call-to-action.
```

**Action**:
- Clear previous prompt and type new one
- Generate the new landing page
- Show how the AI adapts to include pricing table this time

### 00:45 - 01:00: Export Stub & Conclusion
**Narrator**: "The generated components are fully functional React components. While export functionality is coming soon..."

**Action**:
- Hover over the "Export Code" button to show tooltip
- Demonstrate the tooltip message: "Coming soon — export the generated UI as reusable React code"

**Narrator**: "...you can already see how natural language can create professional, responsive landing pages in seconds. This is the future of design - conversational, intelligent, and incredibly fast."

**Action**: Show final generated page one more time

## Extended Demo Prompts (for longer demonstrations)

### Prompt #3: Service Business
```
Generate a landing page for "Digital Marketing Pro", a consulting agency. Create a professional hero section, feature grid with 4 services (SEO, PPC, Social Media, Content Marketing), pricing packages for different business sizes, and a consultation call-to-action.
```

### Prompt #4: Minimalist Approach
```
Create a simple, clean landing page for a meditation app called "Mindful Moments". Just a hero section with calming messaging and a call-to-action to download the app. Keep it minimal and zen-like.
```

### Prompt #5: Complex Layout
```
Build a comprehensive landing page for "TechStart Accelerator", a startup incubator. Include a compelling hero about launching startups, feature grid with 6 program benefits, detailed pricing table with 3 membership tiers (Founder, Growth, Scale), and dual call-to-action buttons for applications and information requests.
```

## Demo Tips

### Before the Demo
1. **Test your API key**: Ensure Tambo AI is working properly
2. **Clear browser cache**: Start with a clean slate
3. **Check internet connection**: Ensure stable connection for API calls
4. **Practice timing**: Run through the script to get comfortable with timing
5. **Prepare backup**: Have screenshots ready in case of technical issues

### During the Demo
1. **Speak clearly**: Explain what's happening as you type
2. **Show loading states**: Don't skip the generation process - it shows the AI working
3. **Highlight components**: Point out how different components are being used
4. **Demonstrate responsiveness**: Resize the browser window to show mobile adaptation
5. **Handle errors gracefully**: If something fails, explain it's a live demo and retry

### After the Demo
1. **Show the code**: Briefly mention the React components and schemas
2. **Discuss customization**: Explain how components can be modified
3. **Mention scalability**: Talk about adding more components to the registry
4. **Address questions**: Be prepared to discuss technical implementation

## Technical Setup for Demo

### Environment Requirements
- **Screen resolution**: 1920×1080 recommended for recording
- **Browser**: Chrome or Firefox with developer tools closed
- **Audio**: Quiet environment with good microphone
- **Recording software**: OBS, Loom, or similar screen recording tool

### Pre-Demo Checklist
- [ ] Tambo API key is configured and working
- [ ] Application builds and runs without errors (`npm run build && npm run dev`)
- [ ] All example prompts have been tested
- [ ] System prompt is configured in Tambo dashboard
- [ ] Browser is set to appropriate zoom level for visibility
- [ ] Demo script is practiced and timed

### Troubleshooting Common Demo Issues

**API Key Issues**:
- Verify key is set in `.env.local`
- Check Tambo dashboard for API usage limits
- Test with a simple prompt first

**Generation Failures**:
- Ensure system prompt is configured correctly
- Try shorter, simpler prompts
- Check browser console for error messages

**Component Rendering Issues**:
- Verify all components are registered properly
- Check for TypeScript errors in console
- Ensure Zod schemas match component props

**Performance Issues**:
- Close unnecessary browser tabs
- Ensure stable internet connection
- Consider using a local recording setup

## Variations for Different Audiences

### For Developers
- Focus on the technical architecture
- Show the component registry and schemas
- Discuss TypeScript integration and type safety
- Demonstrate how to add new components

### For Designers
- Emphasize the design quality and responsiveness
- Show how different prompts create different aesthetics
- Discuss the professional styling and Tailwind CSS usage
- Highlight the consistency across generated pages

### For Business Users
- Focus on the speed and ease of use
- Emphasize cost savings and efficiency
- Show practical business use cases
- Discuss the potential for rapid prototyping

### For Product Managers
- Highlight the user experience and workflow
- Discuss the potential for democratizing design
- Show how it enables rapid iteration and testing
- Emphasize the bridge between natural language and technical implementation

---

*This demo script is designed to showcase the core functionality of the Conversational Product Designer in a compelling, time-efficient manner. Adjust timing and content based on your specific audience and demo context.*