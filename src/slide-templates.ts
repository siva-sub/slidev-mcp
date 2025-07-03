import { SlideOptions } from './types.js';

export const SLIDE_TEMPLATES = {
  titleSlide: (title: string, subtitle?: string) => ({
    layout: 'center',
    class: 'text-center',
    content: `# ${title}
${subtitle ? `\n## ${subtitle}` : ''}

<div v-click class="text-sm opacity-50">
  Press Space to continue →
</div>`
  }),

  imageTextSlide: (title: string, content: string, imageUrl: string, imagePosition: 'left' | 'right' = 'right') => ({
    layout: `image-${imagePosition}`,
    image: imageUrl,
    content: `# ${title}

${content}`
  }),

  twoColumnsSlide: (title: string, leftContent: string, rightContent: string) => ({
    layout: 'two-cols',
    content: `# ${title}

${leftContent}

::right::

${rightContent}`
  }),

  codeSlide: (title: string, code: string, language: string = 'typescript', explanation?: string) => ({
    layout: 'default',
    content: `# ${title}

${explanation ? `${explanation}\n\n` : ''}\`\`\`${language}
${code}
\`\`\``
  }),

  bulletPointSlide: (title: string, points: string[], animated: boolean = true) => ({
    layout: 'default',
    content: `# ${title}

${animated ? '<v-clicks>\n' : ''}
${points.map(point => `- ${point}`).join('\n')}
${animated ? '\n</v-clicks>' : ''}`
  }),

  quoteSlide: (quote: string, author: string) => ({
    layout: 'quote',
    content: `> "${quote}"

<div class="text-right mt-4">
  <span class="opacity-70">— ${author}</span>
</div>`
  }),

  comparisonSlide: (title: string, leftTitle: string, leftItems: string[], rightTitle: string, rightItems: string[]) => ({
    layout: 'two-cols',
    content: `# ${title}

## ${leftTitle}

<v-clicks>

${leftItems.map(item => `- ${item}`).join('\n')}

</v-clicks>

::right::

## ${rightTitle}

<v-clicks>

${rightItems.map(item => `- ${item}`).join('\n')}

</v-clicks>`
  }),

  timelineSlide: (title: string, events: Array<{ date: string, event: string }>) => ({
    layout: 'default',
    content: `# ${title}

<div class="timeline">
${events.map((e, i) => `
<div v-click="${i + 1}" class="flex items-center gap-4 mb-4">
  <div class="text-primary font-bold whitespace-nowrap">${e.date}</div>
  <div class="w-3 h-3 rounded-full bg-primary"></div>
  <div class="flex-1">${e.event}</div>
</div>`).join('')}
</div>`
  }),

  diagramSlide: (title: string, mermaidCode: string) => ({
    layout: 'default',
    content: `# ${title}

\`\`\`mermaid
${mermaidCode}
\`\`\``
  }),

  statsSlide: (title: string, stats: Array<{ value: string, label: string }>) => ({
    layout: 'default',
    content: `# ${title}

<div class="grid grid-cols-${Math.min(stats.length, 3)} gap-8 mt-8">
${stats.map((stat, i) => `
  <div v-click="${i + 1}" class="text-center">
    <div class="text-4xl font-bold text-primary">${stat.value}</div>
    <div class="text-gray-500 mt-2">${stat.label}</div>
  </div>`).join('')}
</div>`
  })
};

export const ANIMATION_PRESETS = {
  fadeIn: {
    type: 'v-motion' as const,
    options: {
      initial: { opacity: 0 },
      enter: { opacity: 1 }
    }
  },
  slideInLeft: {
    type: 'v-motion' as const,
    options: {
      initial: { x: -100, opacity: 0 },
      enter: { x: 0, opacity: 1 }
    }
  },
  slideInRight: {
    type: 'v-motion' as const,
    options: {
      initial: { x: 100, opacity: 0 },
      enter: { x: 0, opacity: 1 }
    }
  },
  zoomIn: {
    type: 'v-motion' as const,
    options: {
      initial: { scale: 0.5, opacity: 0 },
      enter: { scale: 1, opacity: 1 }
    }
  },
  bounce: {
    type: 'v-motion' as const,
    options: {
      initial: { y: -50 },
      enter: { y: 0, transition: { type: 'spring', stiffness: 300 } }
    }
  }
};

export const THEME_PRESETS = {
  corporate: {
    name: 'corporate',
    primaryColor: '#0066CC',
    secondaryColor: '#004499',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    customCSS: `
.slidev-layout {
  @apply bg-white text-gray-800;
}
h1 {
  @apply text-blue-600 font-bold;
}
`
  },
  creative: {
    name: 'creative',
    primaryColor: '#FF6B6B',
    secondaryColor: '#4ECDC4',
    backgroundColor: '#F7FFF7',
    fontFamily: 'Montserrat, sans-serif',
    customCSS: `
.slidev-layout {
  @apply bg-gradient-to-br from-pink-50 to-blue-50;
}
h1 {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500;
}
`
  },
  minimal: {
    name: 'minimal',
    primaryColor: '#000000',
    secondaryColor: '#666666',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Helvetica Neue, sans-serif',
    customCSS: `
.slidev-layout {
  @apply bg-gray-50 text-gray-900;
}
h1 {
  @apply text-black font-light tracking-tight;
}
`
  },
  dark: {
    name: 'dark',
    primaryColor: '#60A5FA',
    secondaryColor: '#818CF8',
    backgroundColor: '#0F172A',
    fontFamily: 'JetBrains Mono, monospace',
    customCSS: `
.slidev-layout {
  @apply bg-slate-900 text-gray-100;
}
h1 {
  @apply text-blue-400 font-bold;
}
code {
  @apply bg-slate-800 px-2 py-1 rounded;
}
`
  }
};