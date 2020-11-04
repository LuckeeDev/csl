import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[rounded]',
})
export class RoundedDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.borderRadius = '20px';
  }
}
