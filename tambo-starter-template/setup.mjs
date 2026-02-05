#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Conversational UI Starter Template Setup\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setup() {
  try {
    // Check if .env.local exists
    const envPath = path.join(__dirname, '.env.local');
    const envExamplePath = path.join(__dirname, '.env.example');
    
    if (!fs.existsSync(envPath)) {
      console.log('📝 Setting up environment variables...');
      
      if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ Created .env.local from .env.example');
      } else {
        fs.writeFileSync(envPath, 'NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here\n');
        console.log('✅ Created .env.local file');
      }
    }

    // Ask for API key
    const apiKey = await askQuestion('\n🔑 Enter your Tambo API key (or press Enter to skip): ');
    
    if (apiKey && apiKey.trim()) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const updatedContent = envContent.replace(
        /NEXT_PUBLIC_TAMBO_API_KEY=.*/,
        `NEXT_PUBLIC_TAMBO_API_KEY=${apiKey.trim()}`
      );
      fs.writeFileSync(envPath, updatedContent);
      console.log('✅ API key saved to .env.local');
    }

    console.log('\n🎉 Setup complete! Next steps:');
    console.log('1. Configure your system prompt in the Tambo dashboard');
    console.log('2. Run: npm run dev');
    console.log('3. Open: http://localhost:3000');
    console.log('4. Try the example prompts from EXAMPLE_PROMPTS.md');
    console.log('\n📚 Check GETTING_STARTED.md for detailed instructions');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();