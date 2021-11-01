export class PortugalQrCodeDataParserException extends Error {
  __proto__: any;
  constructor(message: string | undefined) {
    super(message);
    // restore prototype chain   
    const actualProto = new.target.prototype;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } 
    else {
      this.__proto__ = actualProto;
    } 
  }
}

export class NoQrCodeDataException extends PortugalQrCodeDataParserException {};
export class NoTaxCountryRegionException extends PortugalQrCodeDataParserException {};
export class MissingRequiredParamException extends PortugalQrCodeDataParserException {};
export class InvalidParamFormatException extends PortugalQrCodeDataParserException {};
export class InvalidParamLengthException extends PortugalQrCodeDataParserException {};
export class InvalidTaxCountryRegionElement extends PortugalQrCodeDataParserException {};