# Contributing to Conversational UI Starter

Thank you for your interest in improving this Tambo starter template! This guide will help you contribute effectively.

## 🎯 Template Goals

This starter template aims to:
- Help developers quickly start building conversational interfaces with Tambo
- Demonstrate best practices for Tambo integration
- Provide production-ready components and patterns
- Maintain simplicity while showing real-world usage

## 🛠️ Development Setup

1. **Fork and Clone**
   ```bash
   git clone your-fork-url
   cd conversational-ui-starter
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Add your Tambo API key to .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📋 Contribution Guidelines

### What We Welcome

- **Bug fixes** - Template not working as expected
- **Documentation improvements** - Clearer setup instructions, better examples
- **Component enhancements** - Better styling, accessibility improvements
- **New example prompts** - Tested prompts that showcase capabilities
- **Performance optimizations** - Faster loading, better UX

### What to Avoid

- **Breaking changes** - Keep the template easy to use
- **Complex features** - This is a starter template, not a full application
- **Unnecessary dependencies** - Keep the bundle size reasonable
- **Opinionated styling** - Maintain broad appeal

## 🔧 Making Changes

### Component Updates

When modifying components in `components/landing/`:
1. Ensure TypeScript types are correct
2. Update corresponding Zod schemas in `lib/schemas.ts`
3. Test with various prompts
4. Maintain responsive design
5. Keep accessibility in mind

### Documentation Changes

- Update README.md for major changes
- Add new prompts to EXAMPLE_PROMPTS.md
- Update GETTING_STARTED.md if setup changes
- Keep language clear and beginner-friendly

### Testing Your Changes

Before submitting:
1. **Build Test**: `npm run build` should succeed
2. **Lint Check**: `npm run lint` should pass
3. **Manual Testing**: Try several example prompts
4. **Fresh Install**: Test setup process from scratch

## 📝 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-improvement
   ```

2. **Make Your Changes**
   - Follow existing code style
   - Add/update documentation as needed
   - Test thoroughly

3. **Commit with Clear Messages**
   ```bash
   git commit -m "feat: improve hero component accessibility"
   git commit -m "docs: add e-commerce example prompts"
   git commit -m "fix: resolve TypeScript error in pricing table"
   ```

4. **Submit Pull Request**
   - Clear title describing the change
   - Detailed description of what and why
   - Screenshots for visual changes
   - Link to any related issues

## 🐛 Reporting Issues

When reporting bugs or issues:

### Include This Information
- **Node.js version**: `node --version`
- **npm version**: `npm --version`
- **Operating system**: Windows/Mac/Linux
- **Browser**: Chrome/Firefox/Safari + version
- **Error messages**: Full error text or screenshots
- **Steps to reproduce**: Exact steps that cause the issue

### Template-Specific Issues
- **Tambo API key**: Confirm it's set correctly (don't share the actual key)
- **System prompt**: Verify it's configured in Tambo dashboard
- **Example prompt**: Share the prompt that caused issues
- **Expected vs actual**: What you expected vs what happened

## 🎨 Style Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Use Tailwind CSS classes consistently

### Component Patterns
- Props should have Zod schemas
- Components should be responsive by default
- Use semantic HTML elements
- Include proper ARIA labels

### Documentation Style
- Use clear, simple language
- Include code examples
- Add emojis for visual scanning
- Keep sections focused and concise

## 🚀 Release Process

Template maintainers handle releases:
1. Review and merge approved PRs
2. Update version in package.json
3. Create release notes
4. Tag release in Git

## 💡 Ideas for Contributions

### Easy Contributions
- Fix typos in documentation
- Add new example prompts
- Improve error messages
- Update dependencies

### Medium Contributions
- Enhance component accessibility
- Improve mobile responsiveness
- Add loading state improvements
- Better error handling

### Advanced Contributions
- Performance optimizations
- New component variants
- Advanced TypeScript patterns
- Build process improvements

## 🤝 Community

- Be respectful and constructive
- Help other contributors
- Share knowledge and best practices
- Focus on making the template better for everyone

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make this template better for the Tambo community!** 🎉