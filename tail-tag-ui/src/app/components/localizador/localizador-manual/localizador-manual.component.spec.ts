import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorManualComponent } from './localizador-manual.component';

describe('LocalizadorManualComponent', () => {
  let component: LocalizadorManualComponent;
  let fixture: ComponentFixture<LocalizadorManualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocalizadorManualComponent]
    });
    fixture = TestBed.createComponent(LocalizadorManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
