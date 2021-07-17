import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../auth/login/shared/game';
import { GameService } from '../auth/login/shared/game.service';
import { Tournament } from '../auth/login/shared/tournament';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { PlayerService } from '../auth/login/shared/player.service';
import { Player } from '../auth/login/shared/player';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';
import { NgForm } from '@angular/forms';
import { $ } from 'protractor';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-viewgame',
  templateUrl: './viewgame.component.html',
  styleUrls: ['./viewgame.component.css']
})
export class ViewgameComponent implements OnInit {

  players: Player[];
  id: number;
  tournamentId: number;
  game: Game;
  tournament: Tournament;
  public editGame: Game;
  public deleteGame: Game;
  public addedPlayers: Player[];
  checkedPlayers = [];
  displayPlayers: Player[];

  constructor(private gameService: GameService,private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService, private location: Location, private playerService: PlayerService) { }

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
      this.playerService.getPlayersList().subscribe(
        (data) => {
          this.players = data;
        }, 
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      
      this.getAllPlayersInAGame(this.id);
  }

  goToList() {
    this.location.back();
  }

  
  onUpdateGame(tournamentId, game: Game): void {
    this.gameService.updateGame(tournamentId, game).subscribe(
      () => {
        this.toastr.success("Meci modificat cu succes.");
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
  }

  public listOfAddedPlayers(gameId, playersToSave: Player[]): void {
        for(let i in this.checkedPlayers) {
            playersToSave[i] = this.checkedPlayers[i];
        }

        this.gameService.addPlayersToAGame(gameId, playersToSave).subscribe(
          (data) => {
            console.log(data);
            this.toastr.success("Players added.");
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
