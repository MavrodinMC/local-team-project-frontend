import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/login/shared/auth.service';
import { Contact } from '../auth/login/shared/contact';
import { ContactService } from '../auth/login/shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  contactInfo: Contact;

  constructor(private contactService: ContactService,private toastr: ToastrService, private router:Router, private authService: AuthService) { 
    this.contactInfo = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }

  ngOnInit(): void {

    this.messageForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
      });
  }

  sendMessageFromContactForm() {
       
    this.contactInfo.name = this.messageForm.get('name').value;
    this.contactInfo.email = this.messageForm
    .get('email').value;
    this.contactInfo.subject = this.messageForm.get('subject').value;
    this.contactInfo.message = this.messageForm
    .get('message').value;

    this.contactService.sendMessageFromContactForm(this.contactInfo).subscribe(data => {
      if (data) {
        this.toastr.success("Message was sent succesfully.");
        this.router.navigateByUrl('contact');
        this.messageForm.reset();
      } else {
        this.toastr.error("Something went wrong...")
      }
    });
  }

}
