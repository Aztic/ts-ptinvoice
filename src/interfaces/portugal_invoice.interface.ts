import ITaxCountryRegion from "./portugal_invoice_tax_country_region.interface";

export default interface IPortugalInvoice {
  remitentNif: string;
  clientNif: string;
  clientCountry: string;
  documentType: string;
  documentStatus: string;
  documentDate: string;
  documentId: string;
  ATCUD: string;
  taxCountryRegions: ITaxCountryRegion[];
  notTaxableInVAT: number | null;
  stampDuty: number | null;
  totalTaxes: number;
  totalDocumentWithTaxes: number;
  withholdingTaxes: number;
  hash: string;
  certificateNumber: string;
  otherInformation: string | null;
}