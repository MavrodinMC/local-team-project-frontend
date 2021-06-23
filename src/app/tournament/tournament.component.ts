import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../auth/login/shared/tournament.service';
import { ToastrService } from 'ngx-toastr copy';
import { Tournament } from '../auth/login/shared/tournament';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];
  tournament: Tournament;

  constructor(private tournamentService: TournamentService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTournaments();
  }

  getAllTournaments(): void {
      this.tournamentService.getAllTournaments().subscribe((tournament: Tournament[]) => {
         this.tournaments = tournament;
      });
  }

  getOne(id): void {
    this.tournamentService.getOneById(id).subscribe(
      (data: Tournament) => {
        this.toastr.error('Nu exista meciuri pentru acest campionat.')
      }
    )
  }

  public onAddTournament(addForm: NgForm): void {
    document.getElementById('add-tournament-form')!.click();
    this.tournamentService.addTournament(addForm.value).subscribe(
      (response: Tournament) => {
        addForm.reset();
        this.toastr.success("Competitie adaugata cu succes!.")
        this.getAllTournaments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(tournament: Tournament, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addTournamentModal');
    }
    container.appendChild(button);
    button.click();
  }

}
