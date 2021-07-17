import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { SeniorComponent } from './players/senior/senior.component';
import {RouterModule} from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';
import { JuniorPlayersComponent } from './players/junior/junior-players/junior-players.component';
import { PlayerService } from './auth/login/shared/player.service';
import { TournamentComponent } from './tournament/tournament.component';
import { ViewtournamentComponent } from './tournament/viewtournament/viewtournament.component';
import { ViewplayerComponent } from './players/viewplayer/viewplayer.component';
import { ViewgameComponent } from './viewgame/viewgame.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SeniorComponent,
    LogoutComponent,
    JuniorPlayersComponent,
    TournamentComponent,
    ViewtournamentComponent,
    ViewplayerComponent,
    ViewgameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers:[PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
