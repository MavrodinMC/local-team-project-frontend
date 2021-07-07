import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr copy';
import { Player } from 'src/app/auth/login/shared/player';
import { PlayerService } from 'src/app/auth/login/shared/player.service';

@Component({
  selector: 'app-viewplayer',
  templateUrl: './viewplayer.component.html',
  styleUrls: ['./viewplayer.component.css']
})
export class ViewplayerComponent implements OnInit {

  id: number;
  player: Player;

  constructor(private playerService: PlayerService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const playerId = params['playerId'];
      this.id = playerId;
    });
    this.playerService.getOneById(this.id).subscribe(
      data => {
        this.player = data;
      },
      (error: HttpErrorResponse) => {
         alert(error.message);
      }
    );
  }

  goToList(): void {
    if(this.player.senior === true) {
      this.route.navigate(['senior']);
    } else {
      this.route.navigate(['junior']);
    }
  }

}
