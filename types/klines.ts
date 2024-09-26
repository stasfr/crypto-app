export interface KlineObject {
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: Date;
  quoteAssetVolume: number;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
  ignore: string;
}

export interface RequestParams {
  symbol: string | undefined;
  interval: string | undefined;
  startTime: number | undefined;
  endTime: number | undefined;
}
