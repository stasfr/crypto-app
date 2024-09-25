import { defineStore } from "pinia";
import { ref } from "vue";
import type { ChartConfig, IChartConfig } from "~/types/chartConfig";

export const useChartConfigStore = defineStore("chartConfig", () => {
  const chartConfig = ref<ChartConfig>();

  function setChartConfig(config: IChartConfig) {
    const newConfig: ChartConfig = {
      startDate: Math.floor(config.dateRange[0].getTime() / 1000),
      endDate: Math.floor(config.dateRange[1].getTime() / 1000),
      currency: config.currency,
      interval: config.interval,
    };

    chartConfig.value = newConfig;
  }

  return { chartConfig };
});
