import { HttpErrorResponse } from '@angular/common/http';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../auth/login/login.response.payload';
import { AuthService } from '../auth/login/shared/auth.service';
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
        this.toastr.success("Player added succesfully.");
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
