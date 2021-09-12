import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/login/shared/auth.service';
import { Staff } from '../auth/login/shared/staff';
import { StaffService } from '../auth/login/shared/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staffList: Staff[];
  editStaff: Staff;
  deleteStaff: Staff;

  constructor(private staffService: StaffService, private route: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllStaffMembers();
  }

  getAllStaffMembers(): void {
    this.staffService.getAllStaffMembers().subscribe((apiStaffList: Staff[]) => {
      this.staffList = apiStaffList;
    });
  }
  
  onAddStaffMember(addForm: NgForm): void {
    document.getElementById('add-staff-form')!.click();
    this.staffService.addStaffMember(addForm.value).subscribe(
      () => {
        addForm.reset();
        this.toastr.success("Staff member added succesfully");
        this.getAllStaffMembers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  onUpdateStaffMember(staffMember: Staff): void {
    this.staffService.updateStaffMember(staffMember).subscribe(
      () => {
        this.getAllStaffMembers();
        this.toastr.success("Staff member edited!")
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteStaffMember(staffId: number): void {
    this.staffService.deleteStaffMember(staffId).subscribe (
      () => {
        this.getAllStaffMembers();
        this.toastr.error("Staff member deleted!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  hideOrShowButtons(): boolean {
    return this.authService.isAuthenticated;
  }

  onOpenModal(staffMember: Staff, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStaffModal');
    }
    if (mode === 'edit') {
      this.editStaff = staffMember;
      button.setAttribute('data-target', "#updateStaffModal");
    }
    if (mode === 'delete') {
      this.deleteStaff = staffMember;
      button.setAttribute('data-target', '#deleteStaffModal');
    }
    container.appendChild(button);
    button.click();
   }

}
