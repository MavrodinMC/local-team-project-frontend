import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/login/shared/auth.service';
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
  public editJunior: Player;
  public deleteJunior: Player;

  constructor(private playerService: PlayerService, private toastr: ToastrService, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAllJuniors(this.senior);
  }

  hideOrShowButtons(): boolean {
    return this.authService.isAuthenticated;
  }

  getAllJuniors(senior:boolean): void {
    this.playerService.getAllPlayers(senior).subscribe((junior: Player[]) => {
      this.juniors$ = junior;
    });
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      () => {
        this.getAllJuniors(this.senior);
        this.toastr.success("Played edited succesfully.")
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePlayer(playerId: number) : void {
    this.playerService.deletePlayer(playerId).subscribe (
      (response: void) => {
        console.log(response);
        this.getAllJuniors(this.senior);
        this.toastr.error("Player deleted!")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goToViewPlayer(id: number) {
    this.route.navigate(['playerDetails'], {queryParams: { playerId: id}});
  }

   
  public onOpenModal(player: Player, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editJunior = player;
      button.setAttribute('data-target', "#updateJuniorModal");
    }
    if(mode === 'delete') {
      this.deleteJunior = player;
      button.setAttribute('data-target', '#deleteJuniorModal');
    }
    container.appendChild(button);
    button.click();
  }

}
