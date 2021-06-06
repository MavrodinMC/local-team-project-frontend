import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuniorPlayersComponent } from './junior-players.component';

describe('JuniorPlayersComponent', () => {
  let component: JuniorPlayersComponent;
  let fixture: ComponentFixture<JuniorPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuniorPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuniorPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
