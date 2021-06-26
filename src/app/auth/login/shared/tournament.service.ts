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


  getAllTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>('http://localhost:8080/tournament/all')
  }

  getOneById(tournamentId): Observable<Tournament> {
    let params = new HttpParams()
    .set('tournamentId', tournamentId);
    return this.httpClient.get<any>(`http://localhost:8080/tournament/view`, {params: params});
  }

  addTournament(tournament: Tournament):Observable<Tournament>{
    return this.httpClient.post<Tournament>(`http://localhost:8080/tournament/add`, tournament);
  }
}
