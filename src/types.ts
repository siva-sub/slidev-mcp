export interface SlidevResult {
  success: boolean;
  message: string;
  output?: string | number | string[];
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
}

export interface CoverOptions extends SlideOptions {
  title: string;
  subtitle?: string;
  author?: string;
  pythonStringTemplate?: string;
}