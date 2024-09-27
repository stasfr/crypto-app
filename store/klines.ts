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
    startTime: undefined,
    endTime: undefined,
  });
  const chartConfig = ref<ChartConfig>({
    labels: [],
    prices: [],
  });
  const url = ref<string>("http://localhost:5000/api/binance/data");

  function setRequestParams(
    interval: string | null,
    dateRange: (Date | null)[] = []
  ) {
    const today = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    requestParams.value.endTime = today;

    switch (interval) {
      case "Day":
        requestParams.value.startTime = today - oneDay;
        break;
      case "Week":
        requestParams.value.startTime = today - 7 * oneDay;
        break;
      case "Month":
        requestParams.value.startTime = today - 30 * oneDay;
        break;
      case "3 Months":
        requestParams.value.startTime = today - 90 * oneDay;
        break;
      case "Year":
        requestParams.value.startTime = today - 365 * oneDay;
        break;
      default:
        const [start, end] = dateRange?.map((date) => date?.getTime() || 0);
        requestParams.value.startTime = start;
        requestParams.value.endTime = end;
        break;
    }

    localStorage.setItem("requestParams", JSON.stringify(requestParams.value));
  }

  async function fetchCurrency() {
    const response: KlineObject[] = await $fetch(url.value, {
      method: "GET",
      query: requestParams.value,
    });

    console.log(response);

    klines.value = response;
    chartConfig.value.labels = extractDateLabels(response);
    chartConfig.value.prices = extractPrices(response);
  }

  function extractDateLabels(klinesArray: KlineObject[]): string[] {
    return klinesArray.map((kline) => {
      return new Date(kline.closeTime).getDate().toString();
    });
  }

  function extractPrices(klinesArray: KlineObject[]): number[] {
    return klinesArray.map((kline) => kline.close);
  }

  return {
    klines,
    requestParams,
    chartConfig,
    setRequestParams,
    fetchCurrency,
  };
});
