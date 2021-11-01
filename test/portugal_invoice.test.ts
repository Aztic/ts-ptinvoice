import PortugalInvoiceQrParser from "../src";
import {
  InvalidParamFormatException,
  InvalidParamLengthException,
  MissingRequiredParamException,
  NoQrCodeDataException,
  PortugalQrCodeDataParserException
} from "../src/exceptions/portugal_qrcode_data_parser.exception";

describe('Portugal Invoice QR Data parser', () => {
  it('Should throw exception when no data is passed', () => {
    expect(
      () => PortugalInvoiceQrParser.parseData('')
    ).toThrow(NoQrCodeDataException);
  });

  describe('Incorrect format', () => {
    it('Should throw exception when no "*" separator is found', () => {
      const qrData = "Abcd";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(InvalidParamFormatException);

      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow('Missing * separator in the qr data string');
    });

    it('Should throw exception when there\'s a section with no ":"', () => {
      const qrData = "AB*C:D";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(InvalidParamFormatException);
      
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow('Not all sections of the qr data has 1 separator (:)');
    });

    it('Should throw exception when there\'s a section with more than one ":"', () => {
      const qrData = "A:B*C:D:E";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(InvalidParamFormatException);
      
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow('Not all sections of the qr data has 1 separator (:)');
    });
  });

  describe('Missing params', () => {
    it('Should throw exception when "A" parameter is missing', () => {
      const qrData = "B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: A");
    });

    it('Should throw exception when "B" parameter is missing', () => {
      const qrData = "A:123456789*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: B");
    });
  
    it('Should throw exception when "C" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: C");
    });
  
    it('Should throw exception when "D" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: D");
    });
  
    it('Should throw exception when "E" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: E");
    });
  
    it('Should throw exception when "F" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: F");
    });
  
    it('Should throw exception when "G" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: G");
    });
  
    it('Should throw exception when "H" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: H");
    });
  
    it('Should throw exception when "N" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: N");
    });
  
    it('Should throw exception when "O" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: O");
    });
  
    it('Should throw exception when "Q" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: Q");
    });
  
    it('Should throw exception when "R" parameter is missing', () => {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: R");
    });

    it('Should throw exception when "A", "B", and "C" params are missing', () => {
      const qrData = "D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(MissingRequiredParamException);
  
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow("Missing the required params: A, B, C");
    });
  });

  describe('Invalid param format', () => {
    it('Should throw exception when an invalid decimal is passed', ()=> {
      const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.a97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(InvalidParamFormatException);

      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow('Expected decimal value');
    });

    it('Should throw exception when the max length is exceeded for a param', () => {
      const qrData = "A:123456789121234*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456124124*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow(InvalidParamLengthException);

      expect(
        () => PortugalInvoiceQrParser.parseData(qrData)
      ).toThrow('Param A exceeds the max length of 9');
    });

  });

  it('Should process the qr data without problem when a valid string is passed', () => {
    const qrData = "A:123456789*B:999999990*C:PT*D:FS*E:N*F:20210420*G:FS12344567891234/123456*H:0*I1:PT*N:3.97*O:30.31*Q:zrVG*R:9999";
    expect(
      () => PortugalInvoiceQrParser.parseData(qrData)
    ).not.toThrow(PortugalQrCodeDataParserException);
  })
});