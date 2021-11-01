import { InvalidParamFormatException, InvalidParamLengthException, InvalidTaxCountryRegionElement, MissingRequiredParamException, NoQrCodeDataException, NoTaxCountryRegionException } from "./exceptions/portugal_qrcode_data_parser.exception";
import IPortugalInvoice from "./interfaces/portugal_invoice.interface";
import ITaxCountryRegion from "./interfaces/portugal_invoice_tax_country_region.interface";


export default class PortugalQrCodeDataParser {
  
  private static requiredElements =  [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "N",
    "O",
    "Q",
    "R"
  ];

  private static maxElementLength = {
    "A": 9,
    "B": 30,
    "C": 12,
    "D": 2,
    "E": 1,
    "F": 8,
    "G": 60,
    "H": 70,
    "L": 16,
    "M": 16,
    "N": 16,
    "O": 16,
    "P": 16,
    "Q": 4,
    "R": 4,
    "S": 65
  };

  private static maxTaxCountryRegionLength = {
    "1": 5,
    "2": 16,
    "3": 16,
    "4": 16,
    "5": 16,
    "6": 16,
    "7": 16,
    "8": 16
  };

  private static createEmptyTaxCountryRegion(): ITaxCountryRegion {
    const taxCountryRegion: ITaxCountryRegion = {
      taxCountryRegion: null,
      taxableBaseExemptOfVAT: null,
      taxableBaseOfVATAtReducedRate: null,
      totalVATAtReducedRate: null,
      taxableBaseOfVATAtAIntermediateRate: null,
      totalVATAtIntermediateRate: null,
      taxableBaseOfVATAtAStandardRate: null,
      totalVATAtStandardRate: null
    };

    return taxCountryRegion;
  }

  private static createEmptyInvoice(): IPortugalInvoice {
    const portugalInvoice: IPortugalInvoice = {
      remitentNif: "",
      clientNif: "",
      clientCountry: "",
      documentType: "",
      documentStatus: "",
      documentDate: "",
      documentId: "",
      ATCUD: "",
      taxCountryRegions: [],
      notTaxableInVAT: null,
      stampDuty: null,
      totalTaxes: 0,
      totalDocumentWithTaxes: 0,
      withholdingTaxes: 0,
      hash: "",
      certificateNumber: "",
      otherInformation: null
    }

    return portugalInvoice;
  }

  /**
   * Extracts the invoice data from a string
   * @param qrData 
   * @throws {NoQrCodeDataException} No string given to parse
   * @throws {MissingRequiredParamException} A required param is missing in the string
   * @throws {InvalidParamFormatException} A given parameter doesn't have the required format or the data is missing the separators
   * @throws {InvalidParamLengthException} The parameter length exceeds the maximum value
   * @throws {NoTaxCountryRegionException} No tax country region was passed
   * @returns 
   */
  static parseData(qrData: string): IPortugalInvoice {
    if(!qrData || qrData.length === 0) {
      throw new NoQrCodeDataException('No qr code data string passed to the parser');
    }

    const invoice = this.createEmptyInvoice();
    const qrDataDictionary = this.extractDataDictionary(qrData);

    const qrDataKeys = Object.keys(qrDataDictionary);
    const missingKeys = this.requiredElements.filter(x => !qrDataKeys.includes(x));
    if(missingKeys.length > 0) {
      throw new MissingRequiredParamException(`Missing the required params: ${missingKeys.join(', ')}`);
    }

    const atLeastOneTaxCountryRegion = qrDataKeys.find(x => ["I1", "J1", "K1"].includes(x)).length > 0;
    if(!atLeastOneTaxCountryRegion) {
      throw new NoTaxCountryRegionException('A ticket must have at least one tax country region');
    }

    invoice.remitentNif = qrDataDictionary["A"];
    invoice.clientNif = qrDataDictionary["B"];
    invoice.clientCountry = qrDataDictionary["C"];
    invoice.documentType = qrDataDictionary["D"],
    invoice.documentStatus = qrDataDictionary["E"];
    invoice.documentDate = qrDataDictionary["F"];
    invoice.documentId = qrDataDictionary["G"];
    invoice.ATCUD = qrDataDictionary["H"];
    invoice.taxCountryRegions = this.getTaxCountryRegions(qrDataDictionary);

    if(qrDataDictionary["L"]) {
      invoice.notTaxableInVAT = this.tryToParseDecimal(qrDataDictionary["L"]);
    }

    if(qrDataDictionary["M"]) {
      invoice.stampDuty = this.tryToParseDecimal(qrDataDictionary["M"]);
    }

    invoice.totalTaxes = this.tryToParseDecimal(qrDataDictionary["N"]);
    invoice.totalDocumentWithTaxes = this.tryToParseDecimal(qrDataDictionary["O"]);

    if(qrDataDictionary["P"]) {
      invoice.withholdingTaxes = this.tryToParseDecimal(qrDataDictionary["P"]);
    }

    invoice.hash = qrDataDictionary["Q"];
    invoice.certificateNumber = qrDataDictionary["R"];

    if(qrDataDictionary["S"]) {
      invoice.otherInformation = qrDataDictionary["S"];
    }

    return invoice;
  }

