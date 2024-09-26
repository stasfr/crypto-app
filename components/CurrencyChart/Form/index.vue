<template>
  <div class="flex flex-col gap-4 items-start">
    <div class="flex gap-4">
      <div
        v-for="interval in intervals"
        :key="interval.key"
        class="flex items-center"
      >
        <RadioButton
          v-model="params.interval"
          :inputId="interval.key"
          name="dynamic"
          :value="interval.key"
        />
        <label :for="interval.key" class="ml-2">{{ interval.name }}</label>
      </div>
    </div>

    <DatePicker
      v-model="params.dateRange"
      dateFormat="dd.mm.yy"
      :maxDate="new Date()"
      selectionMode="range"
      :manualInput="false"
    />

    <Select
      v-model="params.symbol"
      placeholder="Currency"
      :options="currency"
      class="w-full md:w-56"
    />
  </div>
</template>

<script setup lang="ts">
import type { RequestFormParams } from "~/types/klines";
import { useKlinesStore } from "~/store/klines";

const klinesStore = useKlinesStore();

const currency = ref<string[]>(["USDT", "EUR", "RUB"]);
const intervals = ref([
  { key: "1d", name: "Day" },
  { key: "1w", name: "Week" },
  { key: "1M", name: "Month" },
]);

const params = ref<RequestFormParams>({
  symbol: "USDT",
  interval: "1M",
  dateRange: [new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()],
});

watch(
  params,
  async (newParams) => {
    klinesStore.setRequestParams(newParams);
    await klinesStore.fetchCurrency();
  },
  { deep: true }
);

onMounted(() => {
  klinesStore.setRequestParams(params.value);
});
</script>
