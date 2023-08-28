import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTagsComponent } from './user-tags.component';

describe('UserTagsComponent', () => {
  let component: UserTagsComponent;
  let fixture: ComponentFixture<UserTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserTagsComponent]
    });
    fixture = TestBed.createComponent(UserTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
