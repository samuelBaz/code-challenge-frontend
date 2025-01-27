import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AppMenu],
  template: ` <div class="layout-sidebar">
      <div class="flex items-center pt-6 pb-6">
          <img src="assets/images/logo.svg" alt="Logo">
      </div>
      <app-menu></app-menu>
    </div>`
})
export class AppSidebar {
  constructor(public el: ElementRef) { }
}
