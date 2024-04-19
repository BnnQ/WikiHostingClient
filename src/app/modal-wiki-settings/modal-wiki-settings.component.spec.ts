import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWikiSettingsComponent } from './modal-wiki-settings.component';

describe('ModalWikiSettingsComponent', () => {
  let component: ModalWikiSettingsComponent;
  let fixture: ComponentFixture<ModalWikiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalWikiSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalWikiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
