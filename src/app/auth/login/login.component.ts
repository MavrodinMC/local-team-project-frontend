import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr copy';
import { LoginRequestPayload } from './login.request.payload';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  registerSuccesMessage: string;
  isLoggedIn: boolean;


  constructor(private authService: AuthService,
    private router:Router, private toastr: ToastrService) {
      this.loginRequestPayload = {
        username: '',
        password: ''
      }
     }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm
    .get('password').value;

    this.authService.login(this.loginRequestPayload)
    .subscribe(data => {
      if(data) {
        this.isError = false;
        this.router.navigateByUrl('senior');
        this.toastr.success('Login Succesful');
        this.isLoggedIn = true;
      } else {
        this.isError = true;
        this.isLoggedIn = false;
      }
    })
  }
}
