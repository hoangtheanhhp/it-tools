import { TextWrap } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Fullwidth-Halfwidth Converter',
  path: '/fullwidth-halfwidth-converter',
  description: 'Convert fullwidth text to halfwidth text.',
  keywords: ['fullwidth', 'halfwidth', 'text', 'converter'],
  component: () => import('./fullwidth-halfwidth-converter.vue'),
  icon: TextWrap,
  createdAt: new Date('2024-09-02'),
});
