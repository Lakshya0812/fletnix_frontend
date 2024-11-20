import { TestBed } from '@angular/core/testing';

import { ContentdetailService } from './contentdetail.service';

describe('ContentdetailService', () => {
  let service: ContentdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
