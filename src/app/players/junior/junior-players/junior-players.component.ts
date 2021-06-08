import { HttpErrorResponse } from '@angular/common/http';
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
  deleteMsg: boolean = false;
  updateMsg: boolean = false;
  public editJunior: Player;
  public deleteJunior: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getAllJuniors(this.senior);
  }

  getAllJuniors(senior:boolean): void {
    this.playerService.getAllPlayers(senior).subscribe((junior: Player[]) => {
      this.juniors$ = junior;
    });
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        this.getAllJuniors(this.senior);
        this.updateMsg = true;
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
        this.deleteMsg = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
