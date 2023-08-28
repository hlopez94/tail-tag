import { Injectable } from '@angular/core';

const TAG_REGEX: RegExp = /^[A-Z]{2}[0-9]{6}[A-Z]{2}$/;
const ASCII_ZERO = '0'.charCodeAt(0);
const ASCII_A = 'A'.charCodeAt(0);
@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor() {}

  validarTagQR(value: string): boolean {
    if (!value.startsWith('TAILTAG:'))
      return false;

    return this.validarTag(value.split(':')[1]);
  }

  validarTag(value: string): boolean {
    return this.verificarTag(value);
  }

  private verificarTag(value: string): boolean {
    let resRegExp = new RegExp(TAG_REGEX);
    if (!resRegExp.test(value))
      return false;

    if (!this.verificarIdPartner(value))
      return false;

    if (!this.verificarIdPlaca(value))
      return false;

    return true;
  }

  private verificarIdPlaca(value: string): boolean {
    var idTagValue = value.match(/[0-9]+/g)?.join('') || '';

    var idTag = idTagValue.slice(0, -1);
    let suma = 0;

    for (let i = 0; i < idTag.length; i++) {
      suma += (idTag.charCodeAt(i)- ASCII_ZERO);
    }

    return idTagValue.charCodeAt(idTag.length) === ASCII_ZERO + (suma % 9);
  }

  private verificarIdPartner(value: string): boolean {
    var partnerValue = value.match(/[A-Z]+/g)?.join('') || '';

    var idPartner = partnerValue.slice(0, -1);
    let suma = 0;

    for (let i = 0; i < idPartner.length; i++) {
      suma += (idPartner.charCodeAt(i) - ASCII_A);
    }

    return partnerValue.charCodeAt(idPartner.length) === ASCII_A + (suma % 26);
  }
}
