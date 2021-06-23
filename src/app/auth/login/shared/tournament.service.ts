import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournament } from './tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {


  constructor(private httpClient: HttpClient) {
   }

  //  httpOptionsPlain = {
  //   headers: new HttpHeaders({
  //     'Accept': 'text/plain',
  //     'Content-Type': 'text/plain'
  //   }),
  //   'responseType': 'text'
  // };


  getAllTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>('http://localhost:8080/tournament/all')
  }

  getOneById(id): Observable<Tournament> {
    let params = new HttpParams()
    .set('tournamentId', id);
    return this.httpClient.get<Tournament>(`http://localhost:8080/tournament`, {params: params});
  }

  addTournament(tournament: Tournament):Observable<Tournament>{
    return this.httpClient.post<Tournament>(`http://localhost:8080/tournament/add`, tournament);
  }
}
