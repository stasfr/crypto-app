import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  KlineObject,
  RequestParams,
  ChartConfig,
} from "~/types/klines.ts";

export const useKlinesStore = defineStore("klinesStore", () => {
  const klines = ref<KlineObject[]>();
  const requestParams = ref<RequestParams>({
    symbol: undefined,
    interval: undefined,
    startTime: undefined,
    endTime: undefined,
  });
  const chartConfig = ref<ChartConfig>({
    labels: [],
    prices: [],
  });

  function setRequestParams(
    interval: string | null,
    dateRange: (Date | null)[] = []
  ) {
    const today = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    requestParams.value.symbol = "BTCUSDT";
    requestParams.value.endTime = today;

    switch (interval) {
      case "Day":
        requestParams.value.interval = "1h";
        requestParams.value.startTime = today - oneDay;
        break;
      case "Week":
        requestParams.value.interval = "1d";
        requestParams.value.startTime = today - 7 * oneDay;
        break;
      case "Month":
        requestParams.value.interval = "1d";
        requestParams.value.startTime = today - 30 * oneDay;
        break;
      case "3 Months":
        requestParams.value.interval = "1d";
        requestParams.value.startTime = today - 90 * oneDay;
        break;
      case "Year":
        requestParams.value.interval = "1M";
        requestParams.value.startTime = today - 365 * oneDay;
        break;
      default:
        const [start, end] = dateRange?.map((date) => date?.getTime() || 0);
        const delta = (end - start) / 1000 / 60 / 60 / 24;
        requestParams.value.interval = delta <= 30 ? "1d" : "1M";
        requestParams.value.startTime = start;
        requestParams.value.endTime = end;
        break;
    }

    localStorage.setItem("requestParams", JSON.stringify(requestParams.value));
  }

  async function fetchCurrency() {
    const { response }: { response: (number | string)[][] } = await $fetch(
      "/api/prices/price",
      {
        method: "POST",
        body: requestParams.value,
      }
    );

    klines.value = parseKlinesToObjects(response);
    chartConfig.value.labels = extractDateLabels(response);
    chartConfig.value.prices = extractPrices(response);
  }

  function parseSingleKline(kline: (number | string)[]): KlineObject {
    return {
      openTime: new Date(kline[0] as number), // Unix в Date
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

  function parseKlinesToObjects(
    klinesArray: (number | string)[][]
  ): KlineObject[] {
    return klinesArray.map(parseSingleKline);
  }

  function extractDateLabels(klinesArray: (number | string)[][]): string[] {
    return klinesArray.map((kline) => {
      const closeTime = new Date(kline[0] as number);

      switch (requestParams.value?.interval) {
        case "1M":
          return closeTime.toLocaleDateString("ru-RU", { month: "long" });
        case "1d":
          return closeTime.getDate().toString();
        case "1h":
          return closeTime.getHours().toString();
        default:
          throw new Error("Invalid type");
      }
    });
  }

  function extractPrices(klinesArray: (number | string)[][]): number[] {
    return klinesArray.map((kline) => parseFloat(kline[4] as string));
  }

  return {
    klines,
    requestParams,
    chartConfig,
    setRequestParams,
    fetchCurrency,
  };
});
