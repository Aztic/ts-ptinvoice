export declare class PortugalQrCodeDataParserException extends Error {
    __proto__: any;
    constructor(message: string | undefined);
}
export declare class NoQrCodeDataException extends PortugalQrCodeDataParserException {
}
export declare class NoTaxCountryRegionException extends PortugalQrCodeDataParserException {
}
export declare class MissingRequiredParamException extends PortugalQrCodeDataParserException {
}
export declare class InvalidParamFormatException extends PortugalQrCodeDataParserException {
}
export declare class InvalidParamLengthException extends PortugalQrCodeDataParserException {
}
export declare class InvalidTaxCountryRegionElement extends PortugalQrCodeDataParserException {
}
