<template>
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
        :value="interval.name"
      />
      <label :for="interval.key" class="ml-2">{{ interval.name }}</label>
    </div>
  </div>
  <DatePicker
    v-model="rangeDate"
    :dateFormat="dateFormat"
    :maxDate="maxDate"
    selectionMode="range"
    :manualInput="false"
  />

  <FloatLabel class="w-full md:w-56">
    <Select
      v-model="selectedCurrency"
      :options="currency"
      class="w-full md:w-56"
    />
    <label for="dd-city">Currency</label>
  </FloatLabel>
</template>

<script setup lang="ts">
const rangeDate = ref();

const dateFormat = "dd.mm.yy";
const maxDate = ref(new Date());

const selectedCurrency = ref<string>();
const currency = ref<string[]>(["USD", "EUR", "RUB"]);

interface Interval {
  key: string;
  name: string;
}

const selectedInterval = ref<string>();
const intervals = ref<Interval[]>([
  { key: "1d", name: "Day" },
  { key: "1w", name: "Week" },
  { key: "1M", name: "Month" },
  { key: "1y", name: "Year" },
]);
</script>
