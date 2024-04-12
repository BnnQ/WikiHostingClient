import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemplatesMenuComponent } from './modal-templates-menu.component';

describe('ModalTemplatesMenuComponent', () => {
  let component: ModalTemplatesMenuComponent;
  let fixture: ComponentFixture<ModalTemplatesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTemplatesMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTemplatesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
