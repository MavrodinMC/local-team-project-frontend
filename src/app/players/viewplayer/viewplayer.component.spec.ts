import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplayerComponent } from './viewplayer.component';

describe('ViewplayerComponent', () => {
  let component: ViewplayerComponent;
  let fixture: ComponentFixture<ViewplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
