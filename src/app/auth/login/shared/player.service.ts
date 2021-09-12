import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Player} from './player'
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PlayerService{

    constructor(private http:HttpClient) {}

        getAllPlayers(senior): Observable<Player[]> {
          let params = new HttpParams()
          .set('isSenior', senior);

          return this.http.get<Player[]>('http://localhost:8080/player', {params: params});
        }
        
        getOneById(playerId): Observable<Player> {
           let params = new HttpParams()
           .set('playerId', playerId);

           return this.http.get<Player>(`http://localhost:8080/player/view`, {params: params});
        }

        addPlayer(player: Player):Observable<Player>{
            return this.http.post<Player>(`http://localhost:8080/player/add`, player)
        }

        updatePlayer(player: Player): Observable<Player> {
          return this.http.put<Player>(`http://localhost:8080/player/update`, player);
        }

        deletePlayer(playerId): Observable<void> {
            return this.http.delete<void>(`http://localhost:8080/player/delete/${playerId}`);
        }
}