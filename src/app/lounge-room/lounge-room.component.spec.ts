import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoungeRoomComponent } from './lounge-room.component';

describe('LoungeRoomComponent', () => {
  let component: LoungeRoomComponent;
  let fixture: ComponentFixture<LoungeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoungeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoungeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
