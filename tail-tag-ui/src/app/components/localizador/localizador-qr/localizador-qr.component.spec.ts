import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorQrComponent } from './localizador-qr.component';

describe('LocalizadorQrComponent', () => {
  let component: LocalizadorQrComponent;
  let fixture: ComponentFixture<LocalizadorQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocalizadorQrComponent]
    });
    fixture = TestBed.createComponent(LocalizadorQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
