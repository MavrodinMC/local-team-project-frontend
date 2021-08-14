import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  isLoggedIn = false;


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
    const hideLogin = document.getElementById('hide-button');

    this.authService.login(this.loginRequestPayload)
    .subscribe(data => {
      if(data) {
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success("Login succesfull");
        this.isLoggedIn = true;
        hideLogin.style.display = 'none';
        
      } else {
        this.isError = true;
        hideLogin.style.display = 'visible';
      }
    })
  }

}
