<template>
  <div class="flex flex-col gap-4 items-start">
    <div class="flex gap-4">
      <div
        v-for="interval in intervals"
        :key="interval.key"
        class="flex items-center"
      >
        <RadioButton
          v-model="selectedInterval"
          :inputId="interval.key"
          name="dynamic"
          :value="interval.key"
        />
        <label :for="interval.key" class="ml-2">{{ interval.name }}</label>
      </div>
    </div>

    <DatePicker
      v-model="rangeDate"
      dateFormat="dd.mm.yy"
      :maxDate="new Date()"
      selectionMode="range"
      :manualInput="false"
    />

    <Select
      v-model="selectedCurrency"
      placeholder="Currency"
      :options="currency"
      class="w-full md:w-56"
    />

    <Button label="Fetch" @click="handleClick" />
    {{ chartConfigStore.chartConfig }}
  </div>
</template>

<script setup lang="ts">
import type { RequestParams } from "~/types/klines.ts";
import { useChartConfigStore } from "~/store/chartConfig";

const chartConfigStore = useChartConfigStore();

const rangeDate = ref();

const selectedCurrency = ref<string>("USDT");
const currency = ref<string[]>(["USDT", "EUR", "RUB"]);

const selectedInterval = ref<string>();
const intervals = ref([
  { key: "1d", name: "Day" },
  { key: "1w", name: "Week" },
  { key: "1M", name: "Month" },
  { key: "1y", name: "Year" },
]);

const params = ref<RequestParams>({
  symbol: `BTC${selectedCurrency.value}`,
  interval: undefined,
  startTime: undefined,
  endTime: undefined,
});

watch(selectedCurrency, () => {
  params.value.symbol = `BTC${selectedCurrency.value}`;
});

watch(selectedInterval, () => {
  params.value.interval = selectedInterval.value;
});

watch(rangeDate, () => {
  params.value.startTime = Math.floor(rangeDate.value[0]);
  params.value.endTime = Math.floor(rangeDate.value[1]);
});

async function handleClick() {
  await chartConfigStore.fetchCurrency(params.value);
}
</script>
