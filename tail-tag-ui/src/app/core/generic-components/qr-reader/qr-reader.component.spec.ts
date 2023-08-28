import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxScannerQrcodeModule,
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { QrReaderComponent } from './qr-reader.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('QrReaderComponent', () => {
  let component: QrReaderComponent;
  let fixture: ComponentFixture<QrReaderComponent>;
  let fakeScanResult: ScannerQRCodeResult;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        QrReaderComponent,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        NgxScannerQrcodeModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrReaderComponent);
    component = fixture.componentInstance;
    fakeScanResult = {
      value: 'algo',
      type: 0,
      typeName: '',
      data: new Int8Array(),
      points: [],
      orientation: 0,
      time: 12312321,
      cacheCount: 1,
      quality: 1,
      decode: (_) => {
        return '';
      },
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Aquí puedes escribir más pruebas para verificar el comportamiento del componente
  it('should handle start action', () => {
    spyOn(component, 'handle');

    component.handle(component.action, 'start');

    expect(component.handle).toHaveBeenCalledWith(component.action, 'start');
  });

  it('should hide btn-toggle-scanner when action.isPause is true', async () => {
    const fakeScannerResult: ScannerQRCodeResult[] = [fakeScanResult];

    const fakeAction = jasmine.createSpyObj('NgxScannerQrcodeComponent', [
      'pause',
    ]);
    fakeAction.isPause = true;
    component.action = fakeAction;

    await fixture.whenStable();
    fixture.detectChanges();

    component.action.pause();
    spyOn(component.scannerResult, 'emit');

    // Expectations
    component.onEvent(fakeScannerResult, fakeAction);

    const toggleScannerButton = fixture.debugElement.query(
      By.css('#btnToggleScanner')
    );
    expect(fakeAction.isPause).toBeTrue();
    expect(toggleScannerButton).toBeFalsy();
    expect(toggleScannerButton).toBeUndefined();
  });

  it('should show btn-toggle-scanner when action.isPause is false', () => {
    component.action = {
      isPause: false,
    } as NgxScannerQrcodeComponent;
    fixture.detectChanges();

    const toggleScannerButton = fixture.debugElement.query(
      By.css('#btnToggleScanner')
    );

    expect(component.action.isPause).toBeFalse();
    expect(toggleScannerButton).toBeTruthy();
  });

  it('should toggle camera', () => {
    const fakeDevices = {
      value: [{ deviceId: 'device1' }, { deviceId: 'device2' }],
    };
    const fakeAction = jasmine.createSpyObj('NgxScannerQrcodeComponent', [
      'playDevice',
    ]);
    fakeAction.deviceIndexActive = 0;
    fakeAction.devices = { ...fakeDevices };
    component.action = fakeAction;

    component.toggleCamera();

    expect(component.action.playDevice).toHaveBeenCalledWith(
      component.action.devices.value[1].deviceId
    );
  });

  it('should emit scanner result', async () => {
    const fakeScannerResult: ScannerQRCodeResult[] = [fakeScanResult];

    const fakeAction = jasmine.createSpyObj('NgxScannerQrcodeComponent', [
      'pause',
    ]);
    fakeAction.isPause = true;
    component.action = fakeAction;
    fixture.detectChanges();

    spyOn(component.scannerResult, 'emit');

    // Wait for the view to be fully initialized
    await fixture.whenStable();

    // Trigger the onEvent function
    component.onEvent(fakeScannerResult, fakeAction);

    // Expectations
    expect(fakeAction.pause).toHaveBeenCalled();
    expect(fakeAction.isPause).toBeTrue();
    expect(component.scannerResult.emit).toHaveBeenCalledWith(
      fakeScannerResult
    );
  });
  it('should show btn-retry-scanner when action.isPause is true', async () => {
    const fakeScannerResult: ScannerQRCodeResult[] = [fakeScanResult];

    const fakeAction = jasmine.createSpyObj('NgxScannerQrcodeComponent', [
      'pause',
    ]);
    fakeAction.isPause = true;
    component.action = fakeAction;

    await fixture.whenStable();
    fixture.detectChanges();

    spyOn(component.scannerResult, 'emit');

    // Expectations
    component.onEvent(fakeScannerResult, fakeAction);

    const toggleScannerButton = fixture.debugElement.queryAll(
      By.css('#btnRetryScanner')
    );
    expect(fakeAction.isPause).toBeTrue();
    expect(toggleScannerButton).toBeTruthy();
  });
});
