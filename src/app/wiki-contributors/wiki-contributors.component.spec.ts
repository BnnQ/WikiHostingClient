import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiContributorsComponent } from './wiki-contributors.component';

describe('WikiContributorsComponent', () => {
  let component: WikiContributorsComponent;
  let fixture: ComponentFixture<WikiContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiContributorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikiContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
