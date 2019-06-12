import { TestBed, inject } from '@angular/core/testing';

import { GuessMessagesService } from './guess-messages.service';

describe('GuessMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuessMessagesService]
    });
  });

  it('should be created', inject([GuessMessagesService], (service: GuessMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
