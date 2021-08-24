import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../auth/login/shared/tournament.service';
import { ToastrService } from 'ngx-toastr';
import { Tournament } from '../auth/login/shared/tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../auth/login/shared/auth.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];
  tournament: Tournament;
  activeTournaments: Tournament[];
  endedTournaments: Tournament[];

  constructor(private tournamentService: TournamentService, private toastr: ToastrService, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllTournaments();
  }

  hideOrShowButtons(): boolean {
    return this.authService.isAuthenticated;
  }

  getAllTournaments(): void {
      this.tournamentService.getAllTournaments().subscribe((tournament: Tournament[]) => {
         this.tournaments = tournament;
      });
  }

  getActiveTournaments(): void {
    const toAdd = this.tournaments.filter((tournament) => {
      return tournament.active == true;
    });
    console.log(toAdd);
    this.activeTournaments = toAdd;
  }

  getEndedTournaments(): void {
    const toAdd = this.tournaments.filter((tournament) => {
        return tournament.active == false;
    });
    console.log(toAdd);
    this.endedTournaments = toAdd;
  }

  public onAddTournament(addForm: NgForm): void {
    document.getElementById('add-tournament-form')!.click();
    this.tournamentService.addTournament(addForm.value).subscribe(
      () => {
        addForm.reset();
        this.getAllTournaments();
        this.toastr.success("Tournament added!")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  goToViewTournament(id: number) {
    this.route.navigate(['tournamentDetails'], {queryParams: { tournamentId: id}});
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
