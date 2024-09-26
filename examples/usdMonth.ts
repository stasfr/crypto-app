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
