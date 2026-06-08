import { tool } from '@anthropic-ai/claude-agent-sdk';
import { toolResult } from './helpers';

/**
 * Get blog author information
 */
export const getAuthorInfo = tool(
  'getAuthorInfo',
  'Get information about Julius Shade, the blog author. Use when users ask about the author, his background, or expertise.',
  {},
  async () => {
    return toolResult({
      name: 'Julius Shade',
      role: 'Software Engineer',
      topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
      blogUrl: 'https://julius.shade.dev',
      github: 'https://github.com/JuliusShade',
    });
  },
);
