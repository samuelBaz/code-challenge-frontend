import { Routes } from '@angular/router';
import { Login } from './login';
import { Error } from './error';
import { Register } from './register';

export default [
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
] as Routes;
