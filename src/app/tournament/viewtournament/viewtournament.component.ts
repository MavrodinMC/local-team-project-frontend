import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/auth/login/shared/tournament';
import { TournamentService } from 'src/app/auth/login/shared/tournament.service';
import { ToastrService } from 'ngx-toastr copy';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Game } from 'src/app/auth/login/shared/game';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit {

  tournaments: Tournament[];
  games: Game[];
  tournament: Tournament;
  id: number;
  public editTournament: Tournament;
  public deleteTournament: Tournament;
  game: Game;
  tournamentId: number;

  constructor(private tournamentService: TournamentService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      const tournamentId = params['tournamentId'];
      this.id = tournamentId;
    });
    this.tournamentService.getOneById(this.id).subscribe(
      data => {
        this.tournament = data;
      },
      (error: HttpErrorResponse) => {
         alert(error.message);
      }
    );
    this.tournamentService.getGamesList(this.id).subscribe (
      data => {
        this.games = data;
        console.log(this.games);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
     }
    );
  }


  goToList() {
    this.route.navigate(['tournament']);
  }

  onAddGame(tournamentId, addForm: NgForm): void {
    
    document.getElementById('add-game-form')!.click();
    this.tournamentService.addGameToATournament(tournamentId, addForm.value).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Meci salvat cu succes.");
        addForm.reset();
      },
      (error: HttpErrorResponse) => {

         alert(error.message);
         addForm.reset();
         
      }
    );
  }

  onUpdateTournament(tournament: Tournament): void {
    this.tournamentService.updateTournament(tournament).subscribe(
      () => {
        this.route.navigate(['tournament']);
        this.toastr.success("Campionat modificat cu succes.")
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteTournament(tournamentId) : void {
    this.tournamentService.deleteTournament(tournamentId).subscribe (
      () => {
        this.route.navigate(['tournament']);
        this.toastr.error("Tournament deleted!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(tournament: Tournament, mode: string): void {
    const container = document.getElementById('view-tournament');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editTournament = tournament;
      button.setAttribute('data-target', "#updateTournamentModal");
    }
    if(mode === 'delete') {
      this.deleteTournament = tournament;
      button.setAttribute('data-target', '#deleteTournamentModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onOpenGameModal(game: Game, mode: string): void {
    const container = document.getElementById('view-tournament');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addGameModal');
    }
    container.appendChild(button);
    button.click();
  }

}
