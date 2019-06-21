import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { GameRoomComponent } from './game-room.component';

import { UserManagementService } from '../user-management.service';
import { GuessMessagesService } from './guess-messages.service';
import { CanvasComponent } from './canvas/canvas.component';
import { MessageBoxComponent } from './message-box/message-box.component';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ColorPickerModule ],
      declarations: [ GameRoomComponent, CanvasComponent, MessageBoxComponent ],
      providers: [ UserManagementService, GuessMessagesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
