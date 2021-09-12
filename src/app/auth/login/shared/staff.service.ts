import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) { }

  getAllStaffMembers(): Observable<Staff[]> {

    return this.httpClient.get<Staff[]>('http://localhost:8080/staff/all')
  }

  addStaffMember(staffMember: Staff): Observable<Staff>{

    return this.httpClient.post<Staff>(`http://localhost:8080/staff/add`, staffMember);
  }
  
  updateStaffMember(staffMember: Staff): Observable<void> {

    return this.httpClient.put<void>(`http://localhost:8080/staff/update`, staffMember);
  }

  deleteStaffMember(staffId: number): Observable<void> {
    
    return this.httpClient.delete<void>(`http://localhost:8080/staff/delete/${staffId}`);
  }

}
