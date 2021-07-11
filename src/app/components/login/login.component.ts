import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    if (this.authService.isLoggedIn = true) {
      this.router.navigate(['/'])
    }
  }
  
  loginForm: FormGroup = this.fb.group({
    email: [null, {
      validators: [Validators.required, Validators.email]
    }],
    password: [null, {
      validators: [Validators.required]
    }],
  })
  get f() { return this.loginForm.controls; }


  login() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;
      this.authService.login(email, password);
    } else {
      this._snackBar.open("Please insert Correct Value!");
    }
  }

  ngOnInit(): void {
  }

}
