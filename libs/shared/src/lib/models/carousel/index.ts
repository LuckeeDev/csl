interface IAnimationParams {
  time: string;
  translate: string;
}

export interface IImage {
  link: string;
}

export interface ICarouselImage extends IImage {
  state: 'in' | 'out';
  params?: IAnimationParams;
}
