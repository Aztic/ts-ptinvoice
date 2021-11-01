import IPortugalInvoice from "./interfaces/portugal_invoice.interface";
export default class PortugalQrCodeDataParser {
    private static requiredElements;
    private static maxElementLength;
    private static maxTaxCountryRegionLength;
    private static createEmptyTaxCountryRegion;
    private static createEmptyInvoice;
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
    static parseData(qrData: string): IPortugalInvoice;
    /**
     * Extracts the dictionary of the qr data to build the final object
     * @param qrData
     */
    private static extractDataDictionary;
    /**
     * Validates that all elements of the dictionary has the proper length
     * @param qrDataDictionary
     */
    private static validateQrDataDictionary;
    /**
     * Get a list of all tax country regions from the dictionary
     * @param qrDataDictionary
     * @returns
     */
    private static getTaxCountryRegions;
    /**
     * For a given region (I, J, K), extracts all of its information
     * @param qrDataDictionary
     * @param region
     * @param regionDetails
     */
    private static getTaxCountryRegionDetails;
    /**
     * Tries to parse the value as a number
     * @param taxValue
     * @returns
     */
    private static tryToParseDecimal;
}
