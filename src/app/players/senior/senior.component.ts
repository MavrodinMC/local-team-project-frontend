import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../../auth/login/shared/player';
import { PlayerService} from '../../auth/login/shared/player.service';

@Component({
  selector: 'app-senior',
  templateUrl: './senior.component.html',
  styleUrls: ['./senior.component.css']
})
export class SeniorComponent implements OnInit {


  msg:boolean = false;
  deleteMsg: boolean = false;
  updateMsg: boolean = false;
  seniors$: Player[];
  public editSenior: Player;
  public deleteSenior: Player;
  isSenior = true;
  @Input() ngValue: boolean;
  
  constructor(private playerService: PlayerService) {
   }

  ngOnInit() {
    this.getAllSeniors(this.isSenior);
  }

  getAllSeniors(isSenior: boolean): void {
    this.playerService.getAllPlayers(isSenior).subscribe((senior: Player[]) => {
      this.seniors$ = senior;
    });
  }

  public onAddSenior(addForm: NgForm): void {
    document.getElementById('add-senior-form')!.click();
    this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {
        console.log(response);
        this.getAllSeniors(this.isSenior);
        addForm.reset();
        this.msg = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        this.getAllSeniors(this.isSenior);
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
        this.getAllSeniors(this.isSenior);
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
    if(mode === 'add') {
      button.setAttribute('data-target', '#addSeniorModal');
    }
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
