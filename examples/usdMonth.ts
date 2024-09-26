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
  [
    1617235200000,
    "58739.46000000",
    "64854.00000000",
    "46930.00000000",
    "57694.27000000",
    "1993468.93800700",
    1619827199999,
    "113040658323.56617327",
    62061792,
    "976226.92035700",
    "55388518667.32670308",
    "0",
  ],
  [
    1619827200000,
    "57697.25000000",
    "59500.00000000",
    "30000.00000000",
    "37253.81000000",
    "3536245.25657300",
    1622505599999,
    "154980424224.31556711",
    83178232,
    "1711558.28898700",
    "75081608479.79643229",
    "0",
  ],
  [
    1622505600000,
    "37253.82000000",
    "41330.00000000",
    "28805.00000000",
    "35045.00000000",
    "2901775.30592300",
    1625097599999,
    "102481507278.73121394",
    55904176,
    "1425168.57625600",
    "50359134715.68894574",
    "0",
  ],
  [
    1625097600000,
    "35045.00000000",
    "42448.00000000",
    "29278.00000000",
    "41461.83000000",
    "1778463.26483700",
    1627775999999,
    "61788476064.53920266",
    40228107,
    "880515.38156400",
    "30622814623.34477210",
    "0",
  ],
  [
    1627776000000,
    "41461.84000000",
    "50500.00000000",
    "37332.70000000",
    "47100.89000000",
    "1635402.87424500",
    1630454399999,
    "73756799190.98481156",
    51659027,
    "817214.78818400",
    "36878130953.49746360",
    "0",
  ],
  [
    1630454400000,
    "47100.89000000",
    "52920.00000000",
    "39600.00000000",
    "43824.10000000",
    "1527799.51076800",
    1633046399999,
    "70114825134.22693155",
    41915331,
    "747864.23748600",
    "34352902994.42503041",
    "0",
  ],
  [
    1633046400000,
    "43820.01000000",
    "67000.00000000",
    "43283.03000000",
    "61299.80000000",
    "1565556.29262300",
    1635724799999,
    "90057212588.12694671",
    49815374,
    "782372.07622800",
    "45002009955.66511509",
    "0",
  ],
  [
    1635724800000,
    "61299.81000000",
    "69000.00000000",
    "53256.64000000",
    "56950.56000000",
    "1291900.10524800",
    1638316799999,
    "78194635615.79679843",
    45535890,
    "634131.25870900",
    "38413077824.97191693",
    "0",
  ],
  [
    1638316800000,
    "56950.56000000",
    "59053.55000000",
    "42000.30000000",
    "46216.93000000",
    "1233745.52431800",
    1640995199999,
    "60935346464.96546186",
    38044561,
    "598433.23221000",
    "29558202482.97306550",
    "0",
  ],
  [
    1640995200000,
    "46216.93000000",
    "47990.00000000",
    "32917.17000000",
    "38466.90000000",
    "1279407.46572100",
    1643673599999,
    "51219874505.32575876",
    34735027,
    "630501.06261000",
    "25234823991.35198555",
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
