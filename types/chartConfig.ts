export interface ChartConfig {
  startDate: number;
  endDate: number;
  currency: string;
  interval: string;
}

export interface IChartConfig {
  dateRange: Array<Date>;
  currency: string;
  interval: string;
}

// https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&startTime=1609459200000&endTime=1640995200000
// [
//   1501545600000, // Open time
//   "4261.48000000", // Open
//   "4745.42000000", // High
//   "3400.00000000", // Low
//   "4724.89000000", // Close
//   "10015.64027200", // Volume
//   1504223999999, // Close time
//   "42538297.66482722", // Quote asset volume
//   69180, // Number of trades
//   "4610.01943100", // Taker buy base asset volume
//   "19419232.11660334", // Taker buy quote asset volume
//   "0" // Ignore
// ]