  /**
   * Extracts the dictionary of the qr data to build the final object
   * @param qrData 
   */
  private static extractDataDictionary(qrData: string) {
    if(!qrData.includes('*')) {
      throw new InvalidParamFormatException('Missing * separator in the qr data string');
    }

    const qrDataSections = qrData.split('*');
    const invalidSection = qrDataSections.find(x => x.split(':').length !== 2);
    if(invalidSection) {
      throw new InvalidParamFormatException('Not all sections of the qr data has 1 separator (:)');
    }

    const qrDataDictionary = {};

    for(let section of qrDataSections) {
      const [key, value] = section.split(':');
      qrDataDictionary[key] = value;
    }

    this.validateQrDataDictionary(qrDataDictionary);

    return qrDataDictionary;
  }

  /**
   * Validates that all elements of the dictionary has the proper length
   * @param qrDataDictionary 
   */
  private static validateQrDataDictionary(qrDataDictionary: {[key: string]: string}) {
    for(let key in qrDataDictionary) {
      let maxLength = 0;
      if(key.startsWith('I') || key.startsWith('J') || key.startsWith('K')) {
        const indexSearch = key.match(/\d+/);
        if(indexSearch === null) {
          throw new InvalidParamFormatException('Found a tax country region element without index');
        }

        const index = Number(indexSearch[0]);
        if(index < 1 || index > 8) {
          throw new InvalidParamFormatException('Tax country region elements must be between 1 and 8');
        }

        maxLength = this.maxTaxCountryRegionLength[index];

      }
      else {
        maxLength = this.maxElementLength[key];
      }

      if(qrDataDictionary[key].length > maxLength) {
        throw new InvalidParamLengthException(`Param ${key} exceeds the max length of ${maxLength}`);
      }
      else if (qrDataDictionary[key].length === 0) {
        throw new InvalidParamLengthException(`Param ${key} has a length of 0 characters`);
      }
    }
  }

  /**
   * Get a list of all tax country regions from the dictionary
   * @param qrDataDictionary 
   * @returns 
   */
  private static getTaxCountryRegions(qrDataDictionary: {[key: string]: string}): ITaxCountryRegion[] {
    const regions: ITaxCountryRegion[] = [];
    const possibleRegions = ["I", "J", "K"];
    for(let region in possibleRegions) {
      const containsTaxCountryRegion = qrDataDictionary[`${region}1`] !== undefined;
      if(!containsTaxCountryRegion) {
        continue;
      }

      const taxRegion = this.createEmptyTaxCountryRegion();
      taxRegion.taxCountryRegion = qrDataDictionary[`${region}1`];
      this.getTaxCountryRegionDetails(qrDataDictionary, region, taxRegion);
      regions.push(taxRegion);

    }
    return regions;
  }

  /**
   * For a given region (I, J, K), extracts all of its information
   * @param qrDataDictionary 
   * @param region 
   * @param regionDetails 
   */
  private static getTaxCountryRegionDetails(qrDataDictionary: {[key: string]: string}, region: string, regionDetails: ITaxCountryRegion) {
    for(let i=2; i<=8; i++) {
      const taxCountryRegionDetailKey = `${region}${i}`;;
      if(qrDataDictionary[taxCountryRegionDetailKey] === undefined) {
        continue;
      }

      const taxDetail = Number(qrDataDictionary[taxCountryRegionDetailKey]);
      if(isNaN(taxDetail)) {
        throw new InvalidParamFormatException(`A valid decimal number is required for param ${taxCountryRegionDetailKey}`);
      }

      switch(i) {
        case 2:
          regionDetails.taxableBaseExemptOfVAT = taxDetail;
          break;
        case 3:
          regionDetails.taxableBaseOfVATAtReducedRate = taxDetail;
          break;
        case 4:
          regionDetails.totalVATAtReducedRate = taxDetail;
          break;
        case 5:
          regionDetails.taxableBaseOfVATAtAIntermediateRate = taxDetail;
          break;
        case 6:
          regionDetails.totalVATAtIntermediateRate = taxDetail;
          break;
        case 7:
          regionDetails.taxableBaseOfVATAtAStandardRate = taxDetail;
          break;
        case 8:
          regionDetails.totalVATAtStandardRate = taxDetail;
          break;
        default:
          throw new InvalidTaxCountryRegionElement('Invalid tax country region element');
      }
    }
  }

  /**
   * Tries to parse the value as a number
   * @param taxValue 
   * @returns 
   */
  private static tryToParseDecimal(taxValue) {
    const decimalNumber = Number(taxValue);
    if(isNaN(decimalNumber)) {
      throw new InvalidParamFormatException('Expected decimal value');
    }

    return decimalNumber;
  }

}