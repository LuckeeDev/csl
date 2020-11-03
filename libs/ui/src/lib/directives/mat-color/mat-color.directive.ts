import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appMatColor]',
})
export class MatColorDirective implements OnInit {
  @Input()
  appMatColor: 'primary' | 'accent' | 'warn';

  @HostBinding('class')
  elementClass: 'color-primary' | 'color-accent' | 'color-warn';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appMatColor === 'primary') {
      this.elementClass = 'color-primary';
    } else if (this.appMatColor === 'accent') {
      this.elementClass = 'color-accent';
    } else if (this.appMatColor === 'warn') {
      this.elementClass = 'color-warn';
    }
  }
}
