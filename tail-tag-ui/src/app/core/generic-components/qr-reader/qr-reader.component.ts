import { MatMenuModule } from '@angular/material/menu';
import {
  AfterViewInit,
  Component,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  AsyncPipe,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  NgxScannerQrcodeModule,
  LOAD_WASM,
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
@Component({
  selector: 'qr-reader',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgFor,
    AsyncPipe,
    NgxScannerQrcodeModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    decode: 'UTF-8',
    isBeep: false,
    constraints: {
      audio: false,
      video: {
        width: 720,
        height: 720,
        aspectRatio: 1 / 1,
      },
    },
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  @Output('scanner-result') scannerResult: EventEmitter<ScannerQRCodeResult[]> =
    new EventEmitter<ScannerQRCodeResult[]>();

  ngAfterViewInit(): void {
    this.action.deviceIndexActive
    this.action.isReady.subscribe((res: any) => {
    //  this.handle(this.action, 'start');
    });
  }

  onError(e: any) {
    alert(e);
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
   if(e && e.length > 0 ){
     action.pause()
     this.scannerResult.emit(e);
     this.action.isPause
   }
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };
    if (fn === 'torcher') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert('No se pudo encender la linterna')
      );
    } else if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public toggleCamera() {
    if (this.action.deviceIndexActive == 0) {
      this.action.playDevice(this.action.devices.value[1].deviceId);
    } else this.action.playDevice(this.action.devices.value[0].deviceId);
  }
}
