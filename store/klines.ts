import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  KlineObject,
  RequestParams,
  RequestFormParams,
  ChartConfig,
} from "~/types/klines.ts";

export const useKlinesStore = defineStore("klinesStore", () => {
  const klines = ref();
  const requestParams = ref<RequestParams>();
  const chartConfig = ref<ChartConfig>({
    labels: [],
    prices: [],
  });

  function setRequestParams(params: RequestFormParams) {
    const newParams = {
      symbol: `BTC${params.symbol}`,
      interval: params.interval,
      startTime: params.dateRange?.[0]?.getTime(),
      endTime: params.dateRange?.[1]?.getTime(),
    };
    localStorage.setItem("requestParams", JSON.stringify(newParams));
    requestParams.value = newParams;
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

    chartConfig.value.labels = extractDateLabels(response, "dayNumber");

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

  function extractDateLabels(
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
