import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DividerModule],
  template: `
      <div class="grid grid-cols-4 layout-main">
        <div class="col-span-1 col-start-1 ... bg-white pt-4 pl-8 pr-4">
          <p-button label="Login" class="font-sans" styleClass="w-full" routerLink="/"></p-button>
        </div>
        <div class="col-span-2 col-start-2 ... bg-white border-x border-x-neutral-200">02</div>
        <div class="col-span-1 col-start-4 ... bg-white">03</div>
      </div>
    `
})
export class Test {
}
