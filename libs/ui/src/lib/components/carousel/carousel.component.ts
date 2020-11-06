import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ICarouselImage, IImage } from '@csl/shared';
import { slideIn, slideOut } from './carousel.animations';

@Component({
  selector: 'csl-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', [useAnimation(slideIn)]),
      transition('in => out', [useAnimation(slideOut)]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @Input()
  images: IImage[];

  carouselImages: ICarouselImage[];

  slideIndex: number;

  constructor() {
    this.slideIndex = 0;
  }

  ngOnInit(): void {
    this.carouselImages = this.images.map((image, i) => {
      return {
        ...image,
        state: i === 0 ? 'in' : 'out',
      };
    });
  }

  next() {
    this.carouselImages[this.slideIndex].params = {
      time: '300ms',
      translate: '-100%',
    };
    this.carouselImages[this.slideIndex].state = 'out';

    this.slideIndex =
      this.slideIndex + 1 === this.carouselImages.length
        ? 0
        : this.slideIndex + 1;

    this.carouselImages[this.slideIndex].params = {
      time: '300ms',
      translate: '100%',
    };
    this.carouselImages[this.slideIndex].state = 'in';
  }

  previous() {
    this.carouselImages[this.slideIndex].params = {
      time: '300ms',
      translate: '100%',
    };
    this.carouselImages[this.slideIndex].state = 'out';

    this.slideIndex =
      this.slideIndex === 0
        ? this.carouselImages.length - 1
        : this.slideIndex - 1;

    this.carouselImages[this.slideIndex].params = {
      time: '300ms',
      translate: '-100%',
    };
    this.carouselImages[this.slideIndex].state = 'in';
  }

  slideTo(n: number) {
    if (n > this.slideIndex) {
      while(this.slideIndex !== n) {
        this.next();
      }
    } else {
      while(this.slideIndex !== n) {
        this.previous();
      }
    }
  }
}
