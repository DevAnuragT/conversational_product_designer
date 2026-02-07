# Side Quest Submission Checklist

## Before Submitting

### ✅ Code Quality
- [ ] `npm install` works without errors
- [ ] `npm run dev` starts the app successfully
- [ ] `npm run lint` passes with no errors
- [ ] `npm run typecheck` passes with no errors  
- [ ] `npm run build` completes successfully
- [ ] TypeScript strict mode is enabled (`"strict": true` in tsconfig.json)
- [ ] No `@ts-ignore` or `any` types used as workarounds
- [ ] No commented-out code or unused files
- [ ] No hardcoded demo data or placeholder TODOs

### ✅ README Requirements
- [ ] One-sentence description at the top
- [ ] Screenshot showing app with Tambo UI visible
- [ ] Video demo link (upload to GitHub, copy link)
- [ ] Prerequisites section (API keys needed)
- [ ] Setup steps (numbered, copy-pasteable)
- [ ] "What's Included" section with tech stack

### ✅ Tambo Integration
- [ ] Components properly registered in `lib/tambo-config.ts`
- [ ] Clear component descriptions
- [ ] Zod schemas for all components
- [ ] Video shows AI conversation working
- [ ] No workarounds bypassing Tambo's rendering system

### ✅ Design Quality
- [ ] UI matches quality of official templates
- [ ] Responsive design (mobile-first)
- [ ] Clean, professional styling
- [ ] No ugly or unstyled elements

### ✅ Template Structure
- [ ] Minimal and focused (4 components is perfect)
- [ ] Easy to understand at a glance
- [ ] Small, readable files
- [ ] Clear separation of concerns

## How to Submit

1. **Fork the Tambo repo**
   ```bash
   git clone https://github.com/tambo-ai/tambo
   cd tambo
   ```

2. **Create your template folder**
   ```bash
   mkdir -p community/templates/landing-page-generator
   cp -r /path/to/tambo-starter-template/* community/templates/landing-page-generator/
   ```

3. **Record your video demo**
   - Show the app running
   - Demonstrate AI conversation generating a landing page
   - Upload to GitHub by dragging into a PR comment
   - Copy the generated link

4. **Take a screenshot**
   - Show the app with Tambo UI visible
   - Upload to GitHub by dragging into PR
   - Update README with the link

5. **Test everything one more time**
   ```bash
   cd community/templates/landing-page-generator
   npm install
   npm run lint
   npm run typecheck
   npm run build
   npm run dev
   ```

6. **Create PR**
   - Title: "Add Landing Page Generator Template"
   - Description: Include video demo link
   - Link to submission form

7. **Fill out submission form**
   - https://tambo.co/submit-template (or whatever the form URL is)

## Common Rejection Reasons to Avoid

- ❌ Lint errors or type checking failures
- ❌ Missing ESLint or TypeScript config
- ❌ Use of `@ts-ignore` or `any`
- ❌ Kitchen-sink template with too many features
- ❌ Overcomplicated showcase app
- ❌ Workarounds bypassing Tambo APIs
- ❌ Broken or incomplete setup
- ❌ Missing video demo
- ❌ Poor documentation
- ❌ Ugly or unstyled UI
- ❌ Not responsive
- ❌ Generic todo app without meaningful Tambo integration

## Tips for Success

1. **Keep it simple** - 4 components is perfect, don't add more
2. **Focus on quality** - Better to have 4 polished components than 10 mediocre ones
3. **Test thoroughly** - Run all commands multiple times
4. **Good video** - Show the AI conversation, not just the result
5. **Clear README** - Make it easy for others to use your template

## Deadline

**Friday, January 30th at 9am PST**

Make sure to submit well before the deadline to allow time for any requested changes!
