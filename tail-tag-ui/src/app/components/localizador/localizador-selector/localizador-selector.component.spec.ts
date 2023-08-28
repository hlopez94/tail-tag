import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorSelectorComponent } from './localizador-selector.component';

describe('LocalizadorSelectorComponent', () => {
  let component: LocalizadorSelectorComponent;
  let fixture: ComponentFixture<LocalizadorSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocalizadorSelectorComponent]
    });
    fixture = TestBed.createComponent(LocalizadorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
