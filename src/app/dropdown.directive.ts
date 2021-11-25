import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  private isOpened: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostBinding('class.show') get opened() {
    return this.isOpened;
  }

  @HostListener('click') open() {
    this.isOpened = true;
    let dropdownMenu = this.element.nativeElement.querySelector('.dropdown-menu');
    this.renderer.addClass(dropdownMenu, 'show');
  }

  @HostListener('mouseleave') close() {
    this.isOpened = false;
    let dropdownMenu = this.element.nativeElement.querySelector('.dropdown-menu');
    this.renderer.removeClass(dropdownMenu, 'show');
  }
}
