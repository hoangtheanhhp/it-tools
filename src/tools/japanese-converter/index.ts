import { TextWrap } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Japanese Converter',
  path: '/japanese-converter',
  description: 'Convert fullwidth text to halfwidth text.',
  keywords: ['fullwidth', 'halfwidth', 'text', 'converter'],
  component: () => import('./japanese-converter.vue'),
  icon: TextWrap,
  createdAt: new Date('2024-09-02'),
});
