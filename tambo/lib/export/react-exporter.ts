/**
 * React Code Exporter
 */

import { ComponentInstance, ExportConfig, ExportFile, ExportResult } from './types';
import { formatTypeScript, formatJSON, countLines } from './code-formatter';

export class ReactExporter {
  async export(components: ComponentInstance[], config: ExportConfig): Promise<ExportResult> {
    const files: ExportFile[] = [];
    
    // Generate individual component files
    for (let i = 0; i < components.length; i++) {
      const comp = components[i];
      const componentFile = await this.generateComponentFile(comp, i, config);
      files.push(componentFile);
    }
    
    // Generate main page file
    const pageFile = await this.generatePageFile(components, config);
    files.push(pageFile);
    
    // Generate package.json
    const packageFile = await this.generatePackageJson(config);
    files.push(packageFile);
    
    // Generate tailwind config
    const tailwindFile = await this.generateTailwindConfig();
    files.push(tailwindFile);
    
    // Generate README
    if (config.includeReadme) {
      const readmeFile = this.generateReadme(components, config);
      files.push(readmeFile);
    }
    
    return {
      files,
      metadata: {
        componentCount: components.length,
        totalLines: files.reduce((sum, f) => sum + countLines(f.content), 0),
        dependencies: this.extractDependencies(components),
        format: 'react',
        timestamp: Date.now(),
      },
    };
  }
  
  private async generateComponentFile(
    comp: ComponentInstance,
    index: number,
    config: ExportConfig
  ): Promise<ExportFile> {
    const componentName = `${comp.name}${index}`;
    const propsInterface = this.generatePropsInterface(comp);
    const componentCode = this.generateComponentCode(comp, componentName, config);
    
    const code = `${config.includeComments ? this.generateFileHeader(comp) : ''}
import React from 'react';

${propsInterface}

export default function ${componentName}(props: ${componentName}Props) {
${componentCode}
}
`;
    
    return {
      path: `components/${componentName}.tsx`,
      content: await formatTypeScript(code),
      type: 'component',
    };
  }
  
  private generatePropsInterface(comp: ComponentInstance): string {
    const props = comp.props;
    const interfaceName = `${comp.name}Props`;
    
    // Generate interface from actual props
    const fields = Object.entries(props).map(([key, value]) => {
      const type = this.inferType(value);
      return `  ${key}: ${type};`;
    }).join('\n');
    
    return `interface ${interfaceName} {\n${fields}\n}`;
  }
  
  private inferType(value: any): string {
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const itemType = this.inferType(value[0]);
      return `${itemType}[]`;
    }
    
    if (typeof value === 'object' && value !== null) {
      const fields = Object.entries(value).map(([k, v]) => {
        return `${k}: ${this.inferType(v)}`;
      }).join('; ');
      return `{ ${fields} }`;
    }
    
