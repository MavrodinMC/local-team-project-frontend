import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Player} from './player'
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PlayerService{

    constructor(private http:HttpClient) {}

     httpOptionsPlain = {
        headers: new HttpHeaders({
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
        }),
        'responseType': 'text'
      };

        getAllPlayers(senior): Observable<Player[]> {
          let params = new HttpParams()
          .set('isSenior', senior);

          return this.http.get<Player[]>('http://localhost:8080/player', {params: params});
        }
        
        addPlayer(player: Player):Observable<Player>{
            return this.http.post<Player>(`http://localhost:8080/player/add`, player)
        }

        updatePlayer(player: Player): Observable<Player> {
          return this.http.put<Player>(`http://localhost:8080/player/update`, player);
        }

        deletePlayer(playerId: number): Observable<void> {
            return this.http.delete<void>(`http://localhost:8080/player/delete/${playerId}`);
        }
}