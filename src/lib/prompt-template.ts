import type { ComponentFile, PlatformType } from './types';

export interface PromptTemplateData {
  componentName: string;
  files: ComponentFile[];
  dependencies: string[];
  description?: string;
}

function generateCodeFilesSection(files: ComponentFile[]): string {
  const demoFile = files.find((f) => f.name === 'demo.tsx');
  const componentFiles = files.filter((f) => f.name !== 'demo.tsx');

  let codeSection = '';

  // Add demo file first if it exists
  if (demoFile) {
    codeSection += `demo.tsx\n${demoFile.content}\n\n`;
  }

  // Then add component files
  componentFiles.forEach((file) => {
    codeSection += `${file.name}\n${file.content}\n\n`;
  });

  return codeSection.trim();
}

function generateDependenciesSection(dependencies: string[]): string {
  if (dependencies.length === 0) return '';

  const packages = dependencies
    .map((dep) => {
      // Extract package name without version
      const atIndex = dep.lastIndexOf('@');
      if (atIndex > 0) {
        return dep.substring(0, atIndex);
      }
      return dep;
    })
    .join(' ');

  const installCmd = `npm install ${packages}`;

  return `npm: ${installCmd}
yarn: ${installCmd.replace('npm install', 'yarn add')}
pnpm: ${installCmd.replace('npm install', 'pnpm add')}
bun: ${installCmd.replace('npm install', 'bun add')}`;
}

function generateV0Prompt(data: PromptTemplateData): string {
  const codeFiles = generateCodeFilesSection(data.files);
  const deps = generateDependenciesSection(data.dependencies);

  return `${deps ? `Install dependencies:\n\`\`\`bash\n${deps}\n\`\`\`\n\n` : ''
    }Copy-paste this component to /components/ui folder:
\`\`\`tsx
${codeFiles}
\`\`\``;
}

function generateCursorPrompt(data: PromptTemplateData): string {
  const codeFiles = generateCodeFilesSection(data.files);
  const deps = generateDependenciesSection(data.dependencies);

  return `You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

${deps ? `Install dependencies first:\n\`\`\`bash\n${deps}\n\`\`\`\n\n` : ''
    }Copy-paste this component to /components/ui folder:
\`\`\`tsx
${codeFiles}
\`\`\`

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them`;
}

function generateLovablePrompt(data: PromptTemplateData): string {
  const codeFiles = generateCodeFilesSection(data.files);
  const deps = generateDependenciesSection(data.dependencies);

  return `${deps ? `Install dependencies:\n\`\`\`bash\n${deps}\n\`\`\`\n\n` : ''
    }Copy-paste this component to /components/ui folder:
\`\`\`tsx
${codeFiles}
\`\`\``;
}

function generateBoltPrompt(data: PromptTemplateData): string {
  const codeFiles = generateCodeFilesSection(data.files);
  const deps = generateDependenciesSection(data.dependencies);

  return `You are integrating a React component into a Bolt project.

Project Requirements:
- React with TypeScript
- Tailwind CSS for styling
- Modern ES6+ syntax

Component Integration Steps:
1. Install all required dependencies
2. Create the component files in the /components/ui directory
3. Import and use the component in your application

${deps ? `Install dependencies first:\n\`\`\`bash\n${deps}\n\`\`\`\n\n` : ''
    }Copy-paste this component to /components/ui folder:
\`\`\`tsx
${codeFiles}
\`\`\`

Usage Notes:
- Ensure Tailwind CSS is properly configured in your project
- The component uses TypeScript - make sure your project supports .tsx files
- Check that all peer dependencies are installed
- Import the component using: import { ComponentName } from "@/components/ui/component-name"`;
}

export function generateAllPrompts(
  data: PromptTemplateData
): Record<PlatformType, string> {
  return {
    V0: generateV0Prompt(data),
    CURSOR: generateCursorPrompt(data),
    LOVABLE: generateLovablePrompt(data),
    BOLT: generateBoltPrompt(data),
  };
}

export function generatePromptForPlatform(
  platform: PlatformType,
  data: PromptTemplateData
): string {
  switch (platform) {
    case 'V0':
      return generateV0Prompt(data);
    case 'CURSOR':
      return generateCursorPrompt(data);
    case 'LOVABLE':
      return generateLovablePrompt(data);
    case 'BOLT':
      return generateBoltPrompt(data);
    default:
      return '';
  }
}

export const PLATFORM_INFO: Record<
  PlatformType,
  { icon: string; name: string; }
> = {
  BOLT: {
    icon: '/brand/bolt-logo-icon.png',
    name: 'Bolt',
  },
  CURSOR: {
    icon: '/brand/cursor-logo-icon.png',
    name: 'Cursor',
  },
  LOVABLE: {
    icon: '/brand/lovable-logo-icon.svg',
    name: 'Lovable',
  },
  V0: {
    icon: '/brand/v0-logo-icon.png',
    name: 'v0',
  },
};

export const PLATFORMS: PlatformType[] = ['V0', 'CURSOR', 'LOVABLE', 'BOLT'];

// Re-export types
export type { PlatformType } from './types';
