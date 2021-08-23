import { HttpErrorResponse } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Player } from '../../auth/login/shared/player';
import { PlayerService} from '../../auth/login/shared/player.service';

@Component({
  selector: 'app-senior',
  templateUrl: './senior.component.html',
  styleUrls: ['./senior.component.css']
})
export class SeniorComponent implements OnInit {

  seniors$: Player[];
  public editSenior: Player;
  public deleteSenior: Player;
  isSenior = true;
  
  constructor(private playerService: PlayerService, private toastr: ToastrService, private route: Router) {
   }

  ngOnInit() {
    this.getAllSeniors(this.isSenior);
  }

  getAllSeniors(isSenior: boolean): void {
    this.playerService.getAllPlayers(isSenior).subscribe((senior: Player[]) => {
      this.seniors$ = senior;
    });
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        this.getAllSeniors(this.isSenior);
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
        this.getAllSeniors(this.isSenior);
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
      this.editSenior = player;
      button.setAttribute('data-target', "#updateSeniorModal");
    }
    if(mode === 'delete') {
      this.deleteSenior = player;
      button.setAttribute('data-target', '#deleteSeniorModal');
    }
    container.appendChild(button);
    button.click();
  }
}
