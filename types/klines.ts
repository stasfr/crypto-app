export interface KlineObject {
  id: number;
  symbol: string;
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: Date;
  interval: string;
}

export interface RequestParams {
  startTime: number | undefined;
  endTime: number | undefined;
}

export interface ChartConfig {
  labels: string[];
  prices: number[];
}