    return typeof value;
  }
  
  private generateComponentCode(comp: ComponentInstance, componentName: string, config: ExportConfig): string {
    const props = comp.props;
    
    // Generate JSX based on component type
    switch (comp.name) {
      case 'HeroSection':
      case 'HeroSplit':
        return this.generateHeroCode(props);
      case 'FeatureGrid':
      case 'FeatureList':
        return this.generateFeatureCode(props);
      case 'PricingTable':
      case 'PricingCompact':
        return this.generatePricingCode(props);
      case 'CallToAction':
      case 'CTABanner':
        return this.generateCTACode(props);
      case 'Testimonials':
        return this.generateTestimonialsCode(props);
      case 'FAQ':
        return this.generateFAQCode(props);
      case 'Stats':
      case 'StatsMinimal':
        return this.generateStatsCode(props);
      default:
        return this.generateGenericCode(props);
    }
  }
  
  private generateHeroCode(props: any): string {
    const colorScheme = props.colorScheme || 'blue';
    return `  return (
    <section className="py-20 px-4 bg-gradient-to-br from-${colorScheme}-600 to-${colorScheme}-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          {props.headline}
        </h1>
        <p className="text-xl text-${colorScheme}-100 mb-8">
          {props.subheadline}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-${colorScheme}-600 rounded-lg font-semibold hover:bg-gray-100">
            {props.primaryButton.text}
          </button>
          {props.secondaryButton && (
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10">
              {props.secondaryButton.text}
            </button>
          )}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateFeatureCode(props: any): string {
    return `  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {props.title}
          </h2>
        )}
        <div className="grid md:grid-cols-${props.columns || 3} gap-8">
          {props.features.map((feature: any, index: number) => (
            <div key={index} className="text-center">
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generatePricingCode(props: any): string {
    return `  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {props.title}
          </h2>
        )}
        <div className="grid md:grid-cols-${props.tiers.length} gap-8">
          {props.tiers.map((tier: any, index: number) => (
            <div 
              key={index} 
              className={\`p-8 bg-white rounded-xl shadow-lg \${tier.highlighted ? 'ring-2 ring-blue-600' : ''}\`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-4">
                {tier.price}
                {tier.period && <span className="text-lg text-gray-600">/{tier.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                {tier.ctaText || 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateCTACode(props: any): string {
    const bgColor = props.backgroundColor || 'primary';
    return `  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {props.headline}
        </h2>
        {props.description && (
          <p className="text-xl text-blue-100 mb-8">
            {props.description}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
            {props.primaryButton.text}
          </button>
          {props.secondaryButton && (
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10">
              {props.secondaryButton.text}
            </button>
          )}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateTestimonialsCode(props: any): string {
    return `  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {props.title}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {props.testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {testimonial.avatar && (
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                )}
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              {testimonial.rating && (
                <div className="text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateFAQCode(props: any): string {
    return `  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {props.title}
          </h2>
        )}
        <div className="space-y-4">
          {props.questions.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 text-left font-semibold flex justify-between items-center"
              >
                {item.question}
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateStatsCode(props: any): string {
    return `  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {props.title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {props.title}
          </h2>
        )}
        <div className="grid md:grid-cols-${props.stats.length} gap-8">
          {props.stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              {stat.description && (
                <div className="text-gray-600">{stat.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );`;
  }
  
  private generateGenericCode(props: any): string {
    return `  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </section>
  );`;
  }
  
  private async generatePageFile(components: ComponentInstance[], config: ExportConfig): Promise<ExportFile> {
    const imports = components.map((comp, i) => 
      `import ${comp.name}${i} from './components/${comp.name}${i}';`
    ).join('\n');
    
    const componentInstances = components.map((comp, i) => {
      const propsJson = JSON.stringify(comp.props, null, 2).replace(/"([^"]+)":/g, '$1:');
      return `      <${comp.name}${i} {...${propsJson}} />`;
    }).join('\n');
    
    const code = `${config.includeComments ? '// Generated Landing Page\n' : ''}
import React from 'react';
${imports}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
${componentInstances}
    </div>
  );
}
`;
    
    return {
      path: 'page.tsx',
      content: await formatTypeScript(code),
      type: 'component',
    };
  }
  
  private async generatePackageJson(config: ExportConfig): Promise<ExportFile> {
    const packageJson = {
      name: config.projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        next: '^14.0.0',
      },
      devDependencies: {
        '@types/react': '^18.2.0',
        '@types/node': '^20.0.0',
        typescript: '^5.0.0',
        tailwindcss: '^3.3.0',
        postcss: '^8.4.0',
        autoprefixer: '^10.4.0',
      },
    };
    
    return {
      path: 'package.json',
      content: await formatJSON(JSON.stringify(packageJson)),
      type: 'config',
    };
  }
  
  private async generateTailwindConfig(): Promise<ExportFile> {
    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
    
    return {
      path: 'tailwind.config.js',
      content: config,
      type: 'config',
    };
  }
  
  private generateReadme(components: ComponentInstance[], config: ExportConfig): ExportFile {
    const content = `# ${config.projectName}

Generated landing page with ${components.length} components.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## Components

${components.map((comp, i) => `- ${comp.name}${i}`).join('\n')}

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

Generated by Conversational Product Designer
`;
    
    return {
      path: 'README.md',
      content,
      type: 'readme',
    };
  }
  
  private generateFileHeader(comp: ComponentInstance): string {
    return `/**
 * ${comp.name} Component
 * Generated by Conversational Product Designer
 */\n\n`;
  }
  
  private extractDependencies(components: ComponentInstance[]): string[] {
    return ['react', 'react-dom', 'next', 'tailwindcss'];
  }
}
