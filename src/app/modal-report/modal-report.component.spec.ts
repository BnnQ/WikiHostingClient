import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportComponent } from './modal-report.component';

describe('ModalReportComponent', () => {
  let component: ModalReportComponent;
  let fixture: ComponentFixture<ModalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
