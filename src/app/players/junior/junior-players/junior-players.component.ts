import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/auth/login/shared/player';
import { PlayerService } from 'src/app/auth/login/shared/player.service';

@Component({
  selector: 'app-junior-players',
  templateUrl: './junior-players.component.html',
  styleUrls: ['./junior-players.component.css']
})
export class JuniorPlayersComponent implements OnInit {

  juniors$: Player[];
  senior: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getAllJuniors(this.senior);
  }

  getAllJuniors(isSenior:boolean): void {
    this.playerService.getAllPlayers(isSenior).subscribe((junior: Player[]) => {
      this.juniors$ = junior;
    });
  }

}
