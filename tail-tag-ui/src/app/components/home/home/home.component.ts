import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LocalizadorSelectorComponent } from '../../localizador/localizador-selector/localizador-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatButtonModule,   LocalizadorSelectorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor() {}
}
