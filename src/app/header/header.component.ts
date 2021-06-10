import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr copy';
import { Player } from '../auth/login/shared/player';
import { PlayerService } from '../auth/login/shared/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() ngValue: boolean;

  constructor(private playerService: PlayerService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public onAddPlayer(addForm: NgForm): void {
    document.getElementById('add-player-form')!.click();
    this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {
        addForm.reset();
        this.toastr.success("Player added succesfully.")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(player: Player, mode: string): void {
    const container = document.getElementById('btn-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addPlayerModal');
    }
    container.appendChild(button);
    button.click();
}
}
