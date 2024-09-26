const apiUrl: string = "https://api.binance.com/api/v3/klines";

// https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&startTime=1609459200000&endTime=1640995200000

const reqConfig = {
  symbol: "BTCUSDT",
  interval: "1M",
  startTime: "1609459200000",
  endTime: "1640995200000",
};

fetch(`${apiUrl}?${new URLSearchParams(reqConfig)}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

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

export const response: (number | string)[][] = [
  [
    1609459200000,
    "28923.63000000",
    "41950.00000000",
    "28130.00000000",
    "33092.98000000",
    "3440864.75001900",
    1612137599999,
    "118838018199.71984425",
    73759099,
    "1696403.28759600",
    "58587953326.30835501",
    "0",
  ],
  [
    1612137600000,
    "33092.97000000",
    "58352.80000000",
    "32296.16000000",
    "45135.66000000",
    "2518242.14851700",
    1614556799999,
    "115983202933.60136687",
    65653181,
    "1252700.49440300",
    "57668562533.49611403",
    "0",
  ],
  [
    1614556800000,
    "45134.11000000",
    "61844.00000000",
    "44950.53000000",
    "58740.55000000",
    "2098808.02743200",
    1617235199999,
    "114277364895.22881594",
    63155913,
    "1037830.97562500",
    "56539195020.27820274",
    "0",
  ],
];

export function parseSingleKline(kline: (number | string)[]): KlineObject {
  return {
    openTime: new Date(kline[0] as number), // Переводим Unix timestamp в объект Date
    open: parseFloat(kline[1] as string), // Цена открытия
    high: parseFloat(kline[2] as string), // Максимальная цена
    low: parseFloat(kline[3] as string), // Минимальная цена
    close: parseFloat(kline[4] as string), // Цена закрытия
    volume: parseFloat(kline[5] as string), // Объем торгов в BTC
    closeTime: new Date(kline[6] as number), // Время закрытия свечи
    quoteAssetVolume: parseFloat(kline[7] as string), // Объем торгов в фиатной валюте (USD)
    numberOfTrades: kline[8] as number, // Количество сделок
    takerBuyBaseAssetVolume: parseFloat(kline[9] as string), // Объем покупок BTC тейкерами
    takerBuyQuoteAssetVolume: parseFloat(kline[10] as string), // Объем покупок в USD тейкерами
    ignore: kline[11] as string, // Поле игнорируется
  };
}

export function parseKlinesToObjects(
  klinesArray: (number | string)[][]
): KlineObject[] {
  return klinesArray.map(parseSingleKline);
}

export function extractDateLabels(
  klinesArray: (number | string)[][],
  type: "day" | "month" | "year" | "dayNumber"
): string[] {
  return klinesArray.map((kline) => {
    const closeTime = new Date(kline[0] as number);

    switch (type) {
      case "day":
        return closeTime.toLocaleDateString("ru-RU", { weekday: "long" });
      case "month":
        return closeTime.toLocaleDateString("ru-RU", { month: "long" });
      case "year":
        return closeTime.getFullYear().toString();
      case "dayNumber":
        return closeTime.getDate().toString();
      default:
        throw new Error(
          'Invalid type. Use "day", "month", "year", or "dayNumber".'
        );
    }
  });
}

export function extractPrices(klinesArray: (number | string)[][]): number[] {
  return klinesArray.map((kline) => parseFloat(kline[4] as string));
}

export const parsedKlines: KlineObject[] = parseKlinesToObjects(response);
