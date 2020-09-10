import { Directive, Renderer2, Input, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef, private render: Renderer2) { }

    ngOnInit(){}

    @HostListener('click') toogleOpen(){
        this.isOpen = !this.isOpen
    }

}