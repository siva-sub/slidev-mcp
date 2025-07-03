import { BulkSlideInput, SlideData } from './types.js';
import { SLIDE_TEMPLATES, ANIMATION_PRESETS, THEME_PRESETS } from './slide-templates.js';

export class SlideGenerator {
  generateBulkSlides(input: BulkSlideInput): SlideData[] {
    const {
      topic,
      slideCount = 10,
      style = 'detailed',
      includeAnimations = true,
      includeCode = false,
      includeImages = true,
      theme = 'default',
      customInstructions
    } = input;

    const slides: SlideData[] = [];
    
    // Cover slide
    slides.push(this.createCoverSlide(topic, theme));
    
    // Table of contents
    slides.push(this.createTocSlide());
    
    // Introduction
    slides.push(this.createIntroSlide(topic, style, includeAnimations));
    
    // Main content slides
    const contentSlideCount = Math.max(1, slideCount - 5); // Reserve slides for cover, toc, intro, summary, thank you
    for (let i = 0; i < contentSlideCount; i++) {
      slides.push(this.createContentSlide(topic, i, style, includeAnimations, includeCode, includeImages));
    }
    
    // Summary slide
    slides.push(this.createSummarySlide(topic, includeAnimations));
    
    // Thank you slide
    slides.push(this.createThankYouSlide(includeAnimations));
    
    return slides;
  }

  private createCoverSlide(topic: string, theme: string): SlideData {
    const themeConfig = THEME_PRESETS[theme as keyof typeof THEME_PRESETS] || THEME_PRESETS.minimal;
    
    return {
      index: 0,
      layout: 'cover',
      content: `# ${topic}

<div class="absolute bottom-10">
  <div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 300 } }">
    <span class="text-lg opacity-70">A Comprehensive Overview</span>
  </div>
</div>`,
      frontmatter: {
        theme: themeConfig.name,
        background: 'https://source.unsplash.com/collection/94734566/1920x1080',
        transition: 'fade'
      }
    };
  }

  private createTocSlide(): SlideData {
    return {
      index: 1,
      layout: 'default',
      content: `# Table of Contents

<Toc v-click />

<style>
.slidev-toc {
  @apply mt-8;
}
.slidev-toc-item {
  @apply text-lg py-2;
}
</style>`,
      frontmatter: {
        transition: 'slide-left'
      }
    };
  }

  private createIntroSlide(topic: string, style: string, includeAnimations: boolean): SlideData {
    const points = this.generateIntroPoints(topic, style);
    
    return {
      index: 2,
      ...SLIDE_TEMPLATES.bulletPointSlide(
        'Introduction',
        points,
        includeAnimations
      ),
      frontmatter: {
        transition: 'slide-up'
      }
    };
  }

  private createContentSlide(
    topic: string,
    index: number,
    style: string,
    includeAnimations: boolean,
    includeCode: boolean,
    includeImages: boolean
  ): SlideData {
    const slideTypes = this.getSlideTypesForStyle(style, includeCode, includeImages);
    const slideType = slideTypes[index % slideTypes.length];
    
    return this.generateSlideByType(topic, index + 3, slideType, includeAnimations);
  }

  private createSummarySlide(topic: string, includeAnimations: boolean): SlideData {
    return {
      index: -2,
      layout: 'default',
      content: `# Key Takeaways

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
    <h3 class="text-blue-600 font-bold mb-2">Understanding</h3>
    <p>Deep insights into ${topic}</p>
  </div>
  
  <div v-click class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
    <h3 class="text-green-600 font-bold mb-2">Application</h3>
    <p>Practical approaches and methods</p>
  </div>
  
  <div v-click class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
    <h3 class="text-purple-600 font-bold mb-2">Innovation</h3>
    <p>Future possibilities and trends</p>
  </div>
  
  <div v-click class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
    <h3 class="text-orange-600 font-bold mb-2">Action</h3>
    <p>Next steps and recommendations</p>
  </div>
</div>`,
      frontmatter: {
        transition: 'fade-out'
      }
    };
  }

  private createThankYouSlide(includeAnimations: boolean): SlideData {
    return {
      index: -1,
      layout: 'center',
      content: `# Thank You!

<div v-motion 
  :initial="{ scale: 0.8, opacity: 0 }" 
  :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } }"
  class="mt-8">
  <div class="text-2xl mb-4">Questions?</div>
  <div class="flex gap-4 justify-center text-sm opacity-70">
    <div>📧 email@example.com</div>
    <div>🐦 @twitter</div>
    <div>🌐 website.com</div>
  </div>
</div>`,
      frontmatter: {
        transition: 'slide-up',
        class: 'text-center'
      }
    };
  }

