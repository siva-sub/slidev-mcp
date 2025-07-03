export interface SlidevResult {
  success: boolean;
  message: string;
  output?: string | number | string[] | SlideData[] | ThemeConfig | SlideReviewResult | any;
}

export interface SlidevProject {
  path: string;
  slidesPath: string;
}

export interface SlideOptions {
  layout?: string;
  theme?: string;
  transition?: string;
  background?: string;
  image?: string;
  url?: string;
  backgroundSize?: string;
  class?: string;
  clicks?: number;
  level?: number;
  preload?: boolean;
  zoom?: number;
}

export interface CoverOptions extends SlideOptions {
  title: string;
  subtitle?: string;
  author?: string;
  pythonStringTemplate?: string;
}

export interface SlideData {
  index: number;
  content: string;
  layout?: string;
  frontmatter?: SlideOptions;
}

export interface BulkSlideInput {
  topic: string;
  slideCount?: number;
  style?: 'minimal' | 'detailed' | 'visual' | 'academic';
  includeAnimations?: boolean;
  includeCode?: boolean;
  includeImages?: boolean;
  theme?: string;
  customInstructions?: string;
}

export interface ThemeConfig {
  name: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  transition?: string;
  customCSS?: string;
}

export interface AnimationConfig {
  type: 'v-click' | 'v-after' | 'v-click-hide' | 'v-motion' | 'transition';
  target?: string;
  options?: {
    at?: number | string;
    hide?: boolean | number | [number, number];
    depth?: number;
    every?: number;
    initial?: Record<string, any>;
    enter?: Record<string, any>;
    leave?: Record<string, any>;
    click?: Record<string, any>;
  };
}

export interface ComponentConfig {
  type: string;
  props?: Record<string, any>;
  children?: string | ComponentConfig[];
}

export interface SlideReviewResult {
  slideCount: number;
  themes: string[];
  layouts: string[];
  hasAnimations: boolean;
  hasComponents: boolean;
  suggestions: string[];
}