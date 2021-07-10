import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../auth/login/shared/game';
import { GameService } from '../auth/login/shared/game.service';
import { Tournament } from '../auth/login/shared/tournament';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-viewgame',
  templateUrl: './viewgame.component.html',
  styleUrls: ['./viewgame.component.css']
})
export class ViewgameComponent implements OnInit {

  id: number;
  tournamentId: number;
  game: Game;
  tournament: Tournament;
  public editGame: Game;
  public deleteGame: Game;

  constructor(private gameService: GameService,private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService, private location: Location) { }

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
  }

  goToList() {
    this.location.back();
  }

  onUpdateGame(tournamentId, game: Game): void {
    this.gameService.updateGame(tournamentId, game).subscribe(
      () => {
        this.toastr.success("Meci modificat cu succes.");
        this.location.back();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

}
