import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/shared/auth.service';
import { ToastrService } from 'ngx-toastr copy';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router:Router, private toastr: ToastrService) { }

  isLoggedIn: boolean;

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout;
    this.router.navigateByUrl('');
    this.toastr.success('Logout Succesful');
  }

}
