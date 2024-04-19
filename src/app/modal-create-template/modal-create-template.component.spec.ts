import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTemplateComponent } from './modal-create-template.component';

describe('CreateTemplateComponent', () => {
  let component: ModalCreateTemplateComponent;
  let fixture: ComponentFixture<ModalCreateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
