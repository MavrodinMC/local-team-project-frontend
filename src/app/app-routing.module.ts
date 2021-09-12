import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { JuniorPlayersComponent } from './players/junior/junior-players/junior-players.component';
import { SeniorComponent } from './players/senior/senior.component';
import { ViewplayerComponent } from './players/viewplayer/viewplayer.component';
import { StaffComponent } from './staff/staff.component';
import { TournamentComponent } from './tournament/tournament.component';
import { ViewtournamentComponent } from './tournament/viewtournament/viewtournament.component';
import { ViewgameComponent } from './viewgame/viewgame.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'senior', component: SeniorComponent},
  {path:'login', component: LoginComponent},
  {path:'logout', component: LogoutComponent},
  {path:'junior', component: JuniorPlayersComponent},
  {path:'tournament', component: TournamentComponent},
  {path:'tournamentDetails', component: ViewtournamentComponent},
  {path:'playerDetails', component: ViewplayerComponent},
  {path:'gameDetails', component: ViewgameComponent},
  {path:'staff', component: StaffComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
