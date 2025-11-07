import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [class]="'w-' + size + ' h-' + size" [attr.fill]="color" [attr.viewBox]="viewBox" xmlns="http://www.w3.org/2000/svg">
      <ng-content></ng-content>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: string = '6';
  @Input() color: string = 'currentColor';
  @Input() viewBox: string = '0 0 24 24';
}

