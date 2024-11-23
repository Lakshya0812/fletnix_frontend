import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder , private apiService : ApiService , private loaderService : LoaderService , private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  error = ''

  onSubmit(): void {
    this.loaderService.show()
    if (this.loginForm.valid) {
      console.log('Login successful', this.loginForm.value);
      this.apiService.login(this.loginForm.value).subscribe(
        (data) => {
          // this.netflixData = data.results;
          console.log(data)
          localStorage.setItem('authToken' , data.data.token)
          localStorage.setItem('user' , data.data.user)
          this.loaderService.hide()
          this.router.navigate(['/content'])
        },
        (error) => {
          this.error = error;
          this.loaderService.hide()
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
