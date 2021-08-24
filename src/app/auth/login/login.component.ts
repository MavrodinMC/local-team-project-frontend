import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { runInThisContext } from 'node:vm';
import { HeaderComponent } from 'src/app/header/header.component';
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
  isLoggedIn: boolean = false;

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
        this.isLoggedIn = true;
        this.router.navigateByUrl('');
        this.toastr.success("Login succesfull");
      } else {
        this.isError = true;
      }
    })
  }

}
