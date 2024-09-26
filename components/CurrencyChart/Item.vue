<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-[30rem]"
  />
</template>

<script setup lang="ts">
import {
  response,
  parseSingleKline,
  parseKlinesToObjects,
  extractDateLabels,
  extractPrices,
} from "@/examples/usdMonth.ts";
import type { KlineObject } from "@/examples/usdMonth.ts";

onMounted(() => {
  klinesData.value = parseKlinesToObjects(response);

  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const klinesData = ref();
const showType = ref("month");

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = extractDateLabels(response, showType.value);
  const prices = extractPrices(response);

  return {
    labels: labels,
    datasets: [
      {
        label: "USDT",
        data: prices,
        fill: true,
        borderColor: documentStyle.getPropertyValue("--p-yellow-500"),
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
