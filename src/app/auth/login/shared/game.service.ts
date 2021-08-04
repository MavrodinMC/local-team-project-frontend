import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game';
import { Player } from './player';

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

  getAllPlayersInAGame(gameId): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/game/players/all/${gameId}`);
  }

  getPlayersList(gameId): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/game/players/list/${gameId}`)
  }
   
  updateGame(tournamentId, game): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8080/game/update/${tournamentId}`, game);
  }

  addPlayersToAGame(gameId, players: Player[]): Observable<void> {
    return this.httpClient.post<void>(
      `http://localhost:8080/game/players/${gameId}`, players);
  }

  deleteGame(gameId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/game/delete/${gameId}`);
  }

  deleteAPlayerFromAGame(gameId: number, playerId: number):Observable<void> {

    return this.httpClient.delete<void>(
      `http://localhost:8080/game/players/delete/${gameId}/${playerId}`
    );
  }

}
