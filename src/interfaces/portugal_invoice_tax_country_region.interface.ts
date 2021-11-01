export default interface ITaxCountryRegion {
  taxCountryRegion: string | null;
  taxableBaseExemptOfVAT: number | null;
  taxableBaseOfVATAtReducedRate: number | null;
  totalVATAtReducedRate: number | null;
  taxableBaseOfVATAtAIntermediateRate: number | null;
  totalVATAtIntermediateRate: number | null;
  taxableBaseOfVATAtAStandardRate: number | null;
  totalVATAtStandardRate: number | null;
}