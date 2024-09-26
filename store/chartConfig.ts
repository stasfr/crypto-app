import { defineStore } from "pinia";
import { ref } from "vue";
import type { RequestParams } from "~/types/klines.ts";

export const useChartConfigStore = defineStore("chartConfig", () => {
  const chartConfig = ref();

  // function setChartConfig(config: IChartConfig) {
  //   const newConfig: RequestParams = {
  //     startDate: Math.floor(config.dateRange[0].getTime() / 1000),
  //     endDate: Math.floor(config.dateRange[1].getTime() / 1000),
  //     currency: config.currency,
  //     interval: config.interval,
  //   };

  //   chartConfig.value = newConfig;
  // }

  async function fetchCurrency(params: RequestParams) {
    const data = await $fetch("/api/prices/price", {
      method: "POST",
      body: params,
    });

    chartConfig.value = data;
  }

  return { chartConfig, fetchCurrency };
});
