"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaxCountryRegionElement = exports.InvalidParamLengthException = exports.InvalidParamFormatException = exports.MissingRequiredParamException = exports.NoTaxCountryRegionException = exports.NoQrCodeDataException = exports.PortugalQrCodeDataParserException = void 0;
class PortugalQrCodeDataParserException extends Error {
    constructor(message) {
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
exports.PortugalQrCodeDataParserException = PortugalQrCodeDataParserException;
class NoQrCodeDataException extends PortugalQrCodeDataParserException {
}
exports.NoQrCodeDataException = NoQrCodeDataException;
;
class NoTaxCountryRegionException extends PortugalQrCodeDataParserException {
}
exports.NoTaxCountryRegionException = NoTaxCountryRegionException;
;
class MissingRequiredParamException extends PortugalQrCodeDataParserException {
}
exports.MissingRequiredParamException = MissingRequiredParamException;
;
class InvalidParamFormatException extends PortugalQrCodeDataParserException {
}
exports.InvalidParamFormatException = InvalidParamFormatException;
;
class InvalidParamLengthException extends PortugalQrCodeDataParserException {
}
exports.InvalidParamLengthException = InvalidParamLengthException;
;
class InvalidTaxCountryRegionElement extends PortugalQrCodeDataParserException {
}
exports.InvalidTaxCountryRegionElement = InvalidTaxCountryRegionElement;
;
//# sourceMappingURL=portugal_qrcode_data_parser.exception.js.map