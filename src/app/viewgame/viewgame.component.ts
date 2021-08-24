import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../auth/login/shared/game';
import { GameService } from '../auth/login/shared/game.service';
import { Tournament } from '../auth/login/shared/tournament';
import { ToastrService } from 'ngx-toastr';
import { getLocaleDayPeriods, Location } from '@angular/common';
import { PlayerService } from '../auth/login/shared/player.service';
import { Player } from '../auth/login/shared/player';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../auth/login/shared/auth.service';


@Component({
  selector: 'app-viewgame',
  templateUrl: './viewgame.component.html',
  styleUrls: ['./viewgame.component.css']
})
export class ViewgameComponent implements OnInit {

  players = [];
  id: number;
  tournamentId: number;
  game: Game;
  tournament: Tournament;
  public editGame: Game;
  public deleteGame: Game;
  public addedPlayers: Player[];
  checkedPlayers = [];
  displayPlayers = [];

  constructor(private gameService: GameService,private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService, private location: Location, private authService: AuthService) { }

  ngOnInit(){
    
    this.activatedRoute.queryParams.subscribe(params => {
      const gameId = params['gameId'];
      this.id = gameId;
    });
    this.gameService.getOneById(this.id).subscribe(
      data => {
        this.game = data;
      },
      (error: HttpErrorResponse) => {
         alert(error.message);
      }
    );
      this.getPlayersList(this.id);
      this.getAllPlayersInAGame(this.id);
  }

  hideOrShowButtons(): boolean {
    return this.authService.isAuthenticated;
  }

  goToList() {
    this.location.back();
  }

  getPlayersList(gameId) {
    this.gameService.getPlayersList(gameId).subscribe(
      (data) => {
        this.players = data;
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  onUpdateGame(tournamentId, game: Game): void {
    this.gameService.updateGame(tournamentId, game).subscribe(
      () => {
        this.toastr.success("Game edited!");
        this.ngOnInit();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  change(player) {

    let updateItem = this.checkedPlayers.find(this.findIndexToUpdate, player.id);
    let index = this.checkedPlayers.indexOf(updateItem);

    if(index > -1) {
      this.checkedPlayers.splice(index, 1);
    }
    else {
      this.checkedPlayers.push(player);
      console.log(this.checkedPlayers);
    }
  }

  findIndexToUpdate(player) {
    return player.id === this;
  }

  onDeleteGame(gameId) : void {
    this.gameService.deleteGame(gameId).subscribe (
      () => {
        this.toastr.error("Game deleted!");
        this.location.back();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllPlayersInAGame(gameId): void {
    
    this.gameService.getAllPlayersInAGame(gameId).subscribe(
      (data) => {
        console.log(data);
        this.displayPlayers = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  public listOfAddedPlayers(gameId, playersToSave: Player[]): void {
    
        for(let i in this.checkedPlayers) {
            playersToSave[i] = this.checkedPlayers[i];
        }

        this.gameService.addPlayersToAGame(gameId, playersToSave).subscribe(
          (data) => {
            this.getAllPlayersInAGame(gameId);
            console.log(data);
            this.toastr.success("Players added.");
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );

  } 

  public deleteAPlayerFromGameList(gameId, playerId): void {

    this.gameService.deleteAPlayerFromAGame(gameId, playerId).subscribe(
      () => {
        this.toastr.error("Player deleted from list.");
        this.getAllPlayersInAGame(gameId);
        this.getPlayersList(gameId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(game: Game, mode: string): void {
    const container = document.getElementById('view-game');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editGame = game;
      button.setAttribute('data-target', "#updateGameModal");
    }
    if(mode === 'delete') {
      this.deleteGame = game;
      button.setAttribute('data-target', '#deleteGameModal');
    }
    container.appendChild(button);
    button.click();
  }


  public onAddPlayerModal(players: Player[],mode: string): void {
    const container = document.getElementById('add-players-btn');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'addPlayers') {
      this.addedPlayers = players;
      button.setAttribute('data-target', "#addPlayersModal");
    }
    container.appendChild(button);
    button.click();
  }

}
