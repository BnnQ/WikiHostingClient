import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUseTemplateComponent } from './modal-use-template.component';

describe('ModalUseTemplateComponent', () => {
  let component: ModalUseTemplateComponent;
  let fixture: ComponentFixture<ModalUseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUseTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
