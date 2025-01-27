import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.development';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DividerModule, CommonModule, ReactiveFormsModule],
  template: `
      <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
          <div style="">
            <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 16px">
              <div class="text-center mb-8">
                <div class="flex items-center justify-center">
                    <img src="assets/images/logo.svg" alt="Logo">
                </div>
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-sans font-bold mb-4 mt-8">Create Your Account</div>
                <span class="text-muted-color text-sm font-sans font-medium">Sign up to start organizing your notes and boost your productivity.</span>
              </div>

              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-sm font-sans font-medium mb-2">Email Address</label>
                <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" formControlName="email" />
                <div *ngIf="email.invalid && email.touched">
                  <small *ngIf="email.errors?.['required']" class="text-red-500">Email is required.</small>
                </div>

                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-sans font-medium text-sm mb-2">Password</label>
                <p-password id="password1" formControlName="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                <div *ngIf="password.invalid && password.touched">
                  <small *ngIf="password.errors?.['required']" class="text-red-500">Password is required.</small>
                  <small *ngIf="password.errors?.['minlength']" class="text-red-500">
                    At least {{ password.errors?.['minlength'].requiredLength }} characters.
                  </small>
                </div>

                <div class="flex items-center justify-start">
                    <p-button icon="pi pi-info-circle" [rounded]="true" [text]="true" severity="secondary" class="text-neutral-600" />
                    <span class="font-medium no-underline ml-2 text-right text-xs text-primary text-neutral-600">At least 8 characters</span>
                </div>

                <p-button type="submit" [disabled]="form.invalid" label="Sign Up" class="font-sans" styleClass="w-full"></p-button>

                
              </form>
              <p-divider />
              <div class="flex flex-col items-center">
                <span class="text-neutral-600 text-sm font-sans font-medium mt-4 mb-4">Or log in with:</span>
                <p-button label="Google" icon="pi pi-google" class="font-sans text-neutral-950 w-full" variant="outlined" severity="secondary" styleClass="w-full"></p-button>
              </div>
              <p-divider />
              <div class="flex items-center justify-center">
                <span class="text-neutral-600 text-sm font-sans font-medium">Already have an account?</span>
                <a class="text-neutral-900 text-sm font-sans font-medium cursor-pointer underline ml-1" (click)="logIn()">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class Register {
  form!: FormGroup;
  private apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value
      this.http.post(this.apiUrl+"/api/test", data).subscribe({
        next: (respuesta) => {
          console.log('Formulario enviado correctamente', respuesta);
        },
        error: (err) => {
          console.error('Error al enviar el formulario', err);
        }
      });
    }
  }

  logIn() {
    this.router.navigate(['/auth/login']);
  }
}
