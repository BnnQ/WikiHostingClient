import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWikiComponent } from './create-wiki.component';

describe('CreateWikiComponent', () => {
  let component: CreateWikiComponent;
  let fixture: ComponentFixture<CreateWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWikiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