  private generateIntroPoints(topic: string, style: string): string[] {
    const basePoints = [
      `Understanding the fundamentals of ${topic}`,
      `Key concepts and terminology`,
      `Current state and applications`
    ];
    
    if (style === 'detailed' || style === 'academic') {
      basePoints.push(
        'Historical context and evolution',
        'Theoretical foundations',
        'Research methodology'
      );
    }
    
    if (style === 'visual') {
      basePoints.push('Visual representations and diagrams');
    }
    
    return basePoints;
  }

  private getSlideTypesForStyle(style: string, includeCode: boolean, includeImages: boolean): string[] {
    let types = ['bullet', 'twoColumns'];
    
    if (style === 'visual' && includeImages) {
      types.push('imageText', 'stats', 'timeline');
    }
    
    if (style === 'detailed' || style === 'academic') {
      types.push('comparison', 'quote');
      if (includeCode) {
        types.push('code');
      }
    }
    
    if (style === 'minimal') {
      types = ['bullet', 'quote'];
    }
    
    return types;
  }

  private generateSlideByType(
    topic: string,
    index: number,
    type: string,
    includeAnimations: boolean
  ): SlideData {
    switch (type) {
      case 'bullet':
        return {
          index,
          ...SLIDE_TEMPLATES.bulletPointSlide(
            `${topic} - Key Points ${index - 2}`,
            [
              'First important aspect to consider',
              'Secondary consideration with details',
              'Third point with practical implications',
              'Final thought on implementation'
            ],
            includeAnimations
          )
        };
        
      case 'imageText':
        return {
          index,
          ...SLIDE_TEMPLATES.imageTextSlide(
            `Visual Representation`,
            'This diagram illustrates the key concepts and their relationships. Notice how each element connects to form a cohesive system.',
            'https://source.unsplash.com/collection/1163637/800x600'
          )
        };
        
      case 'twoColumns':
        return {
          index,
          ...SLIDE_TEMPLATES.twoColumnsSlide(
            'Comparison',
            `### Traditional Approach\n- Manual processes\n- Time-consuming\n- Error-prone\n- Limited scalability`,
            `### Modern Solution\n- Automated workflows\n- Efficient execution\n- Reliable results\n- Infinite scalability`
          )
        };
        
      case 'code':
        return {
          index,
          ...SLIDE_TEMPLATES.codeSlide(
            'Implementation Example',
            `// Example implementation
interface Solution {
  process(input: Data): Result;
  optimize(): void;
  validate(): boolean;
}

class Implementation implements Solution {
  process(input: Data): Result {
    // Processing logic here
    return transformData(input);
  }
}`,
            'typescript',
            'Here\'s a practical example of how to implement the concepts we\'ve discussed:'
          )
        };
        
      case 'stats':
        return {
          index,
          ...SLIDE_TEMPLATES.statsSlide(
            'By the Numbers',
            [
              { value: '85%', label: 'Efficiency Improvement' },
              { value: '3.2x', label: 'Performance Boost' },
              { value: '50%', label: 'Cost Reduction' }
            ]
          )
        };
        
      case 'timeline':
        return {
          index,
          ...SLIDE_TEMPLATES.timelineSlide(
            'Evolution Timeline',
            [
              { date: '2020', event: 'Initial concept development' },
              { date: '2021', event: 'First prototype released' },
              { date: '2022', event: 'Major breakthrough achieved' },
              { date: '2023', event: 'Industry-wide adoption' },
              { date: '2024', event: 'Next generation features' }
            ]
          )
        };
        
      case 'comparison':
        return {
          index,
          ...SLIDE_TEMPLATES.comparisonSlide(
            'Comparative Analysis',
            'Advantages',
            ['High performance', 'Cost-effective', 'Scalable', 'User-friendly'],
            'Considerations',
            ['Initial setup time', 'Learning curve', 'Integration needs', 'Maintenance']
          )
        };
        
      case 'quote':
        return {
          index,
          ...SLIDE_TEMPLATES.quoteSlide(
            'The future belongs to those who believe in the beauty of their dreams.',
            'Eleanor Roosevelt'
          )
        };
        
      default:
        return {
          index,
          layout: 'default',
          content: `# Slide ${index - 2}\n\nContent for ${topic}`
        };
    }
  }
}