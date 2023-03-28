import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyNotFoundComponent } from './agency-not-found.component';

describe('AgencyNotFoundComponent', () => {
  let component: AgencyNotFoundComponent;
  let fixture: ComponentFixture<AgencyNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
