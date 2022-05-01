import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddByPropertyComponent } from './ticket-add-by-property.component';

describe('TicketAddByPropertyComponent', () => {
  let component: TicketAddByPropertyComponent;
  let fixture: ComponentFixture<TicketAddByPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddByPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddByPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
