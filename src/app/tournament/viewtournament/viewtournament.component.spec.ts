import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtournamentComponent } from './viewtournament.component';

describe('ViewtournamentComponent', () => {
  let component: ViewtournamentComponent;
  let fixture: ComponentFixture<ViewtournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
