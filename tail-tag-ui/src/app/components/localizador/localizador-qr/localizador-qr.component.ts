import { Component } from '@angular/core';
import { QrReaderComponent } from 'src/app/core/generic-components/qr-reader/qr-reader.component';
import { Router } from '@angular/router';
import { TagService } from 'src/app/core/services/tag.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-localizador-qr',
  standalone: true,
  imports: [ QrReaderComponent, MatSnackBarModule],
  templateUrl: './localizador-qr.component.html',
  styleUrls: ['./localizador-qr.component.scss'],
})
export class LocalizadorQrComponent {
  constructor(
    private router: Router,
    private tagService: TagService,
    private _snackbar: MatSnackBar
  ) {}
  async procesarQr(value: any[]) {
    var tagId: string = value[0].value;
    var result = this.tagService.validarTagQR(tagId);

    if (result) {
      this.router.navigate(['/info-tag'], { queryParams: { tagId } });
    } else {
      this._snackbar.open(
        'Tag inválido, volve a intentar o ingresalo manualmente', undefined, {duration:2500, panelClass: 'mat-warning'}
      );
    }
  }
}
