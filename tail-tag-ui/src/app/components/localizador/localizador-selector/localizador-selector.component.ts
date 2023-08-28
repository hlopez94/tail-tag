import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { LocalizadorQrComponent } from '../localizador-qr/localizador-qr.component';
import { LocalizadorManualComponent } from '../localizador-manual/localizador-manual.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-localizador-selector',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatButtonToggleModule,
    MatIconModule,
    LocalizadorQrComponent,
    LocalizadorManualComponent,
  ],
  templateUrl: './localizador-selector.component.html',
  styleUrls: ['./localizador-selector.component.scss'],
})
export class LocalizadorSelectorComponent {}
