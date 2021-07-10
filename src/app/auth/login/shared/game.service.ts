import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  getOneById(gameId): Observable<Game> {
    let params = new HttpParams()
    .set('gameId', gameId);
    return this.httpClient.get<any>(`http://localhost:8080/game/view`, {params: params});
  }
   
  updateGame(tournamentId, game): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8080/game/update/${tournamentId}`, game);
  }

  deleteGame(gameId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/game/delete/${gameId}`);
}

}
