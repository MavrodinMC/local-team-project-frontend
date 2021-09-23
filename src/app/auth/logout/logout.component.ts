import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  

  constructor(private authService: AuthService,
    private router:Router, private toastr: ToastrService) { 
    }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
    this.toastr.success('You were logged out');
  }

}
