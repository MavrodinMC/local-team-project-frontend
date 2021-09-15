import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  sendMessageFromContactForm(contactInfo: Contact): Observable<boolean> {
        
    return this.httpClient.post<boolean>('http://localhost:8080/contact/send', contactInfo);
  }
}
