<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-[30rem]"
  />
</template>

<script setup lang="ts">
import { useKlinesStore } from "~/store/klines";

const klinesStore = useKlinesStore();

onMounted(async () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

watch(
  () => klinesStore.chartConfig,
  () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
  },
  { deep: true }
);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const labels = klinesStore.chartConfig.labels;
  const prices = klinesStore.chartConfig.prices;

  return {
    labels: labels,
    datasets: [
      {
        label: "USDT",
        data: prices,
        fill: true,
        borderColor: documentStyle.getPropertyValue("--p-primary-500"),
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
