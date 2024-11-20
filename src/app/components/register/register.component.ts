import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder , private apiService : ApiService , private loaderService : LoaderService , private router : Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(0)]],
    });
  }

  error = ''

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      this.apiService.register(this.registerForm.value).subscribe(
        (data) => {
          // this.netflixData = data.results;
          if(data.status == "success"){
            this.router.navigate(['/login'])
          }else{
            console.log('error' , data.data)
          }
        },
        (error) => {
          this.error = error;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
