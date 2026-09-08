 
export interface HeroImage {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  isActive?: boolean;
}

export interface HeroResponse {
  success: boolean;
  data: HeroImage[];
  message?: string;
}

export interface HeroProps {
  autoplayDelay?: number;
  height?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    xl?: string;
  };
  showControls?: boolean;
  showIndicators?: boolean;
  showCounter?: boolean;
  className?: string;
}

export interface HeroState {
  currentSlide: number;
  direction: number;
  isAutoPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}