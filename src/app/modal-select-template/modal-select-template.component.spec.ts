import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectTemplateComponent } from './modal-select-template.component';

describe('ModalSelectTemplateComponent', () => {
  let component: ModalSelectTemplateComponent;
  let fixture: ComponentFixture<ModalSelectTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSelectTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
