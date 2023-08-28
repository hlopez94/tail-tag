import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagService } from 'src/app/core/services/tag.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-localizador-manual',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './localizador-manual.component.html',
  styleUrls: ['./localizador-manual.component.scss']
})
export class LocalizadorManualComponent {
constructor(private tagService: TagService){}

  cargarTag(value: string){
    console.log(value)
  }
}
