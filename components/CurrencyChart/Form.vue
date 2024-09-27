<template>
  <div class="flex flex-col gap-4 items-start">
    <SelectButton
      v-model="interval"
      :options="options"
      class="flex flex-col w-full xs:flex-row xs:w-auto"
    />

    <DatePicker
      v-model="dateRange"
      dateFormat="dd.mm.yy"
      :maxDate="new Date()"
      selectionMode="range"
      :manualInput="false"
      class="w-full xs:w-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { useKlinesStore } from "~/store/klines";

const klinesStore = useKlinesStore();

const options = ref(["Day", "Week", "Month", "3 Months", "Year"]);
const interval = ref<string | null>("Day");
const dateRange = ref<(Date | null)[] | null>(null);

watch(
  interval,
  async (newinterval) => {
    if (newinterval) {
      dateRange.value = null;
      klinesStore.setRequestParams(newinterval);
      await klinesStore.fetchCurrency();
    }
  },
  { deep: true }
);

watch(
  dateRange,
  async (newDateRange) => {
    if (newDateRange) {
      interval.value = null;
      klinesStore.setRequestParams(interval.value, newDateRange);
      await klinesStore.fetchCurrency();
    }
  },
  { deep: true }
);

onMounted(async () => {
  klinesStore.setRequestParams(interval.value);
  await klinesStore.fetchCurrency();
});
</script>
