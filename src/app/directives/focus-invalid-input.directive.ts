import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[focusInvalidInput]'
})
export class FocusInvalidInputDirective {
  @Input() formGroup: FormGroup | undefined;

  constructor(private el: ElementRef) { }

  @HostListener('submit', ['$event'])
  public onSubmit(event: { preventDefault: () => void; }): void {
    if (!this.formGroup?.valid) {
      event.preventDefault();

      const formGroupInvalid = this.el.nativeElement.querySelectorAll('input.ng-invalid');
      (formGroupInvalid[0]).focus();
    }
  }
}
