import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/auth/login/shared/tournament';
import { TournamentService } from 'src/app/auth/login/shared/tournament.service';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit {

  tournament = new Tournament();
  id: number;

  constructor(private tournamentService: TournamentService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      const tournamentId = params['tournamentId'];
      this.id = tournamentId;
    })
    this.tournamentService.getOneById(this.id).subscribe(
      data => {
        this.tournament = data;
      },
      (error: HttpErrorResponse) => {
         alert(error.message);
         
      }
    );
  }

  goToList() {
    this.route.navigate(['tournament']);
  }

}
